import { useQuery } from '@apollo/client';

import { FETCH_ORG } from '../graphql';
import { IMAGE_TYPE } from '../../../constants';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { ModuleHeader } from '../../../components';

export default function Org() {
  const { orgId } = useCustomParams();
  const { data, error, loading } = useQuery(FETCH_ORG, { variables: { orgId } });

  const renderContent = () => {
    return (
      <ModuleHeader
        loading={loading}
        title={data?.org.name}
        badge={data?.org.badge.url}
        country={data?.org.country}
        city={data?.org.city}
        type={IMAGE_TYPE.TEAM}
      />
    );
  };

  return error ? <ErrorGraphql error={error} /> : renderContent();
}
