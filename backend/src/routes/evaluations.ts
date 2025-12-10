import { Router, Request, Response } from "express";
import { query } from "../db/connection";
import { authMiddleware, requireRole } from "../middleware/auth";
import { evaluationSchema } from "../utils/validation";

const router = Router();

// Get evaluations
router.get("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const role = req.user!.role;

    let q: string;
    const params: any[] = [];

    if (role === "student") {
      // Students see their evaluations
      q = `
        SELECT e.*, d.user_id as doctor_id, u.first_name, u.last_name, i.title as internship_title
        FROM evaluations e
        JOIN doctors d ON e.doctor_id = d.id
        JOIN users u ON d.id = u.id
        JOIN internships i ON e.internship_id = i.id
        WHERE e.student_id = $1
        ORDER BY e.created_at DESC
      `;
      params.push(userId);
    } else if (role === "doctor") {
      // Doctors see their evaluations
      q = `
        SELECT e.*, u.first_name, u.last_name, s.matricule, s.specialization, i.title as internship_title
        FROM evaluations e
        JOIN students s ON e.student_id = s.id
        JOIN users u ON s.id = u.id
        JOIN internships i ON e.internship_id = i.id
        WHERE e.doctor_id = $1
        ORDER BY e.created_at DESC
      `;
      params.push(userId);
    } else if (role === "hospital") {
      // Hospitals see evaluations for their interns
      q = `
        SELECT e.*, u.first_name, u.last_name, s.matricule, d.specialization as doctor_spec, i.title as internship_title
        FROM evaluations e
        JOIN students s ON e.student_id = s.id
        JOIN users u ON s.id = u.id
        JOIN doctors d ON e.doctor_id = d.id
        JOIN internships i ON e.internship_id = i.id
        WHERE i.hospital_id = $1
        ORDER BY e.created_at DESC
      `;
      params.push(userId);
    } else {
      return res.status(403).json({ error: "Not authorized" });
    }

    const result = await query(q, params);
    res.json(result.rows);
  } catch (err) {
    console.error("Get evaluations error:", err);
    res.status(500).json({ error: "Failed to fetch evaluations" });
  }
});

// Create evaluation (doctor only)
router.post(
  "/",
  authMiddleware,
  requireRole("doctor"),
  async (req: Request, res: Response) => {
    try {
      const { error, value } = evaluationSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const { student_id, internship_id, rating, feedback, competencies } = value;
      const doctor_id = req.user!.userId;

      // Verify doctor is associated with internship
      const internship = await query(
        `
        SELECT i.hospital_id FROM internships i
        JOIN doctors d ON d.hospital_id = i.hospital_id
        WHERE i.id = $1 AND d.id = $2
      `,
        [internship_id, doctor_id]
      );

      if (internship.rows.length === 0) {
        return res.status(403).json({ error: "Not authorized to evaluate this internship" });
      }

      // Check for existing evaluation
      const existing = await query(
        "SELECT id FROM evaluations WHERE student_id = $1 AND doctor_id = $2 AND internship_id = $3",
        [student_id, doctor_id, internship_id]
      );

      if (existing.rows.length > 0) {
        return res.status(409).json({ error: "Evaluation already exists" });
      }

      const result = await query(
        `
        INSERT INTO evaluations (student_id, doctor_id, internship_id, rating, feedback, competencies, evaluated_at)
        VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP)
        RETURNING *
      `,
        [student_id, doctor_id, internship_id, rating, feedback, JSON.stringify(competencies)]
      );

      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error("Create evaluation error:", err);
      res.status(500).json({ error: "Failed to create evaluation" });
    }
  }
);

// Update evaluation (doctor only)
router.patch(
  "/:id",
  authMiddleware,
  requireRole("doctor"),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { rating, feedback, competencies } = req.body;

      const evaluation = await query(
        "SELECT doctor_id FROM evaluations WHERE id = $1",
        [id]
      );

      if (evaluation.rows.length === 0) {
        return res.status(404).json({ error: "Evaluation not found" });
      }

      if (evaluation.rows[0].doctor_id !== req.user!.userId) {
        return res.status(403).json({ error: "Not authorized" });
      }

      const result = await query(
        `
        UPDATE evaluations
        SET rating = COALESCE($1, rating), feedback = COALESCE($2, feedback), competencies = COALESCE($3, competencies)
        WHERE id = $4
        RETURNING *
      `,
        [rating, feedback, competencies ? JSON.stringify(competencies) : null, id]
      );

      res.json(result.rows[0]);
    } catch (err) {
      console.error("Update evaluation error:", err);
      res.status(500).json({ error: "Failed to update evaluation" });
    }
  }
);

export default router;
