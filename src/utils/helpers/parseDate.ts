export function parseDate(rawDate?: string | Date): string | null {
  if (!rawDate) {
    return null;
  }
  const date = new Date(rawDate);
  return date.toDateString().substring(4);
}

export function getShortDate(rawDate?: string | Date | null): string | null {
  if (!rawDate) {
    return null;
  }
  const date = new Date(rawDate);
  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  }).format(date);

  return formattedDate;
}
