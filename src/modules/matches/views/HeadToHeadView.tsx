import { ApolloError } from '@apollo/client';

import {
  DataError,
  MatchList,
  MatchStatsTable,
  NoDataText,
  SectionContainer,
} from '../../../components';
import { IMatchList, IMatchStats } from '../types';

interface Props {
  data?: { matches: IMatchList[] };
  loading: boolean;
  error?: ApolloError;
}

export default function HeadToHeadView({ data, loading, error }: Props) {
  const mapMatchStats = () => {
    if (data?.matches) {
      const { matches } = data;
      const total = matches.length;
      const wins = matches.filter(match => match.teamGoals > match.opponentGoals).length;
      const draws = matches.filter(match => match.teamGoals === match.opponentGoals).length;
      const defeats = matches.filter(match => match.teamGoals < match.opponentGoals).length;
      const scored = matches.map(match => match.teamGoals).reduce((a, b) => a + b, 0);
      const conceded = matches.map(match => match.opponentGoals).reduce((a, b) => a + b, 0);
      const difference = scored - conceded;
      return {
        total,
        wins,
        draws,
        defeats,
        scored,
        conceded,
        difference,
      };
    }
  };

  const renderContent = () => {
    return data?.matches && data.matches.length === 0 ? (
      <NoDataText>No matches yet</NoDataText>
    ) : (
      <>
        <MatchStatsTable stats={mapMatchStats() as IMatchStats} loading={loading} />
        <MatchList matches={data?.matches} loading={loading} showBadge={false} />
      </>
    );
  };

  return (
    <SectionContainer>{error ? <DataError error={error} /> : renderContent()}</SectionContainer>
  );
}
