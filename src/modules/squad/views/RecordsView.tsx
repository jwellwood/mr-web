import { ApolloError } from '@apollo/client';

import { ISquadRecords } from '../types';
import { DataError, SectionContainer, NoDataText } from '../../../components';
import SquadRecordTable from '../components/squad-record-table/SquadRecordTable';

type Props = {
  data?: { stats: ISquadRecords };
  loading: boolean;
  error?: ApolloError;
};

export default function RecordsView({ data, loading, error }: Props) {
  const renderContent = () => (
    <>
      {data && data.stats?.apps[0]?.value === 0 ? (
        <NoDataText>No records yet</NoDataText>
      ) : (
        <>
          <SectionContainer title="Overall Records">
            <SquadRecordTable data={data} loading={loading} />
          </SectionContainer>
        </>
      )}
    </>
  );

  return error ? <DataError error={error} /> : renderContent();
}
