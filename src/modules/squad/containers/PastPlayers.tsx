import { useQuery } from '@apollo/client/react';
import { useState } from 'react';
import { useCustomParams } from '../../../hooks';
import PastPlayersView from '../components/past-players/PastPlayersView';
import { FETCH_PAST_PLAYERS } from '../graphql';

const LIMIT = 20;

export default function PastPlayers() {
  const { teamId } = useCustomParams();
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('left');

  const { loading, data, previousData, error } = useQuery(FETCH_PAST_PLAYERS, {
    variables: { teamId: teamId!, page, limit: LIMIT, sortBy },
    fetchPolicy: 'cache-first',
  });

  const displayData = data ?? previousData;

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    setPage(1);
  };

  return (
    <PastPlayersView
      error={error}
      loading={loading}
      data={displayData}
      page={page}
      sortBy={sortBy}
      onPageChange={setPage}
      onSortChange={handleSortChange}
    />
  );
}
