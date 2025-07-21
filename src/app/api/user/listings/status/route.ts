import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { validationSchema } from '@/constants/validationSchemas';
import { ListingState } from '@/enums/listing';
import { getErrorMessage } from '@/helpers/guards';
import { auth } from '@/lib/auth';
import { sql } from '@/lib/db';
import { ResidentialPremises } from '@/types/realEstate';
import { toSnakeCase } from '@/utils/api';

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ exists: false }, { status: 401 });
    }

    const { id: userId } = session.user;

    const listingData: Partial<ResidentialPremises> = await req.json();
    const { id, state } = toSnakeCase(
      validationSchema.listingState.parse(listingData)
    );

    const listingToUpdate = await sql`
    SELECT id FROM residential_premises_listings
    WHERE id = ${id} AND user_id = ${userId} AND state != ${ListingState.DELETED} LIMIT 1
    `;

    if (!userId || !listingToUpdate.length) {
      return NextResponse.json(
        { error: 'Listing/user data is missing' },
        { status: 409 }
      );
    }

    await sql`
    UPDATE residential_premises_listings
    SET state = ${state}
    WHERE id = ${id} AND user_id = ${userId}
    `;

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
