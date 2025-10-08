import React from 'react';
import { useQuery } from '@apollo/client';

import { FETCH_ORG } from '../graphql';

import { AUTH_ROLES, IMAGE_TYPE } from '../../../app/constants';
import { ORG_ADMIN_LINKS, PAGES } from '../constants';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import RouteGuard from '../../../router/RouteGuard.tsx';
import { useAuth } from '../../../hooks';
import EditLinksModal from '../../../components/modals/EditLinksModal';
import CustomAppBar from '../../../components/navigation/CustomAppBar';
import ModuleHeader from '../../../components/common/ModuleHeader';
import { Spinner } from '../../../components/loaders';
import CompetitionsList from '../components/CompetitionsList';
import OrgTeams from './OrgTeams';

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
          type={IMAGE_TYPE.ORG}
        />
        <CompetitionsList competitions={data?.org.competitions} />
        <OrgTeams />
      </>
    );
  };

  return (
    <RouteGuard authorization={AUTH_ROLES.PUBLIC}>
      <CustomAppBar
        title={PAGES.ORG}
        actionButton={isOrgAuth ? <EditLinksModal data={ORG_ADMIN_LINKS} /> : null}
      >
        {!loading ? renderContent() : <Spinner />}
      </CustomAppBar>
    </RouteGuard>
  );
};

export default Org;
