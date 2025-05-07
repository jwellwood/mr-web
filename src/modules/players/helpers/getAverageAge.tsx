import { differenceInYears, isValid, parseISO } from 'date-fns';

export const getAverageAge = (
  datesOfBirth: string[],
  selectedDate?: string
) => {
  const getAges = (dob: string) => {
    const dateToMatch = selectedDate ? new Date(selectedDate) : new Date();
    const date = parseISO(dob);

    if (!isValid(date)) {
      return null;
    }
    const age = differenceInYears(dateToMatch, date);
    return age;
  };
  const ages = datesOfBirth.map((dob) => getAges(dob)).filter(Boolean);
  const averageAge = ages.reduce((a, b) => a + b, 0) / ages.length;
  return averageAge;
};
