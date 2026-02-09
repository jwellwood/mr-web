import { useQuery } from '@apollo/client';
import { PageHeader } from '../../../components';
import { useAuth } from '../../../hooks';
import { useCustomParams } from '../../../hooks/useCustomParams';
import SeasonView from '../components/seasons/SeasonView';
import { PAGES, SEASON_ADMIN_LINKS } from '../constants';
import { FETCH_SEASON } from '../graphql';

export default function Season() {
  const { teamId, seasonId } = useCustomParams();
  const { isTeamAuth } = useAuth(teamId);

  const { data, loading, error } = useQuery(FETCH_SEASON, {
    variables: { seasonId: seasonId! },
  });

  return (
    <PageHeader title={PAGES.SEASON} links={isTeamAuth ? SEASON_ADMIN_LINKS : undefined}>
      <SeasonView data={data} loading={loading} error={error} />
    </PageHeader>
  );
}
