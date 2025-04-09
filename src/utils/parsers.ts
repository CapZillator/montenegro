const DEFAULT_NUMERIC_VALUE = 0;

export const parseNumberFromString = (data: string) => {
  const numericValue =
    Math.round((+data.replace(/ /g, "") + Number.EPSILON) * 100) / 100;

  return isNaN(numericValue) || numericValue < DEFAULT_NUMERIC_VALUE
    ? DEFAULT_NUMERIC_VALUE
    : numericValue;
};
