export type UserRole = "student" | "hospital" | "doctor" | "admin";

export interface User {
  id: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  phone?: string;
  address?: string;
  profile_picture?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Student extends User {
  matricule: string;
  specialization: string;
  cv_url?: string;
  documents_url?: string;
  university?: string;
  academic_year?: string;
}

export interface Hospital extends User {
  hospital_name: string;
  registration_number: string;
  website?: string;
  description?: string;
  address: string;
  city: string;
  verified: boolean;
}

export interface Doctor extends User {
  license_number: string;
  specialization: string;
  hospital_id: string;
  experience_years: number;
  bio?: string;
}

export interface Internship {
  id: string;
  title: string;
  description: string;
  hospital_id: string;
  department: string;
  positions: number;
  duration_months: number;
  start_date: Date;
  end_date: Date;
  requirements?: string;
  benefits?: string;
  status: "draft" | "active" | "closed";
  created_at: Date;
  updated_at: Date;
}

export interface Application {
  id: string;
  student_id: string;
  internship_id: string;
  status: "pending" | "accepted" | "rejected" | "withdrawn";
  applied_at: Date;
  decision_date?: Date;
  notes?: string;
  updated_at: Date;
}

export interface Evaluation {
  id: string;
  student_id: string;
  doctor_id: string;
  internship_id: string;
  rating: number; // 0-5
  feedback: string;
  competencies: Record<string, number>;
  evaluated_at: Date;
  created_at: Date;
}

export interface AuthPayload {
  userId: string;
  role: UserRole;
  email: string;
}
