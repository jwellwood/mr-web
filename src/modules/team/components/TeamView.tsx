import { DataError } from '../../../components';
import { ModuleHeader } from '../../../components/composed';
import { IMAGE_TYPE } from '../../../constants';
import { useAuth, useCustomParams } from '../../../hooks';
import { TApolloError } from '../../../types/apollo';
import Kits from '../components/Kits';
import Organization from '../components/Organization';
import Stadium from '../components/Stadium';
import RequestTeamAdmin from '../forms/request-admin-access/RequestTeamAdmin';
import { T_FETCH_TEAM_QUERY } from '../graphql';

interface Props {
  data?: T_FETCH_TEAM_QUERY;
  loading: boolean;
  error?: TApolloError;
}

export default function TeamView({ data, loading, error }: Props) {
  const { teamName, teamBadge, location, country } = data?.team || {};
  const { teamId } = useCustomParams();
  const { isAuth, isTeamAuth } = useAuth(teamId);

  const canRequestAdmin = isAuth && !isTeamAuth;

  return (
    <>
      {error ? (
        <DataError error={error} />
      ) : (
        <>
          {canRequestAdmin && <RequestTeamAdmin />}
          <ModuleHeader
            title={teamName}
            badge={teamBadge?.url}
            city={location}
            country={country}
            type={IMAGE_TYPE.BADGE}
            loading={loading}
          />
          <Organization team={data?.team} loading={loading} />
          <Kits team={data?.team} loading={loading} />
          <Stadium team={data?.team} loading={loading} />
        </>
      )}
    </>
  );
}
