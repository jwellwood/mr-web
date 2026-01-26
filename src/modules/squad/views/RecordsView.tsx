import { ApolloError } from '@apollo/client';

import { DataError, SectionContainer, NoDataText } from '../../../components';
import SquadRecordTable from '../components/squad-record-table/SquadRecordTable';
import { FETCH_SQUAD_RECORDS_QUERY } from '../types';

interface Props {
  data?: FETCH_SQUAD_RECORDS_QUERY;
  loading: boolean;
  error?: ApolloError;
}

export default function RecordsView({ data, loading, error }: Props) {
  const renderContent = () => (
    <SectionContainer title="Overall Records">
      {data && !data.stats.apps ? (
        <NoDataText>No records yet</NoDataText>
      ) : (
        <SquadRecordTable data={data} loading={loading} />
      )}
    </SectionContainer>
  );

  return error ? <DataError error={error} /> : renderContent();
}
