import React, { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { SectionContainer } from '../../../components/containers';
import CustomTable from '../../../components/tables/CustomTable';
import { CustomTypography } from '../../../components/typography';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import PlayersByNumbers from '../components/PlayersByNumbers';
import { all_time_stats_config, all_time_stats_styles } from '../configs';
import { GET_ALL_TIME_SQUAD_STATS } from '../graphql';
import { FETCH_ALL_PLAYER_STREAKS } from '../graphql/queries/FETCH_ALL_PLAYER_STREAKS';
import { getSquadAllTimeTableData } from '../helpers/getSquadAllTimeTableData';

const AllTimeSquadStats: React.FC = () => {
  const { teamId } = useCustomParams();
  const { data, loading, error } = useQuery(GET_ALL_TIME_SQUAD_STATS, {
    variables: { teamId },
  });
  const {
    data: streaks,
    loading: streaksLoading,
    error: streaksError,
  } = useQuery(FETCH_ALL_PLAYER_STREAKS, {
    variables: { teamId },
  });

  const rows = useMemo(() => {
    if (data && streaks) {
      return getSquadAllTimeTableData(data, streaks, loading, streaksLoading);
    }
  }, [data, streaks, loading, streaksLoading]);

  if (error || streaksError) return <ErrorGraphql error={(error || streaksError) as Error} />;

  return (
    <SectionContainer>
      {data?.stats.length === 0 ? (
        <CustomTypography color="warning">No players yet</CustomTypography>
      ) : (
        <>
          <PlayersByNumbers players={data?.stats || []} loading={loading} showAge={false} />
          <CustomTable
            columns={all_time_stats_config}
            rows={rows || []}
            isSortable
            sortByString="apps"
            cellIndexStyles={all_time_stats_styles}
          />
        </>
      )}
    </SectionContainer>
  );
};

export default AllTimeSquadStats;
