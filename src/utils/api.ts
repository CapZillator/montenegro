import { SqlFieldTypes } from '@/types/sql';

type WhereCondition = {
  field: string;
  value: any;
};

export const buildSqlQuery = (
  tableName: string,
  data: Record<string, any>,
  type: 'insert' | 'update',
  whereConditions: WhereCondition[] = [],
  fieldTypes: SqlFieldTypes = {}
): { query: string; values: any[] } => {
  const fields: string[] = [];
  const placeholders: string[] = [];
  const values: any[] = [];

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined) {
      fields.push(key);
      const fieldType = fieldTypes[key];

      if (fieldType === 'json') {
        values.push(JSON.stringify(value));
      } else if (fieldType === 'textArray') {
        values.push(value);
      } else {
        values.push(value);
      }

      placeholders.push(`$${values.length}`);
    }
  });

  if (type === 'insert') {
    const query = `
      INSERT INTO ${tableName} (${fields.join(', ')})
      VALUES (${placeholders.join(', ')})
      RETURNING id;
    `;

    return { query, values };
  }

  if (type === 'update' && whereConditions.length > 0) {
    const setClause = fields
      .map((field, i) => `${field} = $${i + 1}`)
      .join(', ');

    const whereClause = whereConditions
      .map((cond, i) => {
        const paramIndex = values.length + i + 1;

        return `${cond.field} = $${paramIndex}`;
      })
      .join(' AND ');

    const whereValues = whereConditions.map((cond) => cond.value);
    const query = `
      UPDATE ${tableName}
      SET ${setClause}
      WHERE ${whereClause}
      RETURNING id;
    `;

    return {
      query,
      values: [...values, ...whereValues],
    };
  }

  throw new Error('Invalid SQL query type or missing conditions for update.');
};

export const buildWhereClauseQuery = (
  filters: { field: string; operator?: string; value: any }[],
  startIndex = 1
): { clause: string; values: any[] } => {
  const clauses: string[] = [];
  const values: any[] = [];

  filters.forEach((cond) => {
    const op = cond.operator ?? '=';
    const placeholder = `$${startIndex + values.length}`;

    if (op === 'IN' && Array.isArray(cond.value)) {
      clauses.push(`${cond.field} = ANY(${placeholder})`);
    } else {
      clauses.push(`${cond.field} ${op} ${placeholder}`);
    }

    values.push(cond.value);
  });

  return {
    clause: clauses.length ? `WHERE ${clauses.join(' AND ')}` : '',
    values,
  };
};

export const toSnakeCase = (obj: Record<string, any>): Record<string, any> => {
  const result: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    result[key.replace(/([A-Z])/g, '_$1').toLowerCase()] = value;
  }

  return result;
};

export const toCamelCase = (obj: Record<string, any>): Record<string, any> => {
  const result: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    result[key.replace(/_([a-z])/g, (_, char) => char.toUpperCase())] = value;
  }

  return result;
};

export const safeParseJsonFields = <T>(data: T): T => {
  const parse = (obj: Record<string, any>) => {
    const result: Record<string, any> = { ...obj };

    for (const key in result) {
      const value = result[key];
      if (typeof value === 'string') {
        if (
          (value.startsWith('{') && value.endsWith('}')) ||
          (value.startsWith('[') && value.endsWith(']'))
        ) {
          try {
            result[key] = JSON.parse(value);
          } catch (_error) {}
        }
      }
    }

    return result;
  };

  if (Array.isArray(data)) {
    return data.map(parse) as T;
  }

  if (typeof data === 'object' && data !== null) {
    return parse(data as Record<string, any>) as T;
  }

  return data;
};
