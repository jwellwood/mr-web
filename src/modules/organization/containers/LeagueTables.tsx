import { useQuery } from '@apollo/client';

import { FETCH_LEAGUE_TABLES } from '../graphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { Spinner } from '../../../components/loaders';
import LeagueTable from '../components/LeagueTable';
import { DataError, NoDataText } from '../../../components';

export default function LeagueTables() {
  const { orgId, orgSeasonId } = useCustomParams();

  const { data, error, loading } = useQuery(FETCH_LEAGUE_TABLES, {
    variables: { orgId, orgSeasonId: orgSeasonId || 'default' },
  });

  const renderData = data?.data.length ? (
    data?.data.map(comp => {
      return (
        <LeagueTable key={comp.competition._id} name={comp.competition.name} data={comp.data} />
      );
    })
  ) : (
    <NoDataText>No league tables yet</NoDataText>
  );

  const renderContent = () => {
    return !loading && data?.data ? renderData : <Spinner />;
  };

  return error ? <DataError error={error} /> : renderContent();
}
