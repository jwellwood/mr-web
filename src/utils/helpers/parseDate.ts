export function parseDate(rawDate: string | Date): string {
  const date = new Date(rawDate);
  return date.toDateString().substring(4);
};
