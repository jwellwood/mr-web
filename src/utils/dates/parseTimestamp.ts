export const parseTimestamp = (rawTimestamp?: string | number | Date): string | null => {
  if (!rawTimestamp) {
    return null;
  }
  const date = new Date(rawTimestamp);

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).format(date);
};
