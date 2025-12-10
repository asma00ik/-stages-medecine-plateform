import { Pool, QueryResult } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) || 5432,
  connectionString: process.env.DATABASE_URL,
});

pool.on("error", (err) => {
  console.error("❌ Unexpected error on idle client", err);
});

export const query = (text: string, params?: unknown[]): Promise<QueryResult> => {
  return pool.query(text, params);
};

export const getClient = () => {
  return pool.connect();
};

export default pool;