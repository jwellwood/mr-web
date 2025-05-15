import React from 'react';
import { useQuery } from '@apollo/client';
import { AUTH_ROLES, LINK_TYPE, TAB_TYPES } from '../../../app/constants';
import { Spinner } from '../../../components/loaders';
import EditLinksModal from '../../../components/modals/EditLinksModal';
import CustomAppBar from '../../../components/navigation/CustomAppBar';
import { CustomTabs, ITab } from '../../../components/tabs';
import { CustomTypography } from '../../../components/typography';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import MatchDetails from '../components/MatchDetails';
import MatchPlayersTable from '../components/MatchPlayersTable';
import { PAGES } from '../constants';
import { GET_MATCH_BY_ID } from '../graphql';
import HeadToHead from './HeadToHead';
import { useAuth } from '../../../hooks';
import { ITeam } from '../../../types';
import RouteGuard from '../../../router/RouteGuard.tsx';

const Match: React.FC = () => {
  const { teamId, matchId } = useCustomParams();
  const { isTeamAuth } = useAuth('match', teamId);

  const links = [
    {
      label: 'Edit Match',
      type: LINK_TYPE.EDIT,
      link: 'edit',
    },
    {
      label: 'Delete Match',
      type: LINK_TYPE.DELETE,
      link: `team/${teamId}/match/${matchId}/delete`,
    },
  ];

  const { data, loading, error } = useQuery(GET_MATCH_BY_ID, {
    variables: { matchId },
  });

  const opponentId = (data?.match?.opponentId as unknown as ITeam)?._id;
  const tabs: ITab[] = [
    {
      label: 'Players',
      component: data?.match?.isForfeit ? (
        <CustomTypography color="warning">This match was forfeited</CustomTypography>
      ) : (
        <MatchPlayersTable match={data?.match} />
      ),
    },
    {
      label: 'Head to Head',
      component: <HeadToHead opponentId={opponentId} />,
    },
  ];

  if (error) return <ErrorGraphql error={error} />;

  if (!data?.match) {
    return null;
  }

  return (
    <RouteGuard authorization={AUTH_ROLES.PUBLIC}>
      <CustomAppBar
        title={PAGES.MATCH}
        actionButton={isTeamAuth ?? <EditLinksModal data={links} />}
      >
        {!loading ? (
          <>
            <MatchDetails match={data?.match} />
            <CustomTabs type={TAB_TYPES.MATCHES} tabs={tabs} level="secondary" />
          </>
        ) : (
          <Spinner />
        )}
      </CustomAppBar>
    </RouteGuard>
  );
};

export default Match;
