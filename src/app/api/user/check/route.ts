import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

import { auth0 } from "@/lib/auth0";

export async function GET() {
  try {
    const session = await auth0.getSession();

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { sub, email, name } = session.user;

    const sql = neon(process.env.DATABASE_URL!);

    const existingUser = await sql`
      SELECT id, phone FROM users WHERE sub = ${sub};
    `;

    if (existingUser.length > 0) {
      const { id, phone } = existingUser[0];

      return NextResponse.json({
        id,
        needsPhone: !phone,
        status: "existing",
      });
    }

    const insertedUser = await sql`
      INSERT INTO users (sub, email, name, role)
      VALUES (${sub}, ${email}, ${name}, 'owner')
      RETURNING id;
    `;

    return NextResponse.json({
      id: insertedUser[0].id,
      needsPhone: true,
      status: "created",
    });
  } catch (error: any) {
    console.error("Check or create user error:", error);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
