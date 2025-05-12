import { cache } from "react";

import { sql } from "@/lib/db";
import { ResidentialPremisesFilters } from "@/types/filters";
import { ResidentialPremises } from "@/types/realEstate";

import { buildWhereClauseQuery } from "../api";
import { toCamelCase } from "../api";
import { buildFilterConditions } from "../filters";

export const getListings = cache(
  async (
    filters: ResidentialPremisesFilters
  ): Promise<ResidentialPremises[]> => {
    const conditions = buildFilterConditions(filters);
    const { clause, values } = buildWhereClauseQuery(conditions);

    const query = `
    SELECT *
    FROM residential_premises_listings
    ${clause}
    ORDER BY created_at DESC
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
      LIMIT 1
    `;

    if (result.length === 0) return null;

    return toCamelCase(result[0]) as ResidentialPremises;
  }
);
