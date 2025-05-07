import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import CustomSkeleton from 'components/loaders/CustomSkeleton';
import { useSeasons } from 'hooks/useSeasons';
import { GET_PLAYER_BY_ID } from 'modules/players/graphql';
import SelectSeasonModal from '../components/SelectSeasonModal';

interface Props {
  playerId?: string;
}

const SelectSeason: React.FC<Props> = ({ playerId }) => {
  const [seasonsToDisplay, setSeasonsToDisplay] = useState([]);

  const { onSelectSeason, seasonOptions, seasonId } = useSeasons();

  const currentSeason = seasonOptions.find((s) => s.value === seasonId)?.label;

  const { loading, data } = useQuery(GET_PLAYER_BY_ID, {
    variables: { playerId },
  });
  useEffect(() => {
    if (seasonOptions.length && data?.player) {
      const seasonIds = data.player.seasonIds.map((season) => season._id);
      const filteredSeasons = seasonOptions.filter((season) =>
        seasonIds.includes(season.value)
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
