import { useQuery } from '@apollo/client';

import { Spinner } from '../../../components/loaders';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { FETCH_TEAMS_BY_USER } from '../graphql';
import ProfileTeamTabs from '../components/ProfileTeamTabs';

export default function ProfileTeams() {
  const { data, loading, error } = useQuery(FETCH_TEAMS_BY_USER);

  const renderContent = () =>
    loading ? <Spinner /> : <ProfileTeamTabs teams={data?.teams || []} />;

  return error ? <ErrorGraphql error={error} /> : renderContent();
}
