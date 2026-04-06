import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import countryList from 'react-select-country-list';

export const useNationality = (code?: string) => {
  const { i18n } = useTranslation();

  const displayNames = useMemo(
    () => new Intl.DisplayNames([i18n.language], { type: 'region' }),
    [i18n.language]
  );

  const options = useMemo(
    () =>
      countryList()
        .getValues()
        .map(value => ({
          label: displayNames.of(value) ?? value,
          value,
        }))
        .sort((a, b) => a.label.localeCompare(b.label, i18n.language)),
    [displayNames, i18n.language]
  );

  const nationalityOptions = [{ label: '', value: '' }, ...options];
  const countryName = code ? (displayNames.of(code) ?? null) : null;
  const getCountryName = (c: string) => displayNames.of(c) ?? null;

  return { nationalityOptions, countryName, getCountryName };
};
