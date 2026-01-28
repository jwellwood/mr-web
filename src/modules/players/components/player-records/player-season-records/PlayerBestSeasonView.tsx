import { ApolloError } from '@apollo/client';

import { DataError, NoDataText, SectionContainer } from '../../../../../components';
import { T_FETCH_PLAYER_SEASONS_SUMMARY } from '../../../types';
import { columns, rows } from './config/top-seasons';
import CustomTable from '../../../../../components/tables/CustomTable';

interface Props {
  data?: T_FETCH_PLAYER_SEASONS_SUMMARY;
  loading: boolean;
  error?: ApolloError;
}

export default function PlayerBestSeasonView({ data, loading, error }: Props) {
  const renderContent = () => {
    if (data && data.seasons.length === 0) {
      return <NoDataText>No season records</NoDataText>;
    }
    return <CustomTable columns={columns} rows={rows(data?.seasons, loading)} isSortable={false} />;
  };

  return (
    <SectionContainer title="Single Season Records">
      {error ? <DataError error={error} /> : renderContent()}
    </SectionContainer>
  );
}
