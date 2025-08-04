import { NextResponse } from 'next/server';

import { FETCH_PATHS } from '@/constants/fetch';
import { getErrorMessage } from '@/helpers/guards';
import { sql } from '@/lib/db';
import { Currency } from '@/types/currency';

const EXCHANGE_RATES_URL = `${FETCH_PATHS.external.exchangeRates}/live?access_key=${process.env.EXCHANGERATE_KEY}&source=${Currency.USD}&currencies=${Currency.EUR},${Currency.VND}`;
const ONE_DAY_MS = 1000 * 60 * 60 * 24;

export async function GET() {
  try {
    const result = await sql`
      SELECT rates, updated_at FROM exchange_rates
      WHERE base_currency = 'USD'
      LIMIT 1
    `;

    const now = new Date();
    const lastUpdated = result[0]?.updated_at;
    const isFresh =
      lastUpdated &&
      now.getTime() - new Date(lastUpdated).getTime() < ONE_DAY_MS;

    if (isFresh) {
      return NextResponse.json(result[0].rates);
    }

    const res = await fetch(EXCHANGE_RATES_URL);
    if (!res.ok) {
      return NextResponse.json(
        { error: 'Exchange API failed' },
        { status: 500 }
      );
    }

    const data = await res.json();
    if (!data.success || !data.quotes) {
      return NextResponse.json(
        { error: 'Invalid exchange data' },
        { status: 502 }
      );
    }

    const parsedRates = {} as Record<Currency, number>;
    Object.entries(data.quotes).forEach(([key, value]) => {
      const currency = key.replace(/^USD/, '') as Currency;
      parsedRates[currency] = value as number;
    });

    await sql`
      INSERT INTO exchange_rates (id, base_currency, rates, updated_at)
      VALUES (1, 'USD', ${JSON.stringify(parsedRates)}, ${now.toISOString()})
      ON CONFLICT (id) DO UPDATE SET
        rates = EXCLUDED.rates,
        updated_at = EXCLUDED.updated_at
    `;

    return NextResponse.json(parsedRates);
  } catch (error) {
    console.error('Error fetching exchange rates:', error);

    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}
