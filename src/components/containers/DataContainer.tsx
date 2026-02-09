import { Grid, Paper } from '@mui/material';
import { GridDirection } from '@mui/system';
import React from 'react';
import { theme } from '../../theme';
import { CenteredGrid, GridItem } from '../grids';
import { IListItem } from '../lists/types';
import CustomSkeleton from '../loaders/CustomSkeleton';
import { CustomTypography } from '../typography';

interface Props {
  data: IListItem[];
  size?: number;
  loading?: boolean;
  direction?: GridDirection;
  width?: number;
}

const DataContainer: React.FC<Props> = ({ data, loading, direction = 'row', size = 4 }) => {
  return (
    <CenteredGrid dir={direction}>
      {data.map((item, i) => {
        return (
          <Grid key={String(item.value) + i} size={size}>
            <Paper
              elevation={1}
              sx={{
                textAlign: 'center',
                padding: theme.spacing(0.5),
                background: theme.palette.secondary.main,
              }}
            >
              <CenteredGrid>
                <GridItem>
                  <CustomTypography size="xs" color="label">
                    {item.label}
                  </CustomTypography>
                </GridItem>
                {item.icon && <GridItem>{item.icon}</GridItem>}
                <GridItem>
                  <CustomTypography bold color="data" size="xs">
                    {loading ? <CustomSkeleton height="20px" width="50px" /> : item.value}
                  </CustomTypography>
                </GridItem>
              </CenteredGrid>
            </Paper>
          </Grid>
        );
      })}
    </CenteredGrid>
  );
};

export default DataContainer;
