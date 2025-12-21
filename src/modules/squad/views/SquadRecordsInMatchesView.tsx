import { ApolloError } from '@apollo/client';

import { DataError, NoDataText, SectionContainer } from '../../../components';
import MostInMatch from '../components/MostInMatch';
import { IMostGoalsInMatch } from '../../matches/types';

type Props = {
  data?: { stats: IMostGoalsInMatch[] };
  title: string;
  loading: boolean;
  error?: ApolloError;
};

export default function SquadRecordsInMatchesView({ data, loading, error, title }: Props) {
  const renderData =
    data?.stats.length === 0 ? (
      <NoDataText>No records in matches yet</NoDataText>
    ) : (
      <MostInMatch data={data?.stats} loading={loading} />
    );

  return (
    <SectionContainer title={`Most ${title} in Match`}>
      {error ? <DataError error={error} /> : renderData}
    </SectionContainer>
  );
}
