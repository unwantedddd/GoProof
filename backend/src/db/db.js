import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const config = {
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT) || 5432,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
};

let pool;

export const getPool = async () => {
  try {
    if (pool && pool.connected) {
      return pool;
    }
    pool = new Pool(config);
    console.log("DB Connected");
    return pool;
  } catch (err) {
    console.error("DB Connection Failed:", err);
    throw err;
  }
};
