export const isoUTCStringToLocaleString = (rawDate: string) => {
  const date = new Date(rawDate);
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);

  return `${local.getDate().toString().padStart(2, "0")}.${(
    local.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}.${local.getFullYear()} ${local
    .getHours()
    .toString()
    .padStart(2, "0")}:${local.getMinutes().toString().padStart(2, "0")}`;
};
