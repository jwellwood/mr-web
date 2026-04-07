import { useQuery } from '@apollo/client/react';
import { useCustomParams } from '../../../hooks/useCustomParams';
import OrgAdminUsersView from '../components/OrgAdminUsersView';
import { FETCH_ORG_ADMIN_VIEW } from '../graphql';

export default function OrgAdminUsers() {
  const { orgId } = useCustomParams();
  const { data, loading, error } = useQuery(FETCH_ORG_ADMIN_VIEW, {
    variables: { orgId: orgId! },
  });

  return <OrgAdminUsersView org={data?.org} loading={loading} error={error} />;
}
