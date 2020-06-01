import { Pool } from 'pg';

const config = {
  user: process.env.POSTGRES_USER || 'user',
  host: process.env.POSTGRES_HOST || 'localhost',
  database: process.env.POSTGRES_DB || 'micm',
  password: process.env.POSTGRES_PASSWORD || undefined,
  port: process.env.POSTGRES_PORT || 5432
}

const pool = new Pool(config);

export default pool;
