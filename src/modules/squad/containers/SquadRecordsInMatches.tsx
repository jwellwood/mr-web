import { useQuery } from '@apollo/client';

import { FETCH_SQUAD_RECORD_GOALS_IN_MATCH, FETCH_SQUAD_RECORD_ASSISTS_IN_MATCH } from '../graphql';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import MostInMatch from '../components/MostInMatch';

export default function SquadRecordsInMatches() {
  const { teamId } = useCustomParams();
  const { data, loading, error } = useQuery(FETCH_SQUAD_RECORD_GOALS_IN_MATCH, {
    variables: { teamId },
  });
  const {
    data: assistsData,
    loading: assistLoading,
    error: assistError,
  } = useQuery(FETCH_SQUAD_RECORD_ASSISTS_IN_MATCH, {
    variables: { teamId },
  });

  const { stats } = data || {};
  const { assistStats } = assistsData || {};

  const renderContent = () => {
    return (
      <>
        <MostInMatch title="Most Goals in Match" data={stats || []} loading={loading} />
        <MostInMatch
          title="Most Assists in Match"
          data={assistStats || []}
          loading={assistLoading}
        />
      </>
    );
  };

  return error || assistError ? (
    <ErrorGraphql error={(error || assistError) as Error} />
  ) : (
    renderContent()
  );
}
