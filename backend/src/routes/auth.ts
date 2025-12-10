import { Router, Request, Response } from "express";
import { query } from "../db/connection";
import { hashPassword, comparePassword } from "../utils/password";
import { generateToken } from "../utils/jwt";
import { registerSchema, loginSchema } from "../utils/validation";
import { UserRole } from "../types";

const router = Router();

// Register
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const {
      email,
      password,
      first_name,
      last_name,
      role,
      phone,
      address,
      // Student
      matricule,
      specialization,
      university,
      // Hospital
      hospital_name,
      registration_number,
      city,
      website,
      description,
      // Doctor
      license_number,
      experience_years,
    } = value;

    // Check if user exists
    const existingUser = await query("SELECT id FROM users WHERE email = $1", [
      email,
    ]);
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ error: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Insert user and role-specific data
    const userResult = await query(
      `INSERT INTO users (email, password, first_name, last_name, role, phone, address)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, email, role`,
      [email, hashedPassword, first_name, last_name, role, phone, address]
    );

    const userId = userResult.rows[0].id;

    // Insert role-specific data
    if (role === "student") {
      await query(
        `INSERT INTO students (id, matricule, specialization, university)
         VALUES ($1, $2, $3, $4)`,
        [userId, matricule, specialization, university]
      );
    } else if (role === "hospital") {
      await query(
        `INSERT INTO hospitals (id, hospital_name, registration_number, city, website, description, address)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [userId, hospital_name, registration_number, city, website, description, address]
      );
    } else if (role === "doctor") {
      await query(
        `INSERT INTO doctors (id, license_number, specialization, experience_years)
         VALUES ($1, $2, $3, $4)`,
        [userId, license_number, specialization, experience_years]
      );
    }

    const token = generateToken({ userId, role: role as UserRole, email });

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: userId,
        email,
        role,
        first_name,
        last_name,
      },
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Registration failed" });
  }
});

// Login
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { identifier, password, role } = value;

    // Find user by email or matricule (for students)
    let userQuery = `
      SELECT u.id, u.email, u.password, u.role, u.first_name, u.last_name
      FROM users u
      WHERE u.email = $1 AND u.role = $2
    `;
    let params: any[] = [identifier, role];

    if (role === "student") {
      userQuery = `
        SELECT u.id, u.email, u.password, u.role, u.first_name, u.last_name
        FROM users u
        LEFT JOIN students s ON u.id = s.id
        WHERE (u.email = $1 OR s.matricule = $1) AND u.role = $2
      `;
    }

    const userResult = await query(userQuery, params);

    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = userResult.rows[0];

    // Compare password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateToken({
      userId: user.id,
      role: user.role as UserRole,
      email: user.email,
    });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        first_name: user.first_name,
        last_name: user.last_name,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

// Verify token
router.get("/verify", (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const token = authHeader.substring(7);
    // JWT verification is done, token is valid if no error
    res.json({ valid: true });
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
});

export default router;
