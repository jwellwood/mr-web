export const shortenYear = (year: number | string | null) => {
  const stringYear = String(year);
  if (stringYear.length !== 4 || !year) return year;
  return stringYear.slice(2);
};
