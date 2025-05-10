import {differenceInYears, isValid, parseISO} from 'date-fns';

export const getAverageAge = (
  datesOfBirth: string[],
  selectedDate?: string
): number => {
  const dateToMatch = selectedDate ? new Date(selectedDate) : new Date();

  const getAge = (dob: string): number | null => {
    const date = parseISO(dob);
    return isValid(date) ? differenceInYears(dateToMatch, date) : null;
  };

  let totalValid = 0
  const totalAges = datesOfBirth.reduce((
      total: number, dateOfBirth: string
  ) => {
    const age = getAge(dateOfBirth)

    if (age) {
      totalValid++
    }
    return total + (age || 0)
  }, 0)

  return totalValid ? totalAges / totalValid : 0
};
