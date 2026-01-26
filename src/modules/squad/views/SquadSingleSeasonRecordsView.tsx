import { ApolloError } from '@apollo/client';

import { DataError, SectionContainer, NoDataText } from '../../../components';
import SquadSingleSeasonRecordsTable from '../components/squad-single-season-records-table/SquadSingleSeasonRecordsTable';
import { type FETCH_SQUAD_SINGLE_SEASON_RECORDS_QUERY } from '../types';

interface Props {
  loading: boolean;
  error?: ApolloError;
  data?: FETCH_SQUAD_SINGLE_SEASON_RECORDS_QUERY;
}

export default function SquadSingleSeasonRecordsView({ data, loading, error }: Props) {
  const renderContent = () => (
    <SectionContainer title="Single Season Records">
      {data && !data.stats?.combined?.value ? (
        <NoDataText>No records yet</NoDataText>
      ) : (
        <SquadSingleSeasonRecordsTable data={data} loading={loading} />
      )}
    </SectionContainer>
  );

  return error ? <DataError error={error} /> : renderContent();
}
