import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { initializeDatabase } from "./db/init";
import { authMiddleware, errorHandler, notFoundHandler } from "./middleware";
import authRoutes from "./routes/auth";
import internshipRoutes from "./routes/internships";
import applicationRoutes from "./routes/applications";
import evaluationRoutes from "./routes/evaluations";
import userRoutes from "./routes/users";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Initialize database on startup
(async () => {
  try {
    await initializeDatabase();
    console.log("✅ Database initialized");
  } catch (err) {
    console.error("⚠️  Database initialization failed:", err);
    console.log("⚠️  Running without database initialization - tables may not exist");
  }
})();

// Health check
app.get("/api/health", async (req, res) => {
  try {
    res.json({ ok: true, db: true });
  } catch (err) {
    res.status(500).json({ ok: false, db: false });
  }
});

// API Routes
app.get("/", (req, res) => {
  res.json({ message: "StageLink API is running..." });
});
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/internships", internshipRoutes);
app.use("/api/v1/applications", applicationRoutes);
app.use("/api/v1/evaluations", evaluationRoutes);
app.use("/api/v1/users", userRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`✅ Server listening on http://localhost:${port}`);
  console.log(`📚 API Base: http://localhost:${port}/api/v1`);
  console.log(`🗄️ Database URL: ${process.env.DATABASE_URL}`);
});

process.on("SIGINT", async () => {
  console.log("Shutting down gracefully...");
  process.exit(0);
});

