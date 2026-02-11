import { Grid, Paper } from '@mui/material';
import { theme } from '../../../theme';
import { CustomGridContainer, CustomGridItem } from '../../grids';
import { type IListItem } from '../../lists';
import CustomSkeleton from '../../loaders/custom-skeleton/CustomSkeleton';
import { CustomTypography } from '../../typography';

interface Props {
  data: IListItem[];
  size?: number;
  loading?: boolean;

  width?: number;
}

export default function DataContainer({ data, loading, size = 4 }: Props) {
  return (
    <CustomGridContainer>
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
              <CustomGridContainer direction="column">
                <CustomTypography size="xs" color="label">
                  {item.label}
                </CustomTypography>
                {item.icon && <CustomGridItem>{item.icon}</CustomGridItem>}
                <CustomGridItem>
                  <CustomTypography bold color="data" size="xs">
                    {loading ? <CustomSkeleton height="20px" width="50px" /> : item.value}
                  </CustomTypography>
                </CustomGridItem>
              </CustomGridContainer>
            </Paper>
          </Grid>
        );
      })}
    </CustomGridContainer>
  );
}
