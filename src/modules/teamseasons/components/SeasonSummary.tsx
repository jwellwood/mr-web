import { useTranslation } from 'react-i18next';
import { DataError, SectionContainer } from '../../../components';
import { CustomStack } from '../../../components/grids';
import { generateOrdinal, getPercentage } from '../../../utils/numbers';
import { mapMatchesStatsToMatchesTable } from '../../matches/components/matches-stats/mappers';
import { useSeasonStats } from '../hooks/useSeasonStats';
import StatBox from './StatBox';

interface Props {
  seasonId: string;
  position?: number;
  totalFinalPositions?: number;
  loading?: boolean;
}

export default function SeasonSummary({ seasonId, position, totalFinalPositions, loading }: Props) {
  const { t, i18n } = useTranslation('teamseasons');

  const { data, loading: statsLoading, error } = useSeasonStats(seasonId, 'all');
  const { played, wins, goalsFor, goalsAgainst, difference } = mapMatchesStatsToMatchesTable(
    data?.stats
  );

  const renderContent = () => {
    return (
      <CustomStack divider direction="row" spacing={1} justify="space-around" align="center">
        <StatBox
          label={t('LABELS.POSITION')}
          primary={{
            show: position !== undefined,
            first: {
              value:
                position !== undefined
                  ? `${position}${generateOrdinal(position, i18n.language, 'feminine')}`
                  : '-',
              color: 'data',
            },
          }}
          secondary={{
            show: totalFinalPositions !== undefined,
            first: { value: position ?? '-', color: 'label' },
            second: { value: totalFinalPositions ?? '-', color: 'label' },
          }}
          loading={loading}
        />
        <StatBox
          label={t('LABELS.WIN_PERCENTAGE')}
          primary={{
            show: !!played,
            first: {
              value: played ? `${getPercentage(wins, played)}%` : '-',
              color: 'data',
            },
            second: { value: '', color: 'data' },
          }}
          secondary={{
            show: !!played,
            first: { value: wins, color: 'label' },
            second: { value: played, color: 'label' },
          }}
          loading={statsLoading}
        />
        <StatBox
          label={t('LABELS.GOAL_DIFFERENCE')}
          primary={{
            show: !!played,
            first: {
              value: played ? `${difference}` : '-',
              color: 'data',
            },
            second: { value: '', color: 'data' },
          }}
          secondary={{
            show: !!played,
            first: { value: goalsFor, color: 'primary' },
            second: { value: -goalsAgainst, color: 'error' },
          }}
          loading={statsLoading}
        />
      </CustomStack>
    );
  };

  return (
    <SectionContainer title={t('HEADERS.SUMMARY')}>
      {error ? <DataError error={error} /> : renderContent()}
    </SectionContainer>
  );
}
