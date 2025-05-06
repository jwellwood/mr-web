import { BASE_YEAR, MAX_YEAR } from 'app/constants';

interface IYearOptions {
  label: string;
  value: number;
}

export const yearOptions: Function = (
  minYear: number = BASE_YEAR,
  maxYear: number = MAX_YEAR
): IYearOptions[] => {
  if (typeof minYear !== 'number') minYear = +minYear;
  if (typeof maxYear !== 'number') maxYear = +maxYear;
  const years = [];
  for (let i: number = minYear; i <= maxYear; i++) {
    years.push(i);
  }
  return years.map((year) => ({ label: year.toString(), value: year }));
};
