import { NextRequest, NextResponse } from 'next/server';

import { sqlFieldTypes } from '@/constants/sql';
import { validationSchema } from '@/constants/validationSchemas';
import { auth } from '@/lib/auth';
import { pool } from '@/lib/pool';
import { User } from '@/types/user';
import { buildSqlQuery, safeParseJsonFields, toSnakeCase } from '@/utils/api';

export async function GET() {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = session.user;

    const users = await pool.query(
      'SELECT email, name, role, phone, contacts, id FROM users WHERE id = $1',
      [id]
    );

    if (users.rows.length > 0) {
      const userData = users.rows[0];

      return NextResponse.json({
        data: safeParseJsonFields(userData),
      });
    }

    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  } catch (error: any) {
    console.error('Check or create user error:', error);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id: userId } = session.user;

    const userData: Omit<User, 'created_at'> = await req.json();
    const validUserData = toSnakeCase(validationSchema.user.parse(userData));
    const { id, ...validBaseUserData } = validUserData;

    if (!id) {
      return NextResponse.json(
        { error: 'User id is missing' },
        { status: 403 }
      );
    }

    const { query, values } = buildSqlQuery(
      'users',
      { ...validBaseUserData },
      'update',
      [{ field: 'id', value: userId }],
      sqlFieldTypes.users
    );

    const updatedUser = await pool.query(query, values);

    return NextResponse.json(
      { data: safeParseJsonFields(updatedUser) },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Check or create user error:', error);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
