import { SectionContainer } from '../../../components/containers';
import TextList from '../../../components/lists/TextList';
import { IListItem } from '../../../components/lists/types';
import { getAverageAge } from '../../../utils/helpers';
import { IPlayer } from '../../players/types';
import { IPastPlayer, ISquadSeasonStats } from '../types';
import ByNationality from './ByNationality';

interface Props {
  players?: IPlayer[] | IPastPlayer[] | ISquadSeasonStats[];
  loading: boolean;
  season?: string;
  showAge?: boolean;
}

export default function PlayersByNumbers({ players, loading, season, showAge }: Props) {
  const numberOfPlayers = players?.length;
  const nationalities = new Set(players?.map(player => player.nationality)).size;
  const ages: string[] | undefined = players
    ?.map(player => 'dateOfBirth' in player && player.dateOfBirth)
    .filter(age => typeof age === 'string');
  const averageAge = getAverageAge(ages || [], season);

  const data: IListItem[] = [
    { label: 'Players', value: numberOfPlayers },
    {
      label: 'Nationalities',
      value: <ByNationality players={players || []} title={nationalities.toString()} />,
    },
    { label: 'Average Age', value: averageAge.toFixed(1), hidden: !showAge },
  ].filter(elem => !elem.hidden);
  return (
    <SectionContainer>
      <TextList data={data} loading={loading} />
    </SectionContainer>
  );
}
