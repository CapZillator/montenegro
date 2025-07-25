import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { sqlFieldTypes } from '@/constants/sql';
import { validationSchema } from '@/constants/validationSchemas';
import { ListingState } from '@/enums/listing';
import { getErrorMessage } from '@/helpers/guards';
import { auth } from '@/lib/auth';
import { sql } from '@/lib/db';
import { deleteImagesByPublicIds } from '@/lib/images/deleteImagesByPublicIds';
import { ResidentialPremises } from '@/types/realEstate';
import { buildSqlQuery, safeParseJsonFields, toSnakeCase } from '@/utils/api';

export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ exists: false }, { status: 401 });
    }

    const { id } = session.user;

    if (!id) {
      return NextResponse.json(
        { error: 'User id is missing' },
        { status: 403 }
      );
    }

    const searchParams = req.nextUrl.searchParams;
    const listingId = searchParams.get('listingId');

    const listings = listingId
      ? await sql`
        SELECT * FROM residential_premises_listings
        WHERE user_id = ${id} AND id = ${listingId}
        AND state != ${ListingState.DELETED}
      `
      : await sql`
        SELECT * FROM residential_premises_listings
        WHERE user_id = ${id} AND state != ${ListingState.DELETED}
      `;

    return NextResponse.json(
      { listings: safeParseJsonFields(listings) },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.message }, { status: 422 });
    }

    console.error('error', error);

    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ exists: false }, { status: 401 });
    }

    const { id } = session.user;

    if (!id) {
      return NextResponse.json(
        { error: 'User id is missing' },
        { status: 403 }
      );
    }

    const listingData: Omit<
      ResidentialPremises,
      'id' | 'userId' | 'createdAt' | 'updatedAt'
    > = await req.json();
    const validListingData = toSnakeCase(
      validationSchema.residentialPremises.parse(listingData)
    );

    const { query, values } = buildSqlQuery(
      'residential_premises_listings',
      { ...validListingData, user_id: id },
      'insert',
      undefined,
      sqlFieldTypes.residentialPremisesListings
    );

    const newListing = await sql(query, values);

    return NextResponse.json({ listingId: newListing[0].id }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.message }, { status: 422 });
    }

    console.error('error', error);

    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ exists: false }, { status: 401 });
    }

    const { id: userId } = session.user;

    const listingData: Omit<
      ResidentialPremises,
      'userId' | 'createdAt' | 'updatedAt'
    > = await req.json();
    const validListingData = toSnakeCase(
      validationSchema.residentialPremises.parse(listingData)
    );
    const { id, ...validBaseListingData } = validListingData;

    if (!id || !userId) {
      return NextResponse.json(
        { error: 'Listing/user data is missing' },
        { status: 409 }
      );
    }

    const { query, values } = buildSqlQuery(
      'residential_premises_listings',
      { ...validBaseListingData },
      'update',
      [
        { field: 'id', value: id },
        { field: 'user_id', value: userId },
      ],
      sqlFieldTypes.residentialPremisesListings
    );

    const newListing = await sql(query, values);

    return NextResponse.json({ listingId: newListing[0].id }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.message }, { status: 422 });
    }

    console.error('error', error);

    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ exists: false }, { status: 401 });
    }

    const { id: userId } = session.user;
    const { id } = await req.json();

    const listingToDelete = await sql`
    SELECT id, user_id, images FROM  residential_premises_listings
    WHERE id = ${id} AND user_id = ${userId} LIMIT 1
    `;

    if (!id || !userId || !listingToDelete.length) {
      return NextResponse.json(
        { error: 'Listing/user data is missing' },
        { status: 409 }
      );
    }

    await sql`
    UPDATE residential_premises_listings
    SET deleted_at = NOW(), images = '{}', state = ${ListingState.DELETED}
    WHERE id = ${listingToDelete[0].id} AND user_id = ${listingToDelete[0].user_id}
    `;
    await deleteImagesByPublicIds(listingToDelete[0].images);

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.message }, { status: 422 });
    }

    console.error('error', error);

    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}
