import { getPercentage } from '../../../utils';
import { CustomPieChart } from '../../charts';
import { DataContainer } from '../../containers';
import { CustomGridContainer, CustomGridItem } from '../../grids';
import { StatSkeleton, CustomSkeleton } from '../../loaders';
import { CustomTypography } from '../../typography';
import { IMatchesAveragesStats } from '../types';

interface Props {
  stats?: IMatchesAveragesStats;
  loading: boolean;
}

export default function MatchAverages({ stats, loading }: Props) {
  const { total, wins, draws, defeats, teamAvg, oppAvg } = stats || {
    total: 0,
    wins: 0,
    draws: 0,
    defeats: 0,
    teamAvg: 0,
    oppAvg: 0,
    difference: 0,
  };

  const difference = teamAvg - oppAvg;
  const percentageData = [
    {
      label: 'Win %',
      value: loading ? <StatSkeleton /> : `${getPercentage(wins || 0, total || 0, 1)}%`,
    },
    {
      label: 'Draw %',
      value: loading ? <StatSkeleton /> : `${getPercentage(draws || 0, total || 0, 1)}%`,
    },
    {
      label: 'Defeat %',
      value: loading ? <StatSkeleton /> : `${getPercentage(defeats || 0, total || 0, 1)}%`,
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
        <CustomTypography bold size="xs" color={difference > 0 ? 'success' : 'error'}>
          {difference.toFixed(2)}
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
    <CustomGridContainer>
      <CustomGridItem size={4}>
        {loading ? (
          <CustomSkeleton variant="circular" height="110px" width="110px" />
        ) : (
          <CustomPieChart
            data={pieData}
            colors={['rgb(47, 219, 145)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)']}
          />
        )}
      </CustomGridItem>
      <CustomGridItem size={8}>
        <DataContainer data={percentageData} loading={loading} />
      </CustomGridItem>
    </CustomGridContainer>
  );
}
