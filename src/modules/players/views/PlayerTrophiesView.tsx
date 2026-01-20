import { ApolloError } from '@apollo/client';

import { DataError, LinksList, NoDataText, SectionContainer } from '../../../components';
import { ITrophyResponse } from '../../history/types';
import { getTrophyListItem } from '../helpers';

interface Props {
  data?: { trophies: ITrophyResponse[] };
  loading: boolean;
  error?: ApolloError;
}

export default function PlayerTrophiesView({ data, loading, error }: Props) {
  const winner = () =>
    data?.trophies.filter(trophy => trophy.isWinner).map(winner => getTrophyListItem(winner));
  const runnerUp = () =>
    data?.trophies.filter(trophy => !trophy.isWinner).map(runnerUp => getTrophyListItem(runnerUp));

  const renderContent = () => {
    if (data && data?.trophies.length === 0) {
      return <NoDataText>No trophies yet</NoDataText>;
    }
    return (
      <>
        <SectionContainer isSpecial subtitle="Winner">
          <LinksList links={winner()} loading={loading} />
        </SectionContainer>
        <SectionContainer subtitle="Runner-up">
          <LinksList links={runnerUp()} loading={loading} />
        </SectionContainer>
      </>
    );
  };

  return (
    <SectionContainer title="Trophies">
      {error ? <DataError error={error} /> : renderContent()}
    </SectionContainer>
  );
}
