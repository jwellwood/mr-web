import React from 'react';
import { DataContainer } from 'components/containers';
import { IListItem, IPlayer } from 'types';
import { IPastPlayer } from 'types/IPastPlayer';
import { getAverageAge } from '../helpers/getAverageAge';
import ByNationality from './ByNationality';

type Props = {
  players: IPlayer[] | IPastPlayer[];
  loading: boolean;
  season?: string;
  showAge?: boolean;
};

const PlayersByNumbers: React.FC<Props> = ({
  players,
  loading,
  season,
  showAge,
}) => {
  const numberOfPlayers = players.length;
  const nationalities = new Set(players.map((player) => player.nationality))
    .size;
  const ages = players.map((player) => player.dateOfBirth);
  const averageAge = getAverageAge(ages, season || null);

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
  ].filter((elem) => !elem.hidden);
  return (
    <DataContainer data={data} loading={loading} width={showAge ? 4 : 6} />
  );
};

export default PlayersByNumbers;
