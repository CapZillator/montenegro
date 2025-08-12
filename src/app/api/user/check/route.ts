import { NextResponse } from 'next/server';

import { auth } from '@/lib/auth';
import { pool } from '@/lib/pool';

export async function GET() {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = session.user;
    const existingUser = await pool.query(
      'SELECT id, phone FROM users WHERE id = $1;',
      [id]
    );

    if (existingUser.rows.length > 0) {
      const { id, phone } = existingUser.rows[0];

      return NextResponse.json({
        userStatus: {
          id,
          needsPhone: !phone,
        },
      });
    }

    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  } catch (error: any) {
    console.error('Check or create user error:', error);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
