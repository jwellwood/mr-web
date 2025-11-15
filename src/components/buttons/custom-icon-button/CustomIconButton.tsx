import { IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { IIconType } from '../../icons/types';
import AppIcon from '../../icons/AppIcon';

interface Props {
  icon: IIconType;
  size?: string;
  color?: string;
  onClick: () => void;
}

export default function CustomIconButton({ icon, size = '1rem', color, onClick }: Props) {
  const theme = useTheme();

  const colorToDisplay = color || theme.palette.common.white;

  return (
    <IconButton onClick={onClick} style={{ color: colorToDisplay }}>
      <AppIcon icon={icon} size={size} color={colorToDisplay} />
    </IconButton>
  );
}
