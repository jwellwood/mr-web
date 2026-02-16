import { DataError, NoDataText, SectionContainer } from '../../../../components';
import { CustomTable } from '../../../../components/tables';
import { TApolloError } from '../../../../types/apollo';
import { T_FETCH_SEASONS_POSITION } from '../../types';
import { columns, rows } from './config';

interface Props {
  data?: T_FETCH_SEASONS_POSITION;
  loading: boolean;
  error?: TApolloError;
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
        loading={loading}
        loadingRowCount={10}
      />
    );
  };
  return (
    <SectionContainer>{error ? <DataError error={error} /> : renderContent()}</SectionContainer>
  );
}
