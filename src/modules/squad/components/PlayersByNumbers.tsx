import { DataContainer } from '../../../components/containers';
import { IListItem, IPlayer } from '../../../types';
import { getAverageAge } from '../helpers';
import { IPastPlayer } from '../types.ts';
import ByNationality from './ByNationality.tsx';

interface Props {
  players: IPlayer[] | IPastPlayer[];
  loading: boolean;
  season?: string;
  showAge?: boolean;
}

export default function PlayersByNumbers({ players, loading, season, showAge }: Props) {
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
}
