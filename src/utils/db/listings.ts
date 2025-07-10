import { cache } from 'react';

import { ListingState } from '@/enums/listing';
import { sql } from '@/lib/db';
import { ResidentialPremisesFilters } from '@/types/filters';
import { ResidentialPremises } from '@/types/realEstate';
import { SortOption } from '@/types/sorting';
import { User } from '@/types/user';

import { buildWhereClauseQuery } from '../api';
import { toCamelCase } from '../api';
import { buildFilterConditions } from '../filters';
import { SORT_SQL_MAP } from './constants';

const getOrderByClause = (sort?: string): string => {
  if (!sort) return 'ORDER BY created_at DESC';

  const value = sort.toLowerCase() as SortOption;

  if (value in SORT_SQL_MAP) {
    return `ORDER BY ${SORT_SQL_MAP[value as SortOption]}`;
  }

  return 'ORDER BY created_at DESC';
};

export const getListings = cache(
  async (
    filters: ResidentialPremisesFilters,
    sort = SortOption.NEWEST
  ): Promise<ResidentialPremises[]> => {
    const conditions = buildFilterConditions(filters);
    const { clause, values } = buildWhereClauseQuery([
      ...conditions,
      { field: 'state', operator: '=', value: ListingState.ACTIVE },
    ]);

    const orderBy = getOrderByClause(sort);

    const query = `
      SELECT *
      FROM residential_premises_listings
      ${clause}
      ${orderBy}
      LIMIT 20;
    `;

    const result = await sql(query, values);

    return result.map(toCamelCase) as ResidentialPremises[];
  }
);

export const getListingById = cache(
  async (id: string): Promise<ResidentialPremises | null> => {
    const result = await sql`
      SELECT * FROM residential_premises_listings
      WHERE id = ${id} 
      AND state != ${ListingState.DELETED}
      LIMIT 1
    `;

    if (result.length === 0) return null;

    return toCamelCase(result[0]) as ResidentialPremises;
  }
);

export const getListingOwnerById = cache(
  async (
    id: string
  ): Promise<Pick<User, 'name' | 'phone' | 'contacts'> | null> => {
    const result = await sql`
      SELECT name, phone, contacts FROM users
      WHERE id = ${id}
      LIMIT 1
    `;

    if (result.length === 0) return null;

    return toCamelCase(result[0]) as Pick<User, 'name' | 'phone' | 'contacts'>;
  }
);
