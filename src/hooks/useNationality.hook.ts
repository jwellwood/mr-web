import { useMemo } from 'react';
import countryList from 'react-select-country-list';

export const useNationality = (code?: string) => {
  const nationalityList = useMemo(() => countryList().getData(), []);
  const options = nationalityList.map((option) => ({
    label: option.label,
    value: option.value,
  }));
  const nationalityOptions = [{ label: '', value: '' }, ...options];
  const countryName = code ? countryList().getLabel(code) : null;

  return { nationalityOptions, countryName };
};
