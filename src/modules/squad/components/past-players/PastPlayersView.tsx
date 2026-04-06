import { useTranslation } from 'react-i18next';
import { DataError, NoDataText, SectionContainer } from '../../../../components';
import CustomTable from '../../../../components/tables/custom-table/CustomTable';
import { TApolloError } from '../../../../types/apollo';
import { T_FETCH_PAST_PLAYERS_QUERY } from '../../graphql';
import { columns, rows } from '../tables/past-players';

interface Props {
  data?: T_FETCH_PAST_PLAYERS_QUERY;
  error?: TApolloError;
  loading: boolean;
}

export default function PastPlayersView({ error, data, loading }: Props) {
  const { t } = useTranslation('squad');
  const renderData =
    data?.players.length === 0 ? (
      <NoDataText>{t('NO_DATA.PAST_PLAYERS')}</NoDataText>
    ) : (
      <CustomTable
        columns={columns(t)}
        rows={rows(data)}
        isSortable
        sortByString="seasons"
        loading={loading}
        loadingRowCount={20}
      />
    );

  return <SectionContainer>{error ? <DataError error={error} /> : renderData}</SectionContainer>;
}
