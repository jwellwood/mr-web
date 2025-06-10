import React from 'react';
import { useQuery } from '@apollo/client';
import { AUTH_ROLES, LINK_TYPE } from '../../../app/constants';
import { Spinner } from '../../../components/loaders';
import EditLinksModal from '../../../components/modals/EditLinksModal';
import { PageHeader } from '../../../components/typography';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import CompetitionDetails from '../components/CompetitionDetails';
import { PAGES } from '../constants';
import { GET_COMPETITION_BY_ID } from '../graphql';
import { ORG } from '../../../router/paths.ts';
import { useAuth } from '../../../hooks';
import RouteGuard from '../../../router/RouteGuard.tsx';

const links = [
  { label: 'Add New Winner', type: LINK_TYPE.ADD, link: ORG.ADD_TEAM },
  {
    label: 'Edit Competition',
    type: LINK_TYPE.EDIT,
    link: ORG.EDIT_COMPETITION,
  },
  { label: 'Delete Competition', type: LINK_TYPE.DELETE, link: ORG.EDIT_BADGE },
];

const Competition: React.FC = () => {
  const { teamId, orgId, competitionId } = useCustomParams();
  const { isOrgAuth } = useAuth(teamId, orgId);
  const { data, loading, error } = useQuery(GET_COMPETITION_BY_ID, {
    variables: { compId: competitionId },
  });

  if (error) return <ErrorGraphql error={error} />;
  if (!data) return <Spinner />;
  return (
    <RouteGuard authorization={AUTH_ROLES.PUBLIC}>
      <PageHeader title={PAGES.COMP} />
      {!loading ? (
        <>
          <>
            {isOrgAuth ? <EditLinksModal data={links} /> : null}
            <CompetitionDetails competition={data?.competition} />
          </>
        </>
      ) : (
        <Spinner />
      )}
    </RouteGuard>
  );
};

export default Competition;
