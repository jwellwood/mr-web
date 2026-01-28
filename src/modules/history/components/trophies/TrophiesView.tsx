import { ApolloError } from '@apollo/client';

import { T_FETCH_TROPHIES } from '../../types';
import TrophiesOrderBy from './TrophiesOrderBy';

import TrophiesTotals from './TrophiesTotals';
import { DataError, NoDataText } from '../../../../components';

interface Props {
  data?: T_FETCH_TROPHIES;
  loading: boolean;
  error?: ApolloError;
}

export default function TrophiesView({ data, loading, error }: Props) {
  const totalsData = {
    total: data?.trophies.length || 0,
    winner: data?.trophies.filter(trophy => trophy.isWinner).length || 0,
    final: data?.trophies.filter(trophy => trophy.isFinal).length || 0,
  };

  const totals = <TrophiesTotals data={totalsData} loading={loading} />;
  const list = <TrophiesOrderBy trophies={data?.trophies} loading={loading} />;

  const renderContent = () => {
    return data?.trophies && data.trophies.length === 0 ? (
      <NoDataText>No trophies yet</NoDataText>
    ) : (
      <>
        {totals}
        {list}
      </>
    );
  };

  return error ? <DataError error={error} /> : renderContent();
}
