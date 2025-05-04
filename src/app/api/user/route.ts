import { NextRequest, NextResponse } from "next/server";

import { sqlFieldTypes } from "@/constants/sql";
import { validationSchema } from "@/constants/validationSchemas";
import { auth0 } from "@/lib/auth0";
import { sql } from "@/lib/db";
import { User } from "@/types/user";
import { buildSqlQuery, safeParseJsonFields, toSnakeCase } from "@/utils/api";

export async function GET() {
  try {
    const session = await auth0.getSession();

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { sub, email, name } = session.user;

    const users = await sql`
      SELECT email, name, role, phone, contacts, id FROM users WHERE sub = ${sub};
    `;

    if (users.length > 0) {
      const userData = users[0];

      return NextResponse.json({
        data: safeParseJsonFields(userData),
      });
    }

    const newUser = await sql`
    INSERT INTO users (sub, email, name, role)
    VALUES (${sub}, ${email}, ${name}, 'owner')
    RETURNING id, email, name, role;
  `;

    return NextResponse.json({
      data: safeParseJsonFields(newUser[0]),
    });
  } catch (error: any) {
    console.error("Check or create user error:", error);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await auth0.getSession();

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { email } = session.user;
    const user = await sql`SELECT id FROM users WHERE email = ${email} LIMIT 1`;
    const userId = user[0]?.id;

    const userData: Omit<User, "created_at"> = await req.json();
    const validUserData = toSnakeCase(validationSchema.user.parse(userData));
    const { id, ...validBaseUserData } = validUserData;

    if (id !== userId) {
      return NextResponse.json(
        { error: "User data is missing" },
        { status: 409 }
      );
    }

    const { query, values } = buildSqlQuery(
      "users",
      { ...validBaseUserData },
      "update",
      { field: "id", value: id },
      sqlFieldTypes.users
    );

    const updatedUser = await sql(query, values);

    return NextResponse.json(
      { data: safeParseJsonFields(updatedUser) },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Check or create user error:", error);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
