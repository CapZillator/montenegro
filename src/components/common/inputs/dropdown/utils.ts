export const getLabel = (
  values: { name: string; value: string | boolean }[],
  selectedValues: string | boolean | Array<string | boolean>,
  useValueAsName?: boolean,
  predefinedLabel?: string
) => {
  if (typeof selectedValues === "string" || typeof selectedValues === "boolean") {
    const label = useValueAsName
      ? selectedValues
      : values.find((value) => value.value === selectedValues)?.name ?? "";

    return label ? label: predefinedLabel;
  }

  if (Array.isArray(selectedValues) && selectedValues.length) {
    const label = useValueAsName
      ? selectedValues[0]
      : values.find((value) => value.value === selectedValues[0])?.name;

    return label ? label: predefinedLabel;
  }

  return undefined;
};
