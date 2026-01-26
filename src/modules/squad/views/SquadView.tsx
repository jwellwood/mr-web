import { ApolloError } from '@apollo/client';

import { DataError, NoDataText, SectionContainer } from '../../../components';
import SquadListTable from '../components/squad-list-table/SquadListTable';
import { FETCH_SQUAD_LIST_BY_SEASON_QUERY } from '../types';

interface Props {
  error?: ApolloError;
  data?: FETCH_SQUAD_LIST_BY_SEASON_QUERY;
  loading: boolean;
  seasonReady: boolean;
}

export default function SquadView({ error, data, loading, seasonReady }: Props) {
  const renderData = () => {
    return (seasonReady && !data && !loading) || (!loading && data?.players.length === 0) ? (
      <NoDataText>No players yet</NoDataText>
    ) : (
      <SquadListTable data={data} loading={loading} />
    );
  };

  return <SectionContainer>{error ? <DataError error={error} /> : renderData()}</SectionContainer>;
}
