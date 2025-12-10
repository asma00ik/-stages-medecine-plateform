import { Router, Request, Response } from "express";
import { query } from "../db/connection";
import { authMiddleware, requireRole } from "../middleware/auth";
import { internshipSchema } from "../utils/validation";

const router = Router();

// Get all internships with filters
router.get("/", async (req: Request, res: Response) => {
  try {
    const { status, department, hospital_id } = req.query;

    let q = `
      SELECT i.*, h.hospital_name, h.id as hospital_id
      FROM internships i
      JOIN hospitals h ON i.hospital_id = h.id
      WHERE 1=1
    `;
    const params: any[] = [];
    let paramCount = 1;

    if (status) {
      q += ` AND i.status = $${paramCount}`;
      params.push(status);
      paramCount++;
    }

    if (department) {
      q += ` AND i.department ILIKE $${paramCount}`;
      params.push(`%${department}%`);
      paramCount++;
    }

    if (hospital_id) {
      q += ` AND i.hospital_id = $${paramCount}`;
      params.push(hospital_id);
      paramCount++;
    }

    q += ` ORDER BY i.created_at DESC`;

    const result = await query(q, params);
    res.json(result.rows);
  } catch (err) {
    console.error("Get internships error:", err);
    res.status(500).json({ error: "Failed to fetch internships" });
  }
});

// Get internship by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await query(
      `
      SELECT i.*, h.hospital_name
      FROM internships i
      JOIN hospitals h ON i.hospital_id = h.id
      WHERE i.id = $1
    `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Internship not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Get internship error:", err);
    res.status(500).json({ error: "Failed to fetch internship" });
  }
});

// Create internship (hospital only)
router.post(
  "/",
  authMiddleware,
  requireRole("hospital"),
  async (req: Request, res: Response) => {
    try {
      const { error, value } = internshipSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const {
        title,
        description,
        department,
        positions,
        duration_months,
        start_date,
        end_date,
        requirements,
        benefits,
        status = "draft",
      } = value;

      const result = await query(
        `
        INSERT INTO internships (title, description, hospital_id, department, positions, duration_months, start_date, end_date, requirements, benefits, status)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING *
      `,
        [
          title,
          description,
          req.user!.userId,
          department,
          positions,
          duration_months,
          start_date,
          end_date,
          requirements,
          benefits,
          status,
        ]
      );

      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error("Create internship error:", err);
      res.status(500).json({ error: "Failed to create internship" });
    }
  }
);

// Update internship (hospital only)
router.put(
  "/:id",
  authMiddleware,
  requireRole("hospital"),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { error, value } = internshipSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      // Check ownership
      const internship = await query(
        "SELECT hospital_id FROM internships WHERE id = $1",
        [id]
      );

      if (internship.rows.length === 0) {
        return res.status(404).json({ error: "Internship not found" });
      }

      if (internship.rows[0].hospital_id !== req.user!.userId) {
        return res.status(403).json({ error: "Not authorized" });
      }

      const {
        title,
        description,
        department,
        positions,
        duration_months,
        start_date,
        end_date,
        requirements,
        benefits,
        status,
      } = value;

      const result = await query(
        `
        UPDATE internships
        SET title = $1, description = $2, department = $3, positions = $4, 
            duration_months = $5, start_date = $6, end_date = $7, 
            requirements = $8, benefits = $9, status = $10, updated_at = CURRENT_TIMESTAMP
        WHERE id = $11
        RETURNING *
      `,
        [
          title,
          description,
          department,
          positions,
          duration_months,
          start_date,
          end_date,
          requirements,
          benefits,
          status,
          id,
        ]
      );

      res.json(result.rows[0]);
    } catch (err) {
      console.error("Update internship error:", err);
      res.status(500).json({ error: "Failed to update internship" });
    }
  }
);

// Delete internship (hospital only)
router.delete(
  "/:id",
  authMiddleware,
  requireRole("hospital"),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      // Check ownership
      const internship = await query(
        "SELECT hospital_id FROM internships WHERE id = $1",
        [id]
      );

      if (internship.rows.length === 0) {
        return res.status(404).json({ error: "Internship not found" });
      }

      if (internship.rows[0].hospital_id !== req.user!.userId) {
        return res.status(403).json({ error: "Not authorized" });
      }

      await query("DELETE FROM internships WHERE id = $1", [id]);
      res.json({ message: "Internship deleted" });
    } catch (err) {
      console.error("Delete internship error:", err);
      res.status(500).json({ error: "Failed to delete internship" });
    }
  }
);

export default router;
