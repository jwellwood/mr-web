import { useEffect, useMemo } from 'react';
import { useQuery } from '@apollo/client';

import { FETCH_SQUAD_STATS_SEASON } from '../graphql';
import { SectionContainer } from '../../../components';
import CustomTable from '../../../components/tables/CustomTable';
import { CustomTypography } from '../../../components/typography';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { useSeasons } from '../../../hooks/useSeasons';
import PlayersByNumbers from '../components/PlayersByNumbers';
import { squad_stats_season, season_styles } from '../configs';
import { getSquadSeasonTableData } from '../helpers';
import { IPlayer } from '../../players/types';

export default function SquadStatsSeason() {
  const { teamId } = useCustomParams();
  const { seasonId, seasonEndDate } = useSeasons();
  const { loading, error, data, refetch } = useQuery(FETCH_SQUAD_STATS_SEASON, {
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

  const renderContent = () => {
    return data?.stats && data?.stats.length === 0 ? (
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
          columns={squad_stats_season}
          rows={rows || []}
          isSortable
          sortByString="apps"
          cellIndexStyles={season_styles}
        />
      </>
    );
  };

  return (
    <SectionContainer title="Season Stats">
      {error ? <ErrorGraphql error={error} /> : renderContent()}
    </SectionContainer>
  );
}
