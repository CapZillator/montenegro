import { cache } from 'react';

import { ListingState } from '@/enums/listing';
import { pool } from '@/lib/pool';
import { ResidentialPremisesFilters } from '@/types/filters';
import { ResidentialPremises } from '@/types/realEstate';
import { SortOption } from '@/types/sorting';
import { User } from '@/types/user';

import { buildWhereClauseQuery } from '../api';
import { toCamelCase } from '../api';
import { buildFilterConditions } from '../filters';
import { PAGINATION_OPTIONS, SORT_SQL_MAP } from './constants';

const getOrderByClause = (sort?: string): string => {
  if (!sort) return 'ORDER BY created_at DESC';

  const value = sort.toLowerCase() as SortOption;

  if (value in SORT_SQL_MAP) {
    return `ORDER BY ${SORT_SQL_MAP[value as SortOption]}`;
  }

  return 'ORDER BY created_at DESC';
};

const safeParseJson = (raw: unknown) => {
  if (raw == null) return null;

  if (typeof raw === 'object') return raw;

  if (typeof raw !== 'string') return null;

  const data = raw.trim();

  if (!data) return null;

  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
};

export const getListings = cache(
  async (
    filters: ResidentialPremisesFilters,
    sort = SortOption.NEWEST,
    page = PAGINATION_OPTIONS.defaultPage,
    perPage = PAGINATION_OPTIONS.itemsPerPage
  ): Promise<{
    listings: ResidentialPremises[];
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
  }> => {
    const conditions = buildFilterConditions(filters);
    const { clause, values } = buildWhereClauseQuery([
      ...conditions,
      { field: 'state', operator: '=', value: ListingState.ACTIVE },
    ]);

    const orderBy = getOrderByClause(sort);
    const offset = (page - 1) * perPage;
    const limitParamIndex = values.length + 1;
    const offsetParamIndex = values.length + 2;

    const listingsQuery = `
      SELECT *
      FROM residential_premises_listings
      ${clause}
      ${orderBy}
      LIMIT $${limitParamIndex}
      OFFSET $${offsetParamIndex};
    `;

    const countQuery = `
      SELECT COUNT(*) AS total
      FROM residential_premises_listings
      ${clause};
    `;

    const listingsValues = [...values, perPage, offset];

    const [listingsResult, countResult] = await Promise.all([
      pool.query(listingsQuery, listingsValues),
      pool.query(countQuery, values),
    ]);
    const total = Number(countResult.rows[0]?.total ?? 0);
    const totalPages = Math.max(1, Math.ceil(total / perPage));

    return {
      listings: listingsResult.rows.map(toCamelCase) as ResidentialPremises[],
      total,
      page,
      perPage,
      totalPages,
    };
  }
);

export const getListingById = cache(
  async (id: string): Promise<ResidentialPremises | null> => {
    const result = await pool.query(
      `
      SELECT * FROM residential_premises_listings
      WHERE id = $1 
      AND state != $2
      LIMIT 1
    `,
      [id, ListingState.DELETED]
    );

    if (result.rows.length === 0) return null;

    return toCamelCase(result.rows[0]) as ResidentialPremises;
  }
);

export const getListingOwnerById = cache(
  async (
    id: string
  ): Promise<Pick<User, 'name' | 'phone' | 'contacts'> | null> => {
    const result = await pool.query(
      `
      SELECT name, phone, contacts FROM users
      WHERE id = $1
      LIMIT 1
    `,
      [id]
    );

    if (result.rows.length === 0) return null;

    return {
      ...toCamelCase(result.rows[0]),
      contacts: safeParseJson(result.rows[0].contacts),
    } as Pick<User, 'name' | 'phone' | 'contacts'>;
  }
);
