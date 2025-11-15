import React from 'react';
import { useQuery } from '@apollo/client';

import { FETCH_ORG } from '../graphql';

import { AUTH_ROLES, IMAGE_TYPE } from '../../../app/constants';
import { ORG_ADMIN_LINKS, PAGES } from '../constants';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import RouteGuard from '../../../router/RouteGuard.tsx';
import { useAuth } from '../../../hooks';
import ModuleHeader from '../../../components/shared/module-header/ModuleHeader.tsx';
import { Spinner } from '../../../components/loaders';
import CompetitionsList from '../components/CompetitionsList';
import OrgTeams from './OrgTeams';
import { PageHeader } from '../../../components';

const Org: React.FC = () => {
  const { teamId, orgId } = useCustomParams();
  const { isOrgAuth } = useAuth(teamId, orgId);
  const { data, error, loading } = useQuery(FETCH_ORG, { variables: { orgId } });

  const renderContent = () => {
    return error ? (
      <ErrorGraphql error={error} />
    ) : (
      <>
        <ModuleHeader
          title={data?.org.name}
          badge={data?.org.badge.url}
          country={data?.org.country}
          city={data?.org.city}
          type={IMAGE_TYPE.TEAM}
        />
        <CompetitionsList competitions={data?.org.competitions} />
        <OrgTeams />
      </>
    );
  };

  return (
    <RouteGuard authorization={AUTH_ROLES.PUBLIC}>
      <PageHeader title={PAGES.ORG} links={isOrgAuth ? ORG_ADMIN_LINKS : undefined}>
        {!loading ? renderContent() : <Spinner />}
      </PageHeader>
    </RouteGuard>
  );
};

export default Org;
