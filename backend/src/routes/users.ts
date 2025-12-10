import { Router, Request, Response } from "express";
import { query } from "../db/connection";
import { authMiddleware, requireRole } from "../middleware/auth";

const router = Router();

// Get current user profile
router.get("/me", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const role = req.user!.role;

    let profileQuery = `
      SELECT u.id, u.email, u.first_name, u.last_name, u.role, u.phone, u.address, u.profile_picture, u.created_at
      FROM users u
      WHERE u.id = $1
    `;

    let result = await query(profileQuery, [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = result.rows[0];

    // Get role-specific data
    if (role === "student") {
      const studentResult = await query(
        "SELECT matricule, specialization, university FROM students WHERE id = $1",
        [userId]
      );
      if (studentResult.rows.length > 0) {
        Object.assign(user, studentResult.rows[0]);
      }
    } else if (role === "hospital") {
      const hospitalResult = await query(
        "SELECT hospital_name, registration_number, website, description, city, verified FROM hospitals WHERE id = $1",
        [userId]
      );
      if (hospitalResult.rows.length > 0) {
        Object.assign(user, hospitalResult.rows[0]);
      }
    } else if (role === "doctor") {
      const doctorResult = await query(
        "SELECT license_number, specialization, experience_years, bio FROM doctors WHERE id = $1",
        [userId]
      );
      if (doctorResult.rows.length > 0) {
        Object.assign(user, doctorResult.rows[0]);
      }
    }

    res.json(user);
  } catch (err) {
    console.error("Get profile error:", err);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

// Update user profile
router.put("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { first_name, last_name, phone, address, profile_picture } = req.body;

    const result = await query(
      `
        UPDATE users
        SET first_name = COALESCE($1, first_name),
            last_name = COALESCE($2, last_name),
            phone = COALESCE($3, phone),
            address = COALESCE($4, address),
            profile_picture = COALESCE($5, profile_picture),
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $6
        RETURNING id, email, first_name, last_name, role, phone, address, profile_picture
      `,
      [first_name, last_name, phone, address, profile_picture, userId]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

// Get user stats (role-specific)
router.get("/stats", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const role = req.user!.role;

    let stats: any = {};

    if (role === "student") {
      const appStats = await query(
        `
        SELECT 
          COUNT(*) as total,
          SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
          SUM(CASE WHEN status = 'accepted' THEN 1 ELSE 0 END) as accepted,
          SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as rejected
        FROM applications
        WHERE student_id = $1
      `,
        [userId]
      );

      stats = appStats.rows[0];
    } else if (role === "hospital") {
      const internshipStats = await query(
        `
        SELECT 
          COUNT(*) as total,
          SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as active,
          SUM(CASE WHEN status = 'draft' THEN 1 ELSE 0 END) as draft
        FROM internships
        WHERE hospital_id = $1
      `,
        [userId]
      );

      const applicationStats = await query(
        `
        SELECT COUNT(*) as total
        FROM applications a
        JOIN internships i ON a.internship_id = i.id
        WHERE i.hospital_id = $1 AND a.status = 'pending'
      `,
        [userId]
      );

      stats.internships = internshipStats.rows[0];
      stats.pending_applications = applicationStats.rows[0].total;
    } else if (role === "doctor") {
      const evaluationStats = await query(
        `
        SELECT 
          COUNT(*) as total,
          SUM(CASE WHEN evaluated_at IS NOT NULL THEN 1 ELSE 0 END) as completed,
          SUM(CASE WHEN evaluated_at IS NULL THEN 1 ELSE 0 END) as pending
        FROM evaluations
        WHERE doctor_id = $1
      `,
        [userId]
      );

      stats = evaluationStats.rows[0];
    }

    res.json(stats);
  } catch (err) {
    console.error("Get stats error:", err);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

export default router;
