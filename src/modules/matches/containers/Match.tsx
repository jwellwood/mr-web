import { lazy } from 'react';
import { useQuery } from '@apollo/client';

import { FETCH_MATCH } from '../graphql';
import { AUTH_ROLES, TAB_TYPES } from '../../../app/constants';
import { Spinner } from '../../../components/loaders';
import EditLinksModal from '../../../components/modals/EditLinksModal';
import CustomAppBar from '../../../components/navigation/CustomAppBar';
import { CustomTabs, ITab } from '../../../components/tabs';
import { CustomTypography } from '../../../components/typography';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { MATCH_ADMIN_LINKS, PAGES } from '../constants';
import { useAuth } from '../../../hooks';
import RouteGuard from '../../../router/RouteGuard.tsx';
import { ITeam } from '../../team/types.ts';

const MatchDetails = lazy(() => import('../components/MatchDetails'));
const MatchPlayersTable = lazy(() => import('../components/MatchPlayersTable'));
const HeadToHead = lazy(() => import('./HeadToHead'));

export default function Match() {
  const { teamId, matchId } = useCustomParams();
  const { isTeamAuth } = useAuth(teamId);

  const { data, loading, error } = useQuery(FETCH_MATCH, {
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

  const renderContent = () => {
    return !loading && data?.match ? (
      <>
        <MatchDetails match={data?.match} />
        <CustomTabs type={TAB_TYPES.MATCH} tabs={tabs} level="secondary" />
      </>
    ) : (
      <Spinner />
    );
  };

  return (
    <RouteGuard authorization={AUTH_ROLES.PUBLIC}>
      <CustomAppBar
        title={PAGES.MATCH}
        actionButton={isTeamAuth ? <EditLinksModal data={MATCH_ADMIN_LINKS} /> : null}
      >
        {error ? <ErrorGraphql error={error} /> : renderContent()}
      </CustomAppBar>
    </RouteGuard>
  );
}
