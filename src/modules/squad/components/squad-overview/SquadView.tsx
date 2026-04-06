import { useTranslation } from 'react-i18next';
import { DataError, NoDataText, SectionContainer } from '../../../../components';
import CustomTable from '../../../../components/tables/custom-table/CustomTable';
import { TApolloError } from '../../../../types/apollo';
import { T_FETCH_SQUAD_LIST_BY_SEASON_QUERY } from '../../graphql';
import { columns, rows } from '../tables/squad-overview';

interface Props {
  error?: TApolloError;
  data?: T_FETCH_SQUAD_LIST_BY_SEASON_QUERY;
  loading: boolean;
}

export default function SquadView({ error, data, loading }: Props) {
  const { t } = useTranslation('squad');
  const renderData = () => {
    return data && data.players.length === 0 ? (
      <NoDataText>{t('NO_DATA.SQUAD_PLAYERS')}</NoDataText>
    ) : (
      <CustomTable
        columns={columns}
        rows={rows(data?.players, loading) ?? []}
        isSortable
        sortByString="position"
        loading={loading}
        loadingRowCount={20}
      />
    );
  };

  return <SectionContainer>{error ? <DataError error={error} /> : renderData()}</SectionContainer>;
}
