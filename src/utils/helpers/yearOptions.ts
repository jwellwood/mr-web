import {BASE_YEAR, MAX_YEAR} from "../../constants.ts";

interface IYearOptions {
  label: string;
  value: number;
}

export function yearOptions(
  minYear: string | number = BASE_YEAR,
  maxYear: string | number = MAX_YEAR
): IYearOptions[] {
  if (typeof minYear !== 'number') minYear = +minYear;
  if (typeof maxYear !== 'number') maxYear = +maxYear;
  const years = [];
  for (let i: number = minYear; i <= maxYear; i++) {
    years.push(i);
  }
  return years.map((year) => ({ label: year.toString(), value: year }));
};
