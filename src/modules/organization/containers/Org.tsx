import React from 'react';
import { useQuery } from '@apollo/client';
import { AUTH_ROLES, IMAGE_TYPE, LINK_TYPE } from '../../../app/constants';
import ModuleHeader from '../../../components/common/ModuleHeader';
import { Spinner } from '../../../components/loaders';
import EditLinksModal from '../../../components/modals/EditLinksModal';
import CustomAppBar from '../../../components/navigation/CustomAppBar';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import CompetitionsList from '../components/CompetitionsList';
import { PAGES } from '../constants';
import { GET_ORG } from '../graphql';
import OrgTeams from './OrgTeams';
import RouteGuard from '../../../router/RouteGuard.tsx';
import { ORG } from '../../../router/paths.ts';
import { useAuth } from '../../../hooks';

const Org: React.FC = () => {
  const { orgId } = useCustomParams();
  const { isOrgAuth } = useAuth(orgId);
  const { data, error, loading } = useQuery(GET_ORG, { variables: { orgId } });

  const links = [
    { label: 'Add New Team', type: LINK_TYPE.ADD, link: ORG.ADD_TEAM },
    {
      label: 'Add Competition',
      type: LINK_TYPE.ADD,
      link: ORG.ADD_COMPETITION,
    },
    { label: 'Edit Organization', type: LINK_TYPE.EDIT, link: ORG.EDIT },
    { label: 'Edit Org Badge', type: LINK_TYPE.EDIT, link: ORG.EDIT_BADGE },
  ];

  if (error) return <ErrorGraphql error={error} />;
  return (
    <RouteGuard authorization={AUTH_ROLES.PUBLIC}>
      <CustomAppBar title={PAGES.ORG} actionButton={isOrgAuth ?? <EditLinksModal data={links} />}>
        {!loading ? (
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
        ) : (
          <Spinner />
        )}
      </CustomAppBar>
    </RouteGuard>
  );
};

export default Org;
