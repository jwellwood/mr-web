import { useQuery } from '@apollo/client';
import { PageHeader } from '../../../components';
import { useAuth } from '../../../hooks';
import { useCustomParams } from '../../../hooks/useCustomParams';
import AwardView from '../components/awards/AwardView';
import { AWARD_ADMIN_LINKS, PAGES } from '../constants';
import { FETCH_AWARD } from '../graphql';

export default function Award() {
  const { teamId, awardId } = useCustomParams();
  const { isTeamAuth } = useAuth(teamId);

  const { data, loading, error } = useQuery(FETCH_AWARD, {
    variables: { awardId: awardId! },
  });

  return (
    <PageHeader title={PAGES.AWARD} links={isTeamAuth ? AWARD_ADMIN_LINKS : undefined}>
      <AwardView data={data} loading={loading} error={error} />
    </PageHeader>
  );
}
