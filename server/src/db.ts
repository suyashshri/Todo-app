import { Pool } from "pg";
import { config } from "dotenv";
config();

const pool = new Pool({
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.DBPORT,
  database: "tododb",
});

export default pool;
