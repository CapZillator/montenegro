import { filterConfig } from '@/constants/filters';
import { FilterCondition, ResidentialPremisesFilters } from '@/types/filters';
import { SqlOperator } from '@/types/sql';

export const parseSearchParamsToFilters = (
  params: Record<string, string | string[] | undefined>
): ResidentialPremisesFilters => {
  const filters: Partial<ResidentialPremisesFilters> = {};

  const setFilter = <K extends keyof ResidentialPremisesFilters>(
    key: K,
    value: ResidentialPremisesFilters[K]
  ) => {
    filters[key] = value;
  };

  for (const conf of filterConfig) {
    const raw = params[conf.key];

    if (raw) {
      const value = conf.parse(raw);
      setFilter(conf.key, value);
    }
  }

  return filters;
};

export const buildFilterConditions = (
  filters: ResidentialPremisesFilters
): FilterCondition[] => {
  const conditions: FilterCondition[] = [];

  const addCondition = <K extends keyof ResidentialPremisesFilters>(
    key: K,
    field: string,
    operator: SqlOperator,
    test: (value: ResidentialPremisesFilters[K]) => boolean
  ) => {
    const value = filters[key];
    if (test(value)) {
      conditions.push({ field, operator, value });
    }
  };

  for (const conf of filterConfig) {
    addCondition(conf.key, conf.field, conf.operator, conf.test);
  }

  return conditions;
};

export const cleanObject = <T extends Record<string, any>>(
  obj: T,
  shouldKeep: (value: any) => boolean = (v) => v != null
): Partial<T> =>
  Object.fromEntries(
    Object.entries(obj).filter(([, value]) => shouldKeep(value))
  ) as Partial<T>;
