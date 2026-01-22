import 'dotenv/config'
import { Pool } from "pg";

const pool = new Pool({
  connectionString: procces.env.DATABASE_URL,
});
