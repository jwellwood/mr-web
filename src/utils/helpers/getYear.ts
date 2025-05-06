export const getYear = (date) => {
  const year = new Date(date);
  return year.getFullYear();
};
