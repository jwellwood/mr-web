import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import CustomSkeleton from '../../../components/loaders/CustomSkeleton';
import { useSeasons } from '../../../hooks/useSeasons';
import SelectSeasonModal from '../components/SelectSeasonModal';
import { IListItem } from '../../../types';
import { FETCH_PLAYER } from '../graphql';

interface Props {
  playerId?: string;
}

const SelectSeason: React.FC<Props> = ({ playerId }) => {
  const [seasonsToDisplay, setSeasonsToDisplay] = useState<IListItem[]>([]);

  const { onSelectSeason, seasonOptions, seasonId } = useSeasons();

  const currentSeason = seasonOptions.find(s => s.value === seasonId)?.label;

  const { loading, data } = useQuery(FETCH_PLAYER, {
    variables: { playerId },
  });
  useEffect(() => {
    if (seasonOptions.length && data?.player) {
      const seasonIds = data?.player?.seasonIds?.map((season: { _id: string }) => season._id);
      const filteredSeasons = seasonOptions.filter(season =>
        seasonIds?.includes(String(season.value))
      );
      setSeasonsToDisplay(filteredSeasons);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.player]);
  return !loading ? (
    <SelectSeasonModal
      currentSeason={currentSeason}
      seasonId={seasonId}
      seasonsList={seasonsToDisplay}
      onClick={onSelectSeason}
    />
  ) : (
    <CustomSkeleton width="100px" height="30px" />
  );
};

export default SelectSeason;
