export function parseDate(rawDate?: string | Date): string | null {
  if (!rawDate) {
    return null;
  }
  const date = new Date(rawDate);
  return date.toDateString().substring(4);
}
