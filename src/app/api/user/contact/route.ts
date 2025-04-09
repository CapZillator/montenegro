import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { z } from "zod";

import { validationSchema } from "@/constants/validationSchemas";
import { auth0 } from "@/lib/auth0";
import { buildSqlQuery } from "@/utils/api";

export async function POST(req: NextRequest) {
  try {
    const session = await auth0.getSession();

    if (!session?.user?.sub) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const validData = validationSchema.userContacts.parse(data);

    const updateData = {
      phone: validData.phone,
      messengers: validData.contacts
        ? JSON.stringify(validData.contacts)
        : null,
    };

    const { query, values } = buildSqlQuery("users", updateData, "update", {
      field: "sub",
      value: session.user.sub,
    });

    const sql = neon(process.env.DATABASE_URL!);
    await sql(query, values);

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("Contact update error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.message }, { status: 422 });
    }

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
