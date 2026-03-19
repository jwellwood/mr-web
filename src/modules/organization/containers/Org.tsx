import { useQuery } from '@apollo/client/react';
import { DataError, ModuleHeader } from '../../../components';
import { IMAGE_TYPE } from '../../../constants';
import { useAuth, useCustomParams } from '../../../hooks';
import RequestOrgAdmin from '../forms/request-admin-access/RequestOrgAdmin';
import { FETCH_ORG } from '../graphql';

export default function Org() {
  const { orgId } = useCustomParams();
  const { isAuth, isOrgAuth } = useAuth('', orgId);
  const { data, error, loading } = useQuery(FETCH_ORG, { variables: { orgId: orgId! } });

  const canRequestAdmin = isAuth && !isOrgAuth;

  const renderContent = () => {
    return (
      <>
        {canRequestAdmin && <RequestOrgAdmin />}
        <ModuleHeader
          loading={loading}
          title={data?.org.name}
          badge={data?.org.badge.url}
          country={data?.org.country}
          city={data?.org.city}
          type={IMAGE_TYPE.BADGE}
        />
      </>
    );
  };

  return error ? <DataError error={error} /> : renderContent();
}
