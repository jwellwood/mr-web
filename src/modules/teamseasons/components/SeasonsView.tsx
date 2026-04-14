import { useTranslation } from 'react-i18next';
import { DataError, NoDataText, SectionContainer } from '../../../components';
import { CustomTable } from '../../../components/tables';
import { TApolloError } from '../../../types/apollo';
import { T_FETCH_SEASONS_POSITION } from '../graphql';
import { columns, rows } from './config';

interface Props {
  data?: T_FETCH_SEASONS_POSITION;
  loading: boolean;
  error?: TApolloError;
}

export default function SeasonsView({ data, loading, error }: Props) {
  const { t } = useTranslation('teamseasons');

  const renderContent = () => {
    return data?.position && data?.position.length === 0 ? (
      <NoDataText>{t('NO_DATA.SEASONS')}</NoDataText>
    ) : (
      <CustomTable
        columns={columns(t)}
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
