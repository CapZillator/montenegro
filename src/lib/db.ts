import { Pool } from 'pg';

type CreateUserInput = {
  provider: string;
  providerAccountId: string;
  email: string;
  name?: string | null;
  image?: string | null;
};

const isProd = process.env.NODE_ENV === 'production';

export const pool = new Pool({
  connectionString: process.env.SPACEHUB_POSTGRES_URL!,
  ssl: isProd ? true : { rejectUnauthorized: false },
});

export const getUserIdByProviderAccount = async (
  provider: string,
  providerAccountId: string
): Promise<string | null> => {
  try {
    const result = await pool.query(
      `
          SELECT user_id
          FROM accounts
          WHERE provider = $1
            AND provider_account_id = $2
          LIMIT 1
        `,
      [provider, providerAccountId]
    );

    if (result.rows.length > 0) {
      return result.rows[0].user_id;
    }

    return null;
  } catch (error) {
    console.error('User search error:', error);

    return null;
  }
};

export const createUserIfNotExists = async ({
  provider,
  providerAccountId,
  email,
  name,
  image,
}: CreateUserInput): Promise<string | null> => {
  try {
    const result = await pool.query(
      `
      INSERT INTO users (email, name, image, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id
      `,
      [email, name ?? 'Unnamed', image, 'owner']
    );

    const userId = result.rows[0].id as string;

    await pool.query(
      `
      INSERT INTO accounts (user_id, provider, provider_account_id)
      VALUES ($1, $2, $3)
      `,
      [userId, provider, providerAccountId]
    );

    return userId;
  } catch (error) {
    console.error('User creating error:', error);

    return null;
  }
};
