export const getYear = (date: Date | string) => {
  const year = new Date(date);
  return year.getFullYear();
};
