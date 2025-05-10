import React, { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { SectionContainer } from '../../../components/containers';
import CustomTable from '../../../components/tables/CustomTable';
import { CustomTypography } from '../../../components/typography';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import PlayersByNumbers from '../components/PlayersByNumbers';
import { season_stats_styles, squad_detailed_stats } from '../configs';
import { GET_ALL_TIME_SQUAD_STATS } from '../graphql';
import { getSquadSeasonTableData } from '../helpers/getSquadSeasonTableData';

const AllTimeSquadStats: React.FC = () => {
  const { teamId } = useCustomParams();
  const { data, loading, error } = useQuery(GET_ALL_TIME_SQUAD_STATS, {
    variables: { teamId },
  });

  const rows = useMemo(() => {
    if (data) {
      return getSquadSeasonTableData(data, loading);
    }
  }, [data, loading]);

  if (error) {
    return <ErrorGraphql error={error} />;
  }

  return (
    <SectionContainer>
      {data?.stats.length === 0 ? (
        <CustomTypography color="warning">No players yet</CustomTypography>
      ) : (
        <>
          <PlayersByNumbers
            players={data?.stats || []}
            loading={loading}
            showAge={false}
          />
          <CustomTable
            columns={squad_detailed_stats}
            rows={rows || []}
            isSortable
            sortByString="apps"
            cellIndexStyles={season_stats_styles}
          />
        </>
      )}
    </SectionContainer>
  );
};

export default AllTimeSquadStats;
