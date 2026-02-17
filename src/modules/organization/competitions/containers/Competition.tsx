import { useQuery } from '@apollo/client/react';
import { DataError, PageHeader } from '../../../../components';
import { Spinner } from '../../../../components/loaders';
import { useAuth } from '../../../../hooks';
import { useCustomParams } from '../../../../hooks/useCustomParams';
import { COMP_ADMIN_LINKS, PAGES } from '../../constants';
import CompetitionDetails from '../components/CompetitionDetails';
import { FETCH_COMPETITION } from '../graphql';

export default function Competition() {
  const { teamId, orgId, competitionId } = useCustomParams();
  const { isOrgAuth } = useAuth(teamId, orgId);
  const { data, loading, error } = useQuery(FETCH_COMPETITION, {
    variables: { compId: competitionId! },
  });

  const renderContent = () => {
    return !loading ? <CompetitionDetails competition={data?.competition} /> : <Spinner />;
  };

  return (
    <PageHeader title={PAGES.COMP} links={isOrgAuth ? COMP_ADMIN_LINKS : undefined}>
      {error ? <DataError error={error} /> : renderContent()}
    </PageHeader>
  );
}
