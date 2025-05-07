import React from 'react';
import { useQuery } from '@apollo/client';
import { AUTH_ROLES, LINK_TYPE } from 'app/constants';
import { Spinner } from 'components/loaders';
import EditLinksModal from 'components/modals/EditLinksModal';
import { PageHeader } from 'components/typography';
import ErrorGraphql from 'errors/ErrorGraphql';
import { useAuth } from 'hooks';
import { useCustomParams } from 'hooks/useCustomParams';
import { ORG } from 'router/paths';
import RouteGuard from 'router/RouteGuard';
import CompetitionDetails from '../components/CompetitionDetails';
import { PAGES } from '../constants';
import { GET_COMPETITION_BY_ID } from '../graphql';

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
  const { orgId, competitionId } = useCustomParams();
  const { isOrgAuth } = useAuth(orgId);
  const { data, loading, error } = useQuery(GET_COMPETITION_BY_ID, {
    variables: { compId: competitionId },
  });

  if (error) return <ErrorGraphql error={[error]} />;
  return (
    <RouteGuard authorization={AUTH_ROLES.PUBLIC}>
      <PageHeader title={PAGES.COMP} />
      {!loading ? (
        <>
          <>
            {isOrgAuth && <EditLinksModal data={links} />}
            <CompetitionDetails competition={data.competition} />
          </>
        </>
      ) : (
        <Spinner />
      )}
    </RouteGuard>
  );
};

export default Competition;
