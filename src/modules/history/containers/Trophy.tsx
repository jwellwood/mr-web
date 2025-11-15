import { useQuery } from '@apollo/client';

import { FETCH_TROPHY } from '../graphql';
import { AUTH_ROLES, LINK_TYPE } from '../../../app/constants';
import { Spinner } from '../../../components/loaders';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import TrophyDetails from '../components/TrophyDetails';
import { PAGES } from '../constants';
import { useAuth } from '../../../hooks';
import RouteGuard from '../../../router/RouteGuard.tsx';
import { IListItem } from '../../../components/lists/types.ts';
import { PageHeader } from '../../../components';

export default function Trophy() {
  const { teamId, trophyId } = useCustomParams();
  const { isTeamAuth } = useAuth(teamId);

  const links: IListItem[] = [
    {
      label: 'Edit Trophy',
      type: LINK_TYPE.EDIT,
      link: 'edit',
    },
  ];

  const { data, loading, error } = useQuery(FETCH_TROPHY, {
    variables: { trophyId },
  });

  const renderContent = () => {
    return !loading ? <TrophyDetails trophy={data?.trophy} /> : <Spinner />;
  };

  return (
    <RouteGuard authorization={AUTH_ROLES.PUBLIC}>
      <PageHeader title={PAGES.TROPHY} links={isTeamAuth ? links : undefined}>
        {error ? <ErrorGraphql error={error} /> : renderContent()}
      </PageHeader>
    </RouteGuard>
  );
}
