import { ApolloError } from '@apollo/client';

import { DataError, SectionContainer, NoDataText } from '../../../components';
import PlayersByNumbers from '../components/PlayersByNumbers';
import { ISquadSeasonStats } from '../types';
import SeasonStatsTable from '../components/season-stats-table/SquadStatsTable';
import StatFilters from '../forms/StatsFilters';
import { TFilters } from '../context/FiltersContext';

interface Props {
  error?: ApolloError;
  loading: boolean;
  data?: { stats: ISquadSeasonStats[] };
  filters: TFilters;
}

export default function StatsView({ error, loading, data, filters }: Props) {
  const renderContent = () => {
    return data && data?.stats.length === 0 ? (
      <NoDataText>No players yet</NoDataText>
    ) : (
      <>
        <PlayersByNumbers players={data?.stats} loading={loading} />
        <SeasonStatsTable data={data} loading={loading} filters={filters} />
      </>
    );
  };
  return (
    <SectionContainer title={<StatFilters />}>
      {error ? <DataError error={error} /> : renderContent()}
    </SectionContainer>
  );
}
