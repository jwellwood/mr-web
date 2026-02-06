import { Chip } from '@mui/material';
import { CustomTypography } from '../../typography';

interface Props {
  label: string;
  applied: boolean;
}

export default function FilterChip({ label, applied }: Props) {
  return (
    <Chip
      color={applied ? 'primary' : 'default'}
      variant={applied ? 'filled' : 'outlined'}
      label={
        <CustomTypography color={applied ? 'secondary' : 'white'} bold size="xs">
          {label}
        </CustomTypography>
      }
    />
  );
}
