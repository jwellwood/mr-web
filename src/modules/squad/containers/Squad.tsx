import { useMemo } from 'react';
import { useQuery } from '@apollo/client';

import { FETCH_SQUAD_STATS_BASIC, FETCH_SQUAD_BY_SEASON } from '../graphql';
import { AUTH_ROLES } from '../../../app/constants';
import CustomTable from '../../../components/tables/CustomTable';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { useCustomParams } from '../../../hooks';
import { useSeasons } from '../../../hooks/useSeasons';
import RouteGuard from '../../../router/RouteGuard';
import { squad_list, squad_list_styles } from '../configs';
import { getSquadTableData } from '../helpers';
import { SectionContainer, NoDataText } from '../../../components';

export default function Squad() {
  const { teamId } = useCustomParams();
  const { seasonId } = useSeasons();

  const {
    loading: playersLoading,
    error,
    data,
  } = useQuery(FETCH_SQUAD_BY_SEASON, {
    variables: { teamId, seasonId },
    skip: !seasonId,
  });

  const {
    loading: statsLoading,
    data: stats,
    error: statsError,
  } = useQuery(FETCH_SQUAD_STATS_BASIC, {
    variables: { teamId, seasonId },
    skip: !seasonId,
  });

  const tableData = useMemo(
    () =>
      getSquadTableData({
        players: data?.players || [],
        stats: stats?.players || [],
        playersLoading,
        statsLoading,
      }),
    [data?.players, playersLoading, stats?.players, statsLoading]
  );

  const renderContent = () => {
    return data?.players && data?.players.length === 0 ? (
      <NoDataText>No players yet</NoDataText>
    ) : (
      <SectionContainer>
        <CustomTable
          columns={squad_list}
          rows={tableData}
          isSortable
          sortByString="position"
          cellIndexStyles={squad_list_styles}
        />
      </SectionContainer>
    );
  };

  return (
    <RouteGuard authorization={AUTH_ROLES.PUBLIC}>
      {error || statsError ? (
        <ErrorGraphql error={error || (statsError as Error)} />
      ) : (
        renderContent()
      )}
    </RouteGuard>
  );
}
