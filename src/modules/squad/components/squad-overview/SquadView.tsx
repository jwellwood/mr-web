import { DataError, NoDataText, SectionContainer } from '../../../../components';
import CustomTable from '../../../../components/tables/CustomTable';
import { TApolloError } from '../../../../types/apollo';
import { FETCH_SQUAD_LIST_BY_SEASON_QUERY } from '../../types';
import { columns, rows, styles } from './config';

interface Props {
  error?: TApolloError;
  data?: FETCH_SQUAD_LIST_BY_SEASON_QUERY;
  loading: boolean;
}

export default function SquadView({ error, data, loading }: Props) {
  const renderData = () => {
    return data && data.players.length === 0 ? (
      <NoDataText>No players yet</NoDataText>
    ) : (
      <CustomTable
        columns={columns}
        rows={rows(data?.players, loading) ?? []}
        isSortable
        sortByString="position"
        cellIndexStyles={styles}
      />
    );
  };

  return <SectionContainer>{error ? <DataError error={error} /> : renderData()}</SectionContainer>;
}
