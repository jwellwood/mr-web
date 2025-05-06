export const parseDate: Function = (rawDate: string): string => {
  const date = new Date(rawDate);
  return date.toDateString().substring(4);
};
