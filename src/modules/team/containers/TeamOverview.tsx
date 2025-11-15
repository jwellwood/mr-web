import { useQuery } from '@apollo/client';

import { FETCH_TEAM } from '../graphql';
import { AUTH_ROLES, IMAGE_TYPE } from '../../../app/constants';
import ModuleHeader from '../../../components/shared/module-header/ModuleHeader';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import RouteGuard from '../../../router/RouteGuard';
import Organization from '../components/Organization';
import Kits from '../components/Kits';
import Stadium from '../components/Stadium';

export default function TeamOverview() {
  const { teamId } = useCustomParams();
  const { data, error, loading } = useQuery(FETCH_TEAM, {
    variables: { teamId },
  });

  const { teamName, teamBadge, location, country } = data?.team || {};

  const renderContent = () => {
    return (
      <>
        <ModuleHeader
          title={teamName}
          badge={teamBadge?.url}
          city={location}
          country={country}
          type={IMAGE_TYPE.TEAM}
          loading={loading}
        />
        <Organization team={data?.team} loading={loading} />
        <Kits team={data?.team} loading={loading} />
        <Stadium team={data?.team} loading={loading} />
      </>
    );
  };

  return (
    <RouteGuard authorization={AUTH_ROLES.PUBLIC}>
      {error ? <ErrorGraphql error={error} /> : renderContent()}
    </RouteGuard>
  );
}
