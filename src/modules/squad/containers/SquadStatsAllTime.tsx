import { useMemo } from 'react';
import { useQuery } from '@apollo/client';

import { FETCH_SQUAD_STATS_ALL_TIME, FETCH_SQUAD_STREAKS } from '../graphql';
import { SectionContainer } from '../../../components';
import CustomTable from '../../../components/tables/CustomTable';
import { CustomTypography } from '../../../components/typography';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import PlayersByNumbers from '../components/PlayersByNumbers';
import { squad_stats_all_time, all_time_styles } from '../configs';
import { getSquadAllTimeTableData } from '../helpers';

export default function SquadStatsAllTime() {
  const { teamId } = useCustomParams();
  const { data, loading, error } = useQuery(FETCH_SQUAD_STATS_ALL_TIME, {
    variables: { teamId },
  });
  const {
    data: streaks,
    loading: streaksLoading,
    error: streaksError,
  } = useQuery(FETCH_SQUAD_STREAKS, {
    variables: { teamId },
  });

  const rows = useMemo(() => {
    if (data && streaks) {
      return getSquadAllTimeTableData(data, streaks, loading, streaksLoading);
    }
  }, [data, streaks, loading, streaksLoading]);

  const renderContent = () => {
    return data?.stats.length === 0 ? (
      <CustomTypography color="warning">No players yet</CustomTypography>
    ) : (
      <>
        <PlayersByNumbers players={data?.stats || []} loading={loading} showAge={false} />
        <CustomTable
          columns={squad_stats_all_time}
          rows={rows || []}
          isSortable
          sortByString="apps"
          cellIndexStyles={all_time_styles}
        />
      </>
    );
  };

  return (
    <SectionContainer title="All Time Stats">
      {error || streaksError ? (
        <ErrorGraphql error={(error || streaksError) as Error} />
      ) : (
        renderContent()
      )}
    </SectionContainer>
  );
}
