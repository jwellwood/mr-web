export const defaultDateInForm = (incomingDate: Date | string | number | null | undefined) => {
  const currentDate = new Date();

  return incomingDate && incomingDate !== 'NaN' ? incomingDate : currentDate;
};
