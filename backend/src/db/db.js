import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT) || 5432,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log("Database connected successfully");
    client.release();
  } catch (err) {
    console.error("Failed to connect to the database:", err);
    process.exit(1);
  }
};

/**
 @param {string} text 
 @param {Array} params 
 @returns {Promise<Array>} 
**/

export const queryDB = async (text, params) => {
  const result = await pool.query(text, params);
  return result.rows;
};

export const executeDB = async (text, params) => {
  const result = await pool.query(text, params);
  return result.rows;
};

export default pool;