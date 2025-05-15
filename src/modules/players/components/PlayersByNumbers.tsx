import React from 'react';
import { DataContainer } from '../../../components/containers';
import { IListItem, IPlayer } from '../../../types';
import { getAverageAge } from '../helpers/getAverageAge';
import ByNationality from './ByNationality';
import { IPastPlayer } from '../../../types/pastPlayer.ts';

type Props = {
  players: IPlayer[] | IPastPlayer[];
  loading: boolean;
  season?: string;
  showAge?: boolean;
};

const PlayersByNumbers: React.FC<Props> = ({ players, loading, season, showAge }) => {
  const numberOfPlayers = players.length;
  const nationalities = new Set(players.map(player => player.nationality)).size;
  const ages: string[] = players
    .map(player => 'dateOfBirth' in player && player.dateOfBirth)
    .filter(age => typeof age === 'string');
  const averageAge = getAverageAge(ages, season);

  const data: IListItem[] = [
    { label: 'Number of Players', value: numberOfPlayers },
    {
      label: 'Nationalities',
      value: (
        <ByNationality
          players={players}
          title={nationalities.toString()}
          padding="3px"
          variant="text"
        />
      ),
    },
    { label: 'Average Age', value: averageAge.toFixed(1), hidden: !showAge },
  ].filter(elem => !elem.hidden);
  return <DataContainer data={data} loading={loading} size={showAge ? 4 : 6} />;
};

export default PlayersByNumbers;
