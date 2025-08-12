/**
 * @param date - Date in user timezone
 */

export const getRelativeDate = (
  date: string | Date
): {
  i18nKey: string;
  ago?: number;
  time?: string;
} => {
  const now = new Date();
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
  const inputDate = new Date(date);
  const inputDay = new Date(
    inputDate.getFullYear(),
    inputDate.getMonth(),
    inputDate.getDate()
  );

  const msInDay = 1000 * 60 * 60 * 24;
  const diffInMs = startOfToday.getTime() - inputDay.getTime();
  const diffInDays = Math.floor(diffInMs / msInDay);

  const time = inputDate.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  if (diffInDays === 0) {
    return { i18nKey: 'today', time };
  }

  if (diffInDays === 1) {
    return { i18nKey: 'yesterday', time };
  }

  if (diffInDays <= 7) {
    return { i18nKey: 'dayAgo', ago: diffInDays };
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInDays <= 30) {
    return { i18nKey: 'weekAgo', ago: diffInWeeks };
  }

  const diffInMonths =
    now.getFullYear() * 12 +
    now.getMonth() -
    (inputDate.getFullYear() * 12 + inputDate.getMonth());
  if (diffInDays <= 365) {
    return { i18nKey: 'monthAgo', ago: diffInMonths };
  }

  const diffInYears = now.getFullYear() - inputDate.getFullYear();

  return { i18nKey: 'yearAgo', ago: diffInYears };
};
