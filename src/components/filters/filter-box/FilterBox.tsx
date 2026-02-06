import { Box, Stack } from '@mui/material';
import AppIcon from '../../icons/AppIcon';
import FilterChip from '../filter-chip/FilterChip';
import { theme } from '../../../theme';

interface Props {
  filterData: { label: string; applied: boolean }[];
  applied: boolean;
}

export default function FilterBox({ filterData, applied }: Props) {
  return (
    <Box
      border={`1px solid ${applied ? theme.palette.primary.light : 'transparent'}`}
      borderRadius="8px"
      padding="4px"
    >
      <Stack
        direction="row"
        spacing={1}
        sx={{
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <AppIcon
          size="30px"
          icon={!applied ? 'filter' : 'filter'}
          color={!applied ? 'data' : 'primary'}
        />
        <Stack direction="row" spacing={1}>
          {filterData.map(item => (
            <FilterChip key={item.label} label={item.label} applied={item.applied} />
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
