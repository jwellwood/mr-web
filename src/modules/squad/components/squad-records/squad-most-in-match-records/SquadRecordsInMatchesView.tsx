import { ApolloError } from '@apollo/client';
import { DataError, NoDataText, SectionContainer } from '../../../../../components';
import {
  FETCH_SQUAD_RECORD_ASSISTS_IN_MATCH_QUERY,
  FETCH_SQUAD_RECORD_GOALS_IN_MATCH_QUERY,
} from '../../../types';
import MostInMatch from './MostInMatch';

interface Props {
  data?: FETCH_SQUAD_RECORD_GOALS_IN_MATCH_QUERY | FETCH_SQUAD_RECORD_ASSISTS_IN_MATCH_QUERY;
  title: string;
  loading: boolean;
  error?: ApolloError;
}

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
