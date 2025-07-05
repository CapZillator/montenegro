export type SqlFieldTypes = Record<string, 'textArray' | 'json' | 'primitive'>;

export type SqlOperator = '=' | '>' | '>=' | '<' | '<=' | '!=' | 'ILIKE' | 'IN';
