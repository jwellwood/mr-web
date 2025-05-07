import { differenceInYears } from 'date-fns';
import { parseDate } from 'utils/helpers';

export const useDateOfBirth = (dateOfBirth: string) => {
  const today = new Date();
  const birthdayAsDate = isNaN(+dateOfBirth)
    ? new Date(dateOfBirth)
    : new Date(+dateOfBirth);
  const formattedDateOfBirth = parseDate(+dateOfBirth);

  const age = dateOfBirth ? differenceInYears(today, birthdayAsDate) : '-';

  return { formattedDateOfBirth, age };
};
