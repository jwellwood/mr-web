import { useQuery } from '@apollo/client';
import { useCustomParams } from '../../../../hooks/useCustomParams';

import { FETCH_PLAYER_STREAKS } from '../../graphql';
import { Spinner } from '../../../../components/loaders';
import CustomTable from '../../../../components/tables/CustomTable';
import ErrorGraphql from '../../../../errors/ErrorGraphql';
import { SectionContainer } from '../../../../components';
import { StreakTypes } from '../../types';
import { player_streaks, player_streaks_styles } from '../../configs';
import { getShortDate } from '../../../../utils/helpers';

export default function PlayerGameStreaks() {
  const { playerId, teamId } = useCustomParams();

  const { loading, data, error } = useQuery(FETCH_PLAYER_STREAKS, {
    variables: { playerId, teamId },
  });

  const streaks: StreakTypes = data?.streaks || ({} as StreakTypes);

  const getRowData = (streakType: keyof StreakTypes, currentStreak: keyof StreakTypes) => {
    return {
      current: streaks[currentStreak]?.length || 0,
      longest: streaks[streakType]?.length || 0,
      start: getShortDate(streaks[streakType]?.startDate),
      end: getShortDate(streaks[streakType]?.endDate),
    };
  };

  const rows = [
    {
      label: 'Played',
      ...getRowData('playedStreak', 'currentPlayedStreak'),
    },
    {
      label: 'Goals',
      ...getRowData('goalStreak', 'currentGoalStreak'),
    },
    {
      label: 'Assists',
      ...getRowData('assistStreak', 'currentAssistStreak'),
    },
    {
      label: 'Contributions',
      ...getRowData('contributionStreak', 'currentContributionStreak'),
    },
  ];

  const renderContent = () => {
    return loading ? (
      <Spinner />
    ) : (
      <CustomTable
        columns={player_streaks}
        rows={rows}
        cellIndexStyles={player_streaks_styles}
        isSortable={false}
      />
    );
  };

  return (
    <SectionContainer title="Streaks">
      {error ? <ErrorGraphql error={error} /> : renderContent()}
    </SectionContainer>
  );
}
