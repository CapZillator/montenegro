import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { z } from "zod";

import { validationSchema } from "@/constants/validationSchemas";
import { auth0 } from "@/lib/auth0";
import { ResidentialPremises } from "@/types/realEstate";
import { buildSqlQuery, toSnakeCase } from "@/utils/api";

export async function POST(req: NextRequest) {
  try {
    const session = await auth0.getSession();

    if (!session || !session.user) {
      return NextResponse.json({ exists: false }, { status: 401 });
    }

    const sql = neon(`${process.env.DATABASE_URL}`);
    const { sub, email, name } = session.user;

    let user = await sql`SELECT id FROM users WHERE email = ${email}`;

    if (!user.length) {
      user = await sql`
            INSERT INTO users (sub, email, name, role)
            VALUES (${sub}, ${email}, ${name}, 'owner')
            RETURNING id
          `;
    }

    const userId = user[0].id;
    const listingData: Omit<
      ResidentialPremises,
      "id" | "userId" | "createdAt" | "updatedAt"
    > = await req.json();
    console.table(listingData);
    const validListingData = toSnakeCase(
      validationSchema.residentialPremises.parse(listingData)
    );

    const { query, values } = buildSqlQuery(
      "residential_premises_listings",
      { ...validListingData, user_id: userId },
      "insert"
    );
    console.log("SQL query", query);

    const newListing = await sql(query, values);

    return NextResponse.json(
      { ok: true, listingId: newListing[0].id },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.message }, { status: 422 });
    }

    console.log("error", error);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
