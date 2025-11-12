import { useQuery } from '@apollo/client';

import { FETCH_TROPHY } from '../graphql';
import { AUTH_ROLES, LINK_TYPE } from '../../../app/constants';
import { Spinner } from '../../../components/loaders';
import EditLinksModal from '../../../components/modals/EditLinksModal';
import CustomAppBar from '../../../components/navigation/CustomAppBar';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import TrophyDetails from '../components/TrophyDetails';
import { PAGES } from '../constants';
import { useAuth } from '../../../hooks';
import RouteGuard from '../../../router/RouteGuard.tsx';
import { IListItem } from '../../../components/lists/types.ts';

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
      <CustomAppBar
        title={PAGES.TROPHY}
        actionButton={isTeamAuth ? <EditLinksModal data={links} /> : null}
      >
        {error ? <ErrorGraphql error={error} /> : renderContent()}
      </CustomAppBar>
    </RouteGuard>
  );
}
