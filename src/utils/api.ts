export const buildSqlQuery = (
  tableName: string,
  data: Record<string, any>,
  type: "insert" | "update",
  whereCondition?: { field: string; value: any }
) => {
  const sqlFields: string[] = [];
  const sqlValues: any[] = [];

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined) {
      sqlFields.push(key);
      sqlValues.push(value);
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
  } else if (type === "update" && whereCondition) {
    const setClauses = sqlFields
      .map((field, i) => `${field} = $${i + 1}`)
      .join(", ");
    sqlValues.push(whereCondition.value);

    return {
      query: `
          UPDATE ${tableName}
          SET ${setClauses}
          WHERE ${whereCondition.field} = $${sqlValues.length}
          RETURNING id;
        `,
      values: sqlValues,
    };
  }

  throw new Error("Invalid SQL query type or missing condition for update.");
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
