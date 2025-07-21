import { NextRequest, NextResponse } from 'next/server';

import { FETCH_PATHS } from '@/constants/fetch';
import { getErrorMessage } from '@/helpers/guards';

export async function GET(req: NextRequest) {
  try {
    console.log('Getting addr from server side');
    const query = req.nextUrl.searchParams.get('q');
    if (!query) return new Response('Missing query', { status: 400 });

    const url = `${FETCH_PATHS.external.nominatim}/search?format=json&q=${encodeURIComponent(query)}`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'montenegro-app/1.0 (andruf52@gmail.com)',
      },
    });

    const data = await res.json();

    return Response.json(data);
  } catch (error) {
    console.error('Geocode error:', error);

    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}
