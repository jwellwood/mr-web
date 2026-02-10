import { Divider, Stack } from '@mui/material';
import { theme } from '../../../theme';

interface Props {
  children: React.ReactNode;
  spacing?: number;
  justify?: 'flex-start' | 'center' | 'space-between' | 'flex-end';
  direction?: 'row' | 'column';
  align?: 'flex-start' | 'center' | 'flex-end';
  divider?: boolean;
}

export default function CustomStack({
  children,
  spacing = 1,
  direction = 'column',
  justify = 'center',
  align = 'center',
  divider = false,
}: Props) {
  return (
    <Stack
      spacing={spacing}
      direction={direction}
      sx={{
        justifyContent: justify,
        alignItems: align,
      }}
      divider={
        divider ? (
          <Divider
            orientation="vertical"
            flexItem
            sx={{ background: theme.palette.secondary.light }}
          />
        ) : undefined
      }
    >
      {children}
    </Stack>
  );
}
