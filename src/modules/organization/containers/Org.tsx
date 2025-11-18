import React from 'react';
import { useQuery } from '@apollo/client';

import { FETCH_ORG } from '../graphql';
import { IMAGE_TYPE } from '../../../app/constants';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import ModuleHeader from '../../../components/shared/module-header/ModuleHeader.tsx';
import { Spinner } from '../../../components/loaders';

const Org: React.FC = () => {
  const { orgId } = useCustomParams();
  const { data, error, loading } = useQuery(FETCH_ORG, { variables: { orgId } });

  const renderContent = () => {
    return !loading ? (
      <>
        <ModuleHeader
          title={data?.org.name}
          badge={data?.org.badge.url}
          country={data?.org.country}
          city={data?.org.city}
          type={IMAGE_TYPE.TEAM}
        />
      </>
    ) : (
      <Spinner />
    );
  };

  return error ? <ErrorGraphql error={error} /> : renderContent();
};

export default Org;
