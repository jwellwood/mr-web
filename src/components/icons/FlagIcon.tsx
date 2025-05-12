import React from 'react';
import ReactCountryFlag from 'react-country-flag';
import AppIcon from './AppIcon';

interface Props {
  nationality?: string;
  countryName?: string;
  size?: string;
}

const FlagIcon: React.FC<Props> = ({ nationality, countryName, size = '1.2rem' }) => {
  return nationality && nationality !== '' ? (
    <ReactCountryFlag
      countryCode={nationality}
      svg
      style={{
        fontSize: size,
      }}
      aria-label={countryName || 'country-name'}
    />
  ) : (
    <AppIcon icon="team" />
  );
};

export default FlagIcon;
