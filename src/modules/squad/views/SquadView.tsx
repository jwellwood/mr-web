import { ApolloError } from '@apollo/client';

import { DataError, NoDataText, SectionContainer } from '../../../components';
import { ISquadListStats } from '../types';
import SquadListTable from '../components/squad-list-table/SquadListTable';

type Props = {
  error?: ApolloError;
  data?: { players: ISquadListStats[] };
  loading: boolean;
};

export default function SquadView({ error, data, loading }: Props) {
  const renderData = () => {
    return !loading && data?.players.length === 0 ? (
      <NoDataText>No players yet</NoDataText>
    ) : (
      <SquadListTable data={data} loading={loading} />
    );
  };

  return <SectionContainer>{error ? <DataError error={error} /> : renderData()}</SectionContainer>;
}
