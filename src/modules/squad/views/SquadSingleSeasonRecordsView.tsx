import { ApolloError } from '@apollo/client';

import { ISquadSingleSeasonRecords } from '../types';
import { DataError, SectionContainer, NoDataText } from '../../../components';
import SquadSingleSeasonRecordsTable from '../components/squad-single-season-records-table/SquadSingleSeasonRecordsTable';

type Props = {
  loading: boolean;
  error?: ApolloError;
  data?: { stats: ISquadSingleSeasonRecords };
};

export default function SquadSingleSeasonRecordsView({ data, loading, error }: Props) {
  const renderContent = () => (
    <>
      {data && data.stats?.combined.value === 0 ? (
        <NoDataText>No records yet</NoDataText>
      ) : (
        <>
          <SectionContainer title="Single Season Records">
            <SquadSingleSeasonRecordsTable data={data} loading={loading} />
          </SectionContainer>
        </>
      )}
    </>
  );

  return error ? <DataError error={error} /> : renderContent();
}
