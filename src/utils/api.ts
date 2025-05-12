import { FilterCondition } from "@/types/filters";
import { SqlFieldTypes } from "@/types/sql";

type WhereCondition = {
  field: string;
  value: any;
};

const arrayToPostgresLiteral = (arr: string[]) => {
  const escaped = arr.map(
    (item) =>
      `"${item
        .replace(/\\/g, "\\\\")
        .replace(/"/g, '\\"')
        .replace(/'/g, "''")}"`
  );

  return `{${escaped.join(",")}}`;
};

export const buildSqlQuery = (
  tableName: string,
  data: Record<string, any>,
  type: "insert" | "update",
  whereConditions: WhereCondition[] = [],
  fieldTypes: SqlFieldTypes = {}
) => {
  const sqlFields: string[] = [];
  const sqlValues: any[] = [];

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined) {
      sqlFields.push(key);
      const fieldType = fieldTypes[key];

      if (fieldType === "textArray") {
        sqlValues.push(arrayToPostgresLiteral(value));
      } else if (fieldType === "json") {
        sqlValues.push(JSON.stringify(value));
      } else {
        sqlValues.push(value);
      }
    }
  });

  if (type === "insert") {
    return {
      query: `
        INSERT INTO ${tableName} (${sqlFields.join(", ")})
        VALUES (${sqlValues.map((_, i) => `$${i + 1}`).join(", ")})
        RETURNING id;
      `,
      values: sqlValues,
    };
  }

  if (type === "update" && whereConditions.length > 0) {
    const setClauses = sqlFields
      .map((field, i) => `${field} = $${i + 1}`)
      .join(", ");

    const whereClauses = whereConditions
      .map((cond, i) => `${cond.field} = $${sqlValues.length + i + 1}`)
      .join(" AND ");

    const whereValues = whereConditions.map((cond) => cond.value);
    const allValues = [...sqlValues, ...whereValues];

    return {
      query: `
        UPDATE ${tableName}
        SET ${setClauses}
        WHERE ${whereClauses}
        RETURNING id;
      `,
      values: allValues,
    };
  }

  throw new Error("Invalid SQL query type or missing conditions for update.");
};

export const buildWhereClauseQuery = (conditions: FilterCondition[]) => {
  const clauses: string[] = [];
  const values: any[] = [];

  conditions.forEach((cond) => {
    const operator = cond.operator ?? "=";
    const placeholder = `$${values.length + 1}`;

    if (operator === "IN" && Array.isArray(cond.value)) {
      clauses.push(`${cond.field} = ANY(${placeholder})`);
    } else {
      clauses.push(`${cond.field} ${operator} ${placeholder}`);
    }

    values.push(cond.value);
  });

  return {
    clause: clauses.length > 0 ? `WHERE ${clauses.join(" AND ")}` : "",
    values,
  };
};

export const toSnakeCase = (obj: Record<string, any>): Record<string, any> => {
  const result: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    result[key.replace(/([A-Z])/g, "_$1").toLowerCase()] = value;
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
      if (typeof value === "string") {
        if (
          (value.startsWith("{") && value.endsWith("}")) ||
          (value.startsWith("[") && value.endsWith("]"))
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

  if (typeof data === "object" && data !== null) {
    return parse(data as Record<string, any>) as T;
  }

  return data;
};
