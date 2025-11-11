import { useQuery } from '@apollo/client';

import { FETCH_SEASON } from '../graphql';
import { AUTH_ROLES } from '../../../app/constants';
import { Spinner } from '../../../components/loaders';
import EditLinksModal from '../../../components/modals/EditLinksModal';
import CustomAppBar from '../../../components/navigation/CustomAppBar';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { useAuth } from '../../../hooks';
import { useCustomParams } from '../../../hooks/useCustomParams';
import RouteGuard from '../../../router/RouteGuard';
import { PAGES, SEASON_ADMIN_LINKS } from '../constants';
import SeasonTabs from '../components/SeasonTabs';

export default function Season() {
  const { teamId, seasonId } = useCustomParams();
  const { isTeamAuth } = useAuth(teamId);

  const { data, loading, error } = useQuery(FETCH_SEASON, {
    variables: { seasonId },
  });

  const renderContent = () => (loading ? <Spinner /> : <SeasonTabs season={data?.season} />);

  return (
    <RouteGuard authorization={AUTH_ROLES.PUBLIC}>
      <CustomAppBar
        title={PAGES.SEASON}
        actionButton={isTeamAuth ? <EditLinksModal data={SEASON_ADMIN_LINKS} /> : null}
      >
        {error ? <ErrorGraphql error={error} /> : renderContent()}
      </CustomAppBar>
    </RouteGuard>
  );
}
