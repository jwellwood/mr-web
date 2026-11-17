import { amber, blue, green, red } from '@mui/material/colors';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import CustomTypography from '../custom-typography/CustomTypography';

interface Props {
  position: string;
  size?: string;
}

const POSITION_COLORS: Record<string, string> = {
  GK: amber[500],
  DF: blue[500],
  MF: green[400],
  FW: red[700],
};

const POSITION_KEYS: Record<string, string> = {
  GK: 'POSITION.GK',
  DF: 'POSITION.DF',
  MF: 'POSITION.MF',
  FW: 'POSITION.FW',
};

const PositionText = memo(function PositionText({ position, size = 'xs' }: Props) {
  const { t } = useTranslation('components');

  if (!position) {
    return (
      <CustomTypography bold size={size} color="data">
        -
      </CustomTypography>
    );
  }

  const color = POSITION_COLORS[position] || 'data';
  const translationKey = POSITION_KEYS[position];
  const display = translationKey ? t(translationKey) : position;

  return (
    <CustomTypography bold size={size} color={color}>
      {display}
    </CustomTypography>
  );
});

export default PositionText;
