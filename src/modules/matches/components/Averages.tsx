import CustomPieChart from '../../../components/charts/CustomPieChart';
import { DataContainer } from '../../../components/containers';
import { CenteredGrid, GridItem } from '../../../components/grids';
import StatSkeleton from '../../../components/loaders/StatSkeleton';
import { CustomTypography } from '../../../components/typography';
import { getPercentage } from '../../../utils/helpers';
import { IMatchStats } from '../types';

type Props = {
  stats?: IMatchStats | null;
  loading: boolean;
};

export default function Averages({ stats, loading }: Props) {
  if (!stats)
    return (
      <CenteredGrid>
        <StatSkeleton />
      </CenteredGrid>
    );
  const { total, wins, draws, defeats, teamAvg, oppAvg } = stats;
  const avDiff = teamAvg - oppAvg;
  const percentageData = [
    {
      label: 'Win %',
      value: loading ? <StatSkeleton /> : `${getPercentage(wins, total, 1)}%`,
    },
    {
      label: 'Draw %',
      value: loading ? <StatSkeleton /> : `${getPercentage(draws, total, 1)}%`,
    },
    {
      label: 'Defeat %',
      value: loading ? <StatSkeleton /> : `${getPercentage(defeats, total, 1)}%`,
    },
    {
      label: 'Av. Goals',
      value: loading ? <StatSkeleton /> : teamAvg?.toFixed(1),
    },
    {
      label: '+/-',
      value: loading ? (
        <StatSkeleton />
      ) : (
        <CustomTypography bold size="xs" color={avDiff > 0 ? 'success' : 'error'}>
          {avDiff.toFixed(2)}
        </CustomTypography>
      ),
    },
    {
      label: 'Av. Conc',
      value: loading ? <StatSkeleton /> : oppAvg?.toFixed(1),
    },
  ];

  const pieData = [
    { value: wins || 0, name: 'Wins' },
    { value: draws || 0, name: 'Draws' },
    { value: defeats || 0, name: 'Defeats' },
  ];

  return (
    <CenteredGrid dir="row">
      <GridItem size={4}>
        <CustomPieChart
          data={pieData}
          colors={['rgb(47, 219, 145)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)']}
        />
      </GridItem>
      <GridItem size={8}>
        <DataContainer data={percentageData} loading={loading} />
      </GridItem>
    </CenteredGrid>
  );
}
