import ReactCountryFlag from 'react-country-flag';
import AppIcon from '../app-icon/AppIcon';
import StatSkeleton from '../../loaders/StatSkeleton';

interface Props {
  nationality?: string;
  countryName?: string;
  size?: string;
  loading?: boolean;
}

export default function FlagIcon({ nationality, countryName, size = '1.2rem', loading }: Props) {
  const renderIcon =
    nationality && nationality !== '' ? (
      <ReactCountryFlag
        countryCode={nationality}
        svg
        style={{
          fontSize: size,
        }}
        aria-label={countryName || 'country-name'}
      />
    ) : (
      <AppIcon icon="flag" color="data" />
    );

  return loading ? <StatSkeleton /> : renderIcon;
}
