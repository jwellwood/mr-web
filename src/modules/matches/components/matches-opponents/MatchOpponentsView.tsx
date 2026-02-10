import { useMemo } from 'react';
import { DataError, NoDataText, SectionContainer } from '../../../../components';
import CustomTable from '../../../../components/tables/CustomTable';
import { TApolloError } from '../../../../types/apollo';
import { T_FETCH_MATCH_OPPONENTS } from '../../types';
import { columns, rows, styles } from './config';
import MatchOpponentsFilters from './filters/MatchOpponentsFilters';

interface Props {
  data?: T_FETCH_MATCH_OPPONENTS;
  loading: boolean;
  error?: TApolloError;
  seasonReady: boolean;
}

export default function MatchOpponentsView({ data, loading, error, seasonReady }: Props) {
  const tableRows = useMemo(() => rows(loading, data?.stats), [loading, data?.stats]);

  const renderContent = () => {
    return seasonReady && data && data.stats.length === 0 ? (
      <NoDataText>No matches yet</NoDataText>
    ) : (
      <CustomTable
        rows={tableRows}
        columns={columns}
        isSortable
        sortByString="played"
        cellIndexStyles={styles}
      />
    );
  };

  return (
    <SectionContainer title={<MatchOpponentsFilters />}>
      {error ? <DataError error={error} /> : renderContent()}
    </SectionContainer>
  );
}
