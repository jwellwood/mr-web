import React from 'react';
import { Grid, Paper } from '@mui/material';
import { GridDirection } from '@mui/system';
import { CenteredGrid, GridItem } from '../grids';
import CustomSkeleton from '../loaders/CustomSkeleton';
import { CustomTypography } from '../typography';
import { theme } from 'theme';
import { IListItem } from '../../types';
interface Props {
  data: IListItem[];
  loading?: boolean;
  direction?: GridDirection;
  width?: number;
}

const DataContainer: React.FC<Props> = ({
  data,
  loading,
  width = 4,
  direction = 'row',
}) => {
  return (
    <CenteredGrid dir={direction}>
      {data.map((item, i) => {
        return (
          <Grid key={i} item xs={width} sx={{ width: '100%' }}>
            <Paper
              elevation={1}
              sx={{
                textAlign: 'center',
                padding: theme.spacing(0.5),
                background: theme.palette.secondary.main,
                borderBottom: `0.5px solid ${theme.palette.common.white}`,
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
                    {loading ? (
                      <CustomSkeleton height="20px" width="50px" />
                    ) : (
                      item.value
                    )}
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
