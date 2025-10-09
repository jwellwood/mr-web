import { useQuery } from '@apollo/client';

import { Spinner } from '../../../components/loaders';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import OrgList from '../components/OrgList';
import { FETCH_ORGS_BY_USER } from '../graphql';

export default function ProfileOrganizations() {
  const { data, loading, error } = useQuery(FETCH_ORGS_BY_USER);

  const renderContent = () => (loading ? <Spinner /> : <OrgList orgs={data?.orgs} />);

  return error ? <ErrorGraphql error={error} /> : renderContent();
}
