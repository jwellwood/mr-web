import { DataError, LinksList, NoDataText, SectionContainer } from '../../../../components';
import { TApolloError } from '../../../../types/apollo';
import { T_FETCH_PLAYER_TROPHIES } from '../../types';
import { getTrophyListItem } from './getTrophyListItem';

interface Props {
  data?: T_FETCH_PLAYER_TROPHIES;
  loading: boolean;
  error?: TApolloError;
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
        <SectionContainer type="winner" subtitle="Winner">
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
