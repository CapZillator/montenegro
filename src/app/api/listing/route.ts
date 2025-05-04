import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { sqlFieldTypes } from "@/constants/sql";
import { validationSchema } from "@/constants/validationSchemas";
import { getErrorMessage } from "@/helpers/guards";
import { auth0 } from "@/lib/auth0";
import { sql } from "@/lib/db";
import { deleteImagesByPublicIds } from "@/lib/images/deleteImagesByPublicIds";
import { ResidentialPremises } from "@/types/realEstate";
import { buildSqlQuery, safeParseJsonFields, toSnakeCase } from "@/utils/api";

export async function GET(req: NextRequest) {
  try {
    const session = await auth0.getSession();

    if (!session || !session.user) {
      return NextResponse.json({ exists: false }, { status: 401 });
    }

    const { email } = session.user;

    const user = await sql`SELECT id FROM users WHERE email = ${email}`;

    if (!user.length) {
      return NextResponse.json(
        { error: "User data is missing" },
        { status: 409 }
      );
    }

    const userId = user[0].id;
    const searchParams = req.nextUrl.searchParams;
    const listingId = searchParams.get("listingId");

    const listings = listingId
      ? await sql`
        SELECT * FROM residential_premises_listings
        WHERE user_id = ${userId} AND id = ${listingId}
        AND deleted_at IS NULL
      `
      : await sql`
        SELECT * FROM residential_premises_listings
        WHERE user_id = ${userId} AND deleted_at IS NULL
      `;

    return NextResponse.json(
      { listings: safeParseJsonFields(listings) },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.message }, { status: 422 });
    }

    console.log("error", error);

    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth0.getSession();

    if (!session || !session.user) {
      return NextResponse.json({ exists: false }, { status: 401 });
    }

    const { email } = session.user;

    const user = await sql`SELECT id, phone FROM users WHERE email = ${email}`;

    if (!user.length || !user[0]?.phone) {
      return NextResponse.json(
        { error: "User data is missing" },
        { status: 409 }
      );
    }

    const userId = user[0].id;
    const listingData: Omit<
      ResidentialPremises,
      "id" | "userId" | "createdAt" | "updatedAt"
    > = await req.json();
    const validListingData = toSnakeCase(
      validationSchema.residentialPremises.parse(listingData)
    );

    const { query, values } = buildSqlQuery(
      "residential_premises_listings",
      { ...validListingData, user_id: userId },
      "insert",
      undefined,
      sqlFieldTypes.residentialPremisesListings
    );

    const newListing = await sql(query, values);

    return NextResponse.json({ listingId: newListing[0].id }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.message }, { status: 422 });
    }

    console.log("error", error);

    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await auth0.getSession();

    if (!session || !session.user) {
      return NextResponse.json({ exists: false }, { status: 401 });
    }

    const { email } = session.user;

    const user = await sql`SELECT id FROM users WHERE email = ${email} LIMIT 1`;

    const userId = user[0]?.id;

    const listingData: Omit<
      ResidentialPremises,
      "userId" | "createdAt" | "updatedAt"
    > = await req.json();
    const validListingData = toSnakeCase(
      validationSchema.residentialPremises.parse(listingData)
    );
    const { id, ...validBaseListingData } = validListingData;

    const listingToUpdate = await sql`
    SELECT id FROM  residential_premises_listings
    WHERE id = ${id} AND user_id = ${userId} LIMIT 1
    `;

    if (!id || !userId || listingToUpdate[0]?.id !== id) {
      return NextResponse.json(
        { error: "Listing/user data is missing" },
        { status: 409 }
      );
    }

    const { query, values } = buildSqlQuery(
      "residential_premises_listings",
      { ...validBaseListingData },
      "update",
      { field: "id", value: id },
      sqlFieldTypes.residentialPremisesListings
    );

    const newListing = await sql(query, values);

    return NextResponse.json({ listingId: newListing[0].id }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.message }, { status: 422 });
    }

    console.log("error", error);

    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth0.getSession();

    if (!session || !session.user) {
      return NextResponse.json({ exists: false }, { status: 401 });
    }

    const { email } = session.user;

    const user = await sql`SELECT id FROM users WHERE email = ${email} LIMIT 1`;

    const userId = user[0]?.id;
    const { id } = await req.json();

    const listingToDelete = await sql`
    SELECT id, user_id, images FROM  residential_premises_listings
    WHERE id = ${id} AND user_id = ${userId} LIMIT 1
    `;

    if (!id || !userId || !listingToDelete.length) {
      return NextResponse.json(
        { error: "Listing/user data is missing" },
        { status: 409 }
      );
    }

    await sql`
    UPDATE residential_premises_listings
    SET deleted_at = NOW(), images = '{}'
    WHERE id = ${listingToDelete[0].id} AND user_id = ${listingToDelete[0].user_id}
    `;
    await deleteImagesByPublicIds(listingToDelete[0].images);

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.message }, { status: 422 });
    }

    console.log("error", error);

    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}
