import { useState } from 'react';

import MatchStatsAllTime from '../../containers/MatchStatsAllTime';
import MatchStatsSeason from '../../containers/MatchStatsSeason';
import { MatchStatsContext, TMatchStatsFilters } from '../../context';
import MatchStatsFilters from './filters/MatchStatsFilters';

export default function MatchStatsWrapper() {
  const [filters, setFilters] = useState<TMatchStatsFilters>({
    competition: 'all',
    includeForfeits: true,
  });
  return (
    <MatchStatsContext.Provider value={{ filters, setFilters }}>
      <MatchStatsFilters />
      <MatchStatsSeason />
      <MatchStatsAllTime />
    </MatchStatsContext.Provider>
  );
}
