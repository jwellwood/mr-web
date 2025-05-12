import React, { useEffect, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { SectionContainer } from '../../../components/containers';
import CustomTable from '../../../components/tables/CustomTable';
import { CustomTypography } from '../../../components/typography';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { useSeasons } from '../../../hooks/useSeasons';
import PlayersByNumbers from '../components/PlayersByNumbers';
import { season_stats_styles, squad_detailed_stats } from '../configs';
import { GET_SQUAD_SEASON_STATS } from '../graphql';
import { getSquadSeasonTableData } from '../helpers/getSquadSeasonTableData';
import { IPlayer } from '../../../types';

const SquadStats: React.FC = () => {
  const { teamId } = useCustomParams();
  const { seasonId, seasonEndDate } = useSeasons();
  const { loading, error, data, refetch } = useQuery(GET_SQUAD_SEASON_STATS, {
    variables: { teamId, seasonId },
    skip: !seasonId,
  });

  useEffect(() => {
    if (!data?.stats && seasonId) {
      refetch();
    }
  }, [data?.stats, refetch, seasonId]);

  const rows = useMemo(() => {
    if (seasonId && data) {
      return getSquadSeasonTableData(data, loading);
    }
  }, [data, loading, seasonId]);

  if (error) {
    return <ErrorGraphql error={error} />;
  }
  return (
    <SectionContainer>
      {data?.stats && data?.stats.length === 0 ? (
        <CustomTypography color="warning">No players yet</CustomTypography>
      ) : (
        <>
          <PlayersByNumbers
            players={(data?.stats || []) as IPlayer[]}
            loading={loading}
            season={seasonEndDate || undefined}
            showAge
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

export default SquadStats;
