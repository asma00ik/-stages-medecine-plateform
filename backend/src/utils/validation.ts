import Joi from "joi";

// Auth validation schemas
export const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  role: Joi.string().valid("student", "hospital", "doctor", "admin").required(),
  phone: Joi.string().optional(),
  address: Joi.string().optional(),
  // Student specific
  matricule: Joi.when("role", {
    is: "student",
    then: Joi.string().length(12).regex(/^\d+$/).required(),
    otherwise: Joi.forbidden(),
  }),
  specialization: Joi.when("role", {
    is: Joi.alternatives().try("student", "doctor"),
    then: Joi.string().required(),
    otherwise: Joi.forbidden(),
  }),
  university: Joi.when("role", {
    is: "student",
    then: Joi.string().optional(),
    otherwise: Joi.forbidden(),
  }),
  // Hospital specific
  hospital_name: Joi.when("role", {
    is: "hospital",
    then: Joi.string().required(),
    otherwise: Joi.forbidden(),
  }),
  registration_number: Joi.when("role", {
    is: "hospital",
    then: Joi.string().required(),
    otherwise: Joi.forbidden(),
  }),
  city: Joi.when("role", {
    is: "hospital",
    then: Joi.string().required(),
    otherwise: Joi.forbidden(),
  }),
  website: Joi.when("role", {
    is: "hospital",
    then: Joi.string().uri().optional(),
    otherwise: Joi.forbidden(),
  }),
  // Doctor specific
  license_number: Joi.when("role", {
    is: "doctor",
    then: Joi.string().required(),
    otherwise: Joi.forbidden(),
  }),
  experience_years: Joi.when("role", {
    is: "doctor",
    then: Joi.number().min(0).optional(),
    otherwise: Joi.forbidden(),
  }),
});

export const loginSchema = Joi.object({
  identifier: Joi.alternatives()
    .try(Joi.string().email(), Joi.string().length(12))
    .required(),
  password: Joi.string().required(),
  role: Joi.string().valid("student", "hospital", "doctor", "admin").required(),
});

// Internship validation
export const internshipSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  department: Joi.string().required(),
  positions: Joi.number().min(1).required(),
  duration_months: Joi.number().min(1).required(),
  start_date: Joi.date().required(),
  end_date: Joi.date().min(Joi.ref("start_date")).required(),
  requirements: Joi.string().optional(),
  benefits: Joi.string().optional(),
  status: Joi.string().valid("draft", "active", "closed").optional(),
});

// Application validation
export const applicationSchema = Joi.object({
  internship_id: Joi.string().uuid().required(),
});

// Evaluation validation
export const evaluationSchema = Joi.object({
  student_id: Joi.string().uuid().required(),
  internship_id: Joi.string().uuid().required(),
  rating: Joi.number().min(0).max(5).required(),
  feedback: Joi.string().required(),
  competencies: Joi.object().optional(),
});
