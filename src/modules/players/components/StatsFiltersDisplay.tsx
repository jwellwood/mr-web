import { Box, Chip, Stack } from '@mui/material';

import { useFilters } from '../context';
import { ISelectOptions } from '../../../components/inputs/SelectInput';
import AppIcon from '../../../components/icons/AppIcon';
import { CustomTypography } from '../../../components';

interface Props {
  competitionOptions: ISelectOptions[];
  seasonOptions: ISelectOptions[];
}

export default function StatsFiltersDisplay({ seasonOptions, competitionOptions }: Props) {
  const { filters } = useFilters();
  const { seasons, competitions } = filters;
  const selectedComp = competitionOptions.find(comp => comp.value === competitions);
  const selectedSeason = seasonOptions.find(season => season.value === seasons);

  const filterDisplay = (label?: string, type?: string, applied?: boolean) => {
    return (
      <Chip
        color={applied ? 'primary' : 'default'}
        variant={applied ? 'filled' : 'outlined'}
        label={
          <CustomTypography color={applied ? 'secondary' : 'white'} bold>
            {label === 'All' ? `All ${type}` : label}
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
          icon={competitions === 'all' && seasons === 'all' ? 'filter' : 'filter-applied'}
          color={competitions === 'all' && seasons === 'all' ? 'data' : 'primary'}
        />
        <Stack direction="row">
          {filterDisplay(selectedSeason?.label, 'seasons', selectedSeason?.value !== 'all')}
          {filterDisplay(selectedComp?.label, 'competitions', selectedComp?.value !== 'all')}
        </Stack>
      </Stack>
    </Box>
  );
}
