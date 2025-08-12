import { Pool } from 'pg';

let pool: Pool;

if (!globalThis.pgPool) {
  pool = new Pool({
    connectionString: process.env.POSTGRES_NO_VERIFY_URL!,
    ssl: { rejectUnauthorized: false },
  });
  globalThis.pgPool = pool;
} else {
  pool = globalThis.pgPool;
}

export { pool };
