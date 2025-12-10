import { Router, Request, Response } from "express";
import { query } from "../db/connection";
import { authMiddleware, requireRole } from "../middleware/auth";

const router = Router();

// Get applications (role-specific)
router.get("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { status, internship_id } = req.query;
    const userId = req.user!.userId;
    const role = req.user!.role;

    let q: string;
    const params: any[] = [];

    if (role === "student") {
      // Students see their own applications
      q = `
        SELECT a.*, i.title as internship_title, h.hospital_name, i.department
        FROM applications a
        JOIN internships i ON a.internship_id = i.id
        JOIN hospitals h ON i.hospital_id = h.id
        WHERE a.student_id = $1
      `;
      params.push(userId);

      if (status) {
        q += ` AND a.status = $2`;
        params.push(status);
      }
    } else if (role === "hospital") {
      // Hospitals see applications for their internships
      q = `
        SELECT a.*, i.title as internship_title, u.first_name, u.last_name, s.matricule, s.specialization
        FROM applications a
        JOIN internships i ON a.internship_id = i.id
        JOIN students s ON a.student_id = s.id
        JOIN users u ON s.id = u.id
        WHERE i.hospital_id = $1
      `;
      params.push(userId);

      if (internship_id) {
        q += ` AND i.id = $${params.length + 1}`;
        params.push(internship_id);
      }
    } else {
      return res.status(403).json({ error: "Not authorized" });
    }

    q += ` ORDER BY a.applied_at DESC`;

    const result = await query(q, params);
    res.json(result.rows);
  } catch (err) {
    console.error("Get applications error:", err);
    res.status(500).json({ error: "Failed to fetch applications" });
  }
});

// Apply for internship (student only)
router.post("/", authMiddleware, requireRole("student"), async (req: Request, res: Response) => {
  try {
    const { internship_id } = req.body;
    const student_id = req.user!.userId;

    if (!internship_id) {
      return res.status(400).json({ error: "internship_id is required" });
    }

    // Check if internship exists
    const internshipCheck = await query(
      "SELECT id FROM internships WHERE id = $1 AND status = 'active'",
      [internship_id]
    );

    if (internshipCheck.rows.length === 0) {
      return res.status(404).json({ error: "Internship not found or not active" });
    }

    // Check for duplicate application
    const existingApp = await query(
      "SELECT id FROM applications WHERE student_id = $1 AND internship_id = $2",
      [student_id, internship_id]
    );

    if (existingApp.rows.length > 0) {
      return res.status(409).json({ error: "Already applied to this internship" });
    }

    const result = await query(
      `
        INSERT INTO applications (student_id, internship_id, status)
        VALUES ($1, $2, 'pending')
        RETURNING *
      `,
      [student_id, internship_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Create application error:", err);
    res.status(500).json({ error: "Failed to apply for internship" });
  }
});

// Update application status (hospital only)
router.patch(
  "/:id/status",
  authMiddleware,
  requireRole("hospital"),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!["accepted", "rejected", "pending", "withdrawn"].includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
      }

      // Check ownership
      const app = await query(
        `
        SELECT a.* FROM applications a
        JOIN internships i ON a.internship_id = i.id
        WHERE a.id = $1 AND i.hospital_id = $2
      `,
        [id, req.user!.userId]
      );

      if (app.rows.length === 0) {
        return res.status(404).json({ error: "Application not found" });
      }

      const result = await query(
        `
        UPDATE applications
        SET status = $1, decision_date = CASE WHEN $1 != 'pending' THEN CURRENT_TIMESTAMP ELSE decision_date END, updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
        RETURNING *
      `,
        [status, id]
      );

      res.json(result.rows[0]);
    } catch (err) {
      console.error("Update application error:", err);
      res.status(500).json({ error: "Failed to update application" });
    }
  }
);

// Withdraw application (student only)
router.delete(
  "/:id",
  authMiddleware,
  requireRole("student"),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const student_id = req.user!.userId;

      const app = await query(
        "SELECT id FROM applications WHERE id = $1 AND student_id = $2",
        [id, student_id]
      );

      if (app.rows.length === 0) {
        return res.status(404).json({ error: "Application not found" });
      }

      await query("UPDATE applications SET status = 'withdrawn', updated_at = CURRENT_TIMESTAMP WHERE id = $1", [id]);
      res.json({ message: "Application withdrawn" });
    } catch (err) {
      console.error("Delete application error:", err);
      res.status(500).json({ error: "Failed to withdraw application" });
    }
  }
);

export default router;
