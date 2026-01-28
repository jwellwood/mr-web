import { ApolloError } from '@apollo/client';

import { T_FETCH_SEASONS_POSITION } from '../../types';
import { DataError, NoDataText, SectionContainer } from '../../../../components';
import CustomTable from '../../../../components/tables/CustomTable';
import { columns, rows, styles } from './config';

interface Props {
  data?: T_FETCH_SEASONS_POSITION;
  loading: boolean;
  error?: ApolloError;
}

export default function SeasonsView({ data, loading, error }: Props) {
  const renderContent = () => {
    return data?.position && data?.position.length === 0 ? (
      <NoDataText>No seasons yet</NoDataText>
    ) : (
      <CustomTable
        columns={columns}
        rows={rows(data?.position, loading)}
        isSortable={false}
        cellIndexStyles={styles}
      />
    );
  };
  return (
    <SectionContainer>{error ? <DataError error={error} /> : renderContent()}</SectionContainer>
  );
}
