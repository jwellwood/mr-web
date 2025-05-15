import React from 'react';
import { useQuery } from '@apollo/client';
import { AUTH_ROLES, LINK_TYPE } from '../../../app/constants';
import { Spinner } from '../../../components/loaders';
import EditLinksModal from '../../../components/modals/EditLinksModal';
import CustomAppBar from '../../../components/navigation/CustomAppBar';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { useAuth } from '../../../hooks';
import { useCustomParams } from '../../../hooks/useCustomParams';
import RouteGuard from '../../../router/RouteGuard';
import { IListItem } from '../../../types';
import { PAGES } from '../constants';
import { GET_TEAM_SEASON_BY_ID } from '../graphql/getTeamSeasonById.graphql';
import SeasonTabs from './SeasonTabs';

const Season: React.FC = () => {
  const { teamId, seasonId } = useCustomParams();
  const { isTeamAuth } = useAuth('season', teamId);

  const links: IListItem[] = [
    {
      label: 'Add Award',
      type: LINK_TYPE.ADD,
      link: 'add_award',
    },
    {
      label: 'Edit Season',
      type: LINK_TYPE.EDIT,
      link: 'edit',
    },
  ];

  const { data, loading, error } = useQuery(GET_TEAM_SEASON_BY_ID, {
    variables: { seasonId },
  });

  if (error) {
    return <ErrorGraphql error={error} />;
  }

  return (
    <RouteGuard authorization={AUTH_ROLES.PUBLIC}>
      <CustomAppBar
        title={PAGES.SEASON}
        actionButton={isTeamAuth && <EditLinksModal data={links} />}
      >
        {!loading ? <SeasonTabs season={data?.season} /> : <Spinner />}
      </CustomAppBar>
    </RouteGuard>
  );
};

export default Season;
