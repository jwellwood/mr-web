import { useQuery } from '@apollo/client/react';
import { PageHeader } from '../../../components';
import { useAuth } from '../../../hooks';
import { useCustomParams } from '../../../hooks/useCustomParams';
import MatchView from '../components/match/MatchView';
import { MATCH_ADMIN_LINKS, PAGES } from '../constants';
import { FETCH_MATCH } from '../graphql';

export default function Match() {
  const { teamId, matchId } = useCustomParams();
  const { isTeamAuth } = useAuth(teamId);

  const { data, loading, error } = useQuery(FETCH_MATCH, {
    variables: { matchId: matchId! },
  });

  return (
    <PageHeader title={PAGES.MATCH} links={isTeamAuth ? MATCH_ADMIN_LINKS : undefined}>
      <MatchView data={data} loading={loading} error={error} />
    </PageHeader>
  );
}
