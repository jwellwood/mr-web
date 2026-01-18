import { ApolloError } from '@apollo/client';

import { DataError, NoDataText, SectionContainer } from '../../../components';
import { IPlayerSeasonsSummary } from '../types';
import PlayerBestSeasonTable from '../components/player-best-season-table/PlayerBestSeasonTable';

type Props = {
  data?: { seasons: IPlayerSeasonsSummary[] };
  loading: boolean;
  error?: ApolloError;
};

export default function PlayerBestSeasonView({ data, loading, error }: Props) {
  const renderContent = () => {
    if (data && data.seasons.length === 0) {
      return <NoDataText>No season records</NoDataText>;
    }
    return <PlayerBestSeasonTable data={data?.seasons} loading={loading} />;
  };

  return (
    <SectionContainer title="Single Season Records">
      {error ? <DataError error={error} /> : renderContent()}
    </SectionContainer>
  );
}
