import React, { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { AUTH_ROLES } from '../../../app/constants';
import CustomTable from '../../../components/tables/CustomTable';
import { CustomTypography } from '../../../components/typography';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { useSeasons } from '../../../hooks/useSeasons';
import RouteGuard from '../../../router/RouteGuard';
import { squad_list, squad_list_styles } from '../configs';
import {
  GET_PLAYERS_BY_SEASON_ID,
  GET_SQUAD_LIST_SEASON_STATS,
} from '../graphql';
import { getSquadTableData } from '../helpers';

const Squad: React.FC = () => {
  const { teamId } = useCustomParams();
  const { seasonId } = useSeasons();

  const {
    loading: playersLoading,
    error,
    data,
  } = useQuery(GET_PLAYERS_BY_SEASON_ID, {
    variables: { teamId, seasonId },
    skip: !seasonId,
  });

  const { loading: statsLoading, data: stats } = useQuery(
    GET_SQUAD_LIST_SEASON_STATS,
    {
      variables: { teamId, seasonId },
      skip: !seasonId,
    }
  );

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

  if (error) {
    return <ErrorGraphql error={error} />;
  }

  return (
    <RouteGuard authorization={AUTH_ROLES.PUBLIC}>
      {data?.players && data?.players.length === 0 ? (
        <CustomTypography color="warning">No players yet</CustomTypography>
      ) : (
        <>
          <CustomTable
            columns={squad_list}
            rows={tableData}
            isSortable
            sortByString="position"
            cellIndexStyles={squad_list_styles}
          />
        </>
      )}
    </RouteGuard>
  );
};

export default Squad;
