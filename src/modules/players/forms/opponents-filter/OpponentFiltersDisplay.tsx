import { Box, Chip, Stack } from '@mui/material';

import { usePlayerOpponentFilters } from '../../context';
import AppIcon from '../../../../components/icons/AppIcon';
import { CustomTypography } from '../../../../components';

export default function OpponentFiltersDisplay() {
  const { filters } = usePlayerOpponentFilters();
  const { showAllOpponents, showAverages } = filters;

  const filterDisplay = (label?: string, applied?: boolean) => {
    return (
      <Chip
        color={applied ? 'primary' : 'default'}
        variant={applied ? 'filled' : 'outlined'}
        label={
          <CustomTypography color={applied ? 'secondary' : 'white'} bold>
            {label}
          </CustomTypography>
        }
      />
    );
  };

  return (
    <Box>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <AppIcon
          size="30px"
          icon={!showAllOpponents && !showAverages ? 'filter' : 'filter-applied'}
          color={!showAllOpponents && !showAverages ? 'data' : 'primary'}
        />
        <Stack direction="row">
          {filterDisplay(showAllOpponents ? 'All Teams' : 'Active Teams', showAllOpponents)}
          {filterDisplay(showAverages ? 'Averages' : 'Basic Stats', showAverages)}
        </Stack>
      </Stack>
    </Box>
  );
}
