import { Box } from '@mui/material';
import { PieChart, pieArcClasses } from '@mui/x-charts/PieChart';
import { theme } from '../../../theme';

type PieData = {
  name: string;
  value: number;
  color?: string;
};
interface Props {
  data: PieData[];
  height?: number;
  colors?: string[];
}

export default function CustomPieChart({ data, colors, height = 100 }: Props) {
  return (
    <Box sx={{ padding: '4px' }}>
      <PieChart
        colors={colors}
        series={[{ data, innerRadius: 25, outerRadius: 50, paddingAngle: 5 }]}
        height={height}
        hideLegend={true}
        margin={{
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
        sx={{
          [`& .${pieArcClasses.root}`]: {
            stroke: theme.palette.data.main,
            strokeWidth: '0px',
          },
        }}
      />
    </Box>
  );
}
