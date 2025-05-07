import { neon } from "@neondatabase/serverless";

type CreateUserInput = {
  provider: string;
  providerAccountId: string;
  email: string;
  name?: string | null;
  image?: string | null;
};

export const sql = neon(process.env.DATABASE_URL!);

export const getUserIdByProviderAccount = async (
  provider: string,
  providerAccountId: string
): Promise<string | null> => {
  try {
    const result = await sql`
          SELECT user_id
          FROM accounts
          WHERE provider = ${provider}
            AND provider_account_id = ${providerAccountId}
          LIMIT 1
        `;

    if (result.length > 0) {
      return result[0].user_id;
    }

    return null;
  } catch (error) {
    console.error("User search error:", error);

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
    const result = await sql`
        INSERT INTO users (email, name, image, role)
        VALUES (${email}, ${name ?? "Unnamed"}, ${image}, 'owner')
        RETURNING id
      `;

    const userId = result[0].id as string;

    await sql`
        INSERT INTO accounts (user_id, provider, provider_account_id)
        VALUES (${userId}, ${provider}, ${providerAccountId})
      `;

    return userId;
  } catch (error) {
    console.error("User creating error:", error);

    return null;
  }
};
