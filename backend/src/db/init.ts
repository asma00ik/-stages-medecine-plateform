import { query } from "./connection";

export const initializeDatabase = async () => {
  try {
    console.log("🔄 Initializing database...");

    // Required for gen_random_uuid()
    await query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`);

    // USERS
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL CHECK (role IN ('student', 'hospital', 'doctor', 'admin')),
        phone VARCHAR(20),
        address TEXT,
        profile_picture VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // STUDENTS
    await query(`
      CREATE TABLE IF NOT EXISTS students (
        id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
        matricule VARCHAR(20) UNIQUE NOT NULL,
        specialization VARCHAR(255),
        cv_url VARCHAR(500),
        documents_url VARCHAR(500),
        university VARCHAR(255),
        academic_year VARCHAR(50)
      )
    `);

    // HOSPITALS
    await query(`
      CREATE TABLE IF NOT EXISTS hospitals (
        id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
        hospital_name VARCHAR(255) NOT NULL,
        registration_number VARCHAR(255) UNIQUE NOT NULL,
        website VARCHAR(500),
        description TEXT,
        city VARCHAR(255) NOT NULL,
        verified BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // DOCTORS
    await query(`
      CREATE TABLE IF NOT EXISTS doctors (
        id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
        license_number VARCHAR(255) UNIQUE NOT NULL,
        specialization VARCHAR(255) NOT NULL,
        hospital_id UUID REFERENCES hospitals(id),
        experience_years INTEGER DEFAULT 0,
        bio TEXT
      )
    `);

    // INTERNSHIPS
    await query(`
      CREATE TABLE IF NOT EXISTS internships (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        hospital_id UUID NOT NULL REFERENCES hospitals(id) ON DELETE CASCADE,
        department VARCHAR(255) NOT NULL,
        positions INTEGER NOT NULL,
        duration_months INTEGER NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        requirements TEXT,
        benefits TEXT,
        status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'closed')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // APPLICATIONS
    await query(`
      CREATE TABLE IF NOT EXISTS applications (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
        internship_id UUID NOT NULL REFERENCES internships(id) ON DELETE CASCADE,
        status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'withdrawn')),
        applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        decision_date TIMESTAMP,
        notes TEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(student_id, internship_id)
      )
    `);

    // EVALUATIONS
    await query(`
      CREATE TABLE IF NOT EXISTS evaluations (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
        doctor_id UUID NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
        internship_id UUID NOT NULL REFERENCES internships(id) ON DELETE CASCADE,
        rating DECIMAL(3,2) NOT NULL CHECK (rating >= 0 AND rating <= 5),
        feedback TEXT,
        competencies JSONB,
        evaluated_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

// --------------------------------------------------------
    // INDEXES
    // --------------------------------------------------------
    await query(`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`);
    await query(`CREATE INDEX IF NOT EXISTS idx_students_matricule ON students(matricule)`);
    await query(`CREATE INDEX IF NOT EXISTS idx_internships_hospital_id ON internships(hospital_id)`);
    await query(`CREATE INDEX IF NOT EXISTS idx_applications_student_id ON applications(student_id)`);
    await query(`CREATE INDEX IF NOT EXISTS idx_applications_internship_id ON applications(internship_id)`);
    await query(`CREATE INDEX IF NOT EXISTS idx_evaluations_student_id ON evaluations(student_id)`);
    await query(`CREATE INDEX IF NOT EXISTS idx_evaluations_doctor_id ON evaluations(doctor_id)`);

    // --------------------------------------------------------
    // DEFAULT ADMIN
    // --------------------------------------------------------
    const adminEmail = "admin@mail.com";
    const adminRole = "admin";

    const existingAdmin = await query(
      "SELECT id FROM users WHERE role = $1 LIMIT 1",
      [adminRole]
    );

    if (existingAdmin.rows.length === 0) {
      await query(
        `INSERT INTO users (email, password, first_name, last_name, role)
         VALUES ($1, $2, $3, $4, $5)`,
        [adminEmail, "admin123", "Super", "Admin", adminRole]
      );
      console.log("✅ Default admin user created.");
    } else {
      console.log("ℹ️ Admin already exists.");
    }

    console.log("✅ Database initialized successfully");
  } catch (error) {
    console.error("❌ Database initialization error:", error);
    throw error;
  }
};