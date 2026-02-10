import { DataError, NoDataText, SectionContainer } from '../../../../../components';
import CustomTable from '../../../../../components/tables/CustomTable';
import { TApolloError } from '../../../../../types/apollo';
import { T_FETCH_PLAYER_MATCH_RECORDS } from '../../../types';
import { columns, rows } from './config';

interface Props {
  data?: T_FETCH_PLAYER_MATCH_RECORDS;
  loading: boolean;
  error?: TApolloError;
}

export default function PlayerMatchesWithRecordsView({ data, loading, error }: Props) {
  const renderContent = () => {
    if (data && !data?.stats) {
      return <NoDataText>No matches with goals yet</NoDataText>;
    }
    return <CustomTable columns={columns} rows={rows(data?.stats, loading)} isSortable={false} />;
  };

  return (
    <SectionContainer title="Records">
      {error ? <DataError error={error} /> : renderContent()}
    </SectionContainer>
  );
}
