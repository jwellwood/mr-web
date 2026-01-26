import { SectionContainer } from '../../../components/containers';
import TextList from '../../../components/lists/TextList';
import { IListItem } from '../../../components/lists/types';
import { getAverageAge } from '../../../utils/helpers';
import { FETCH_SQUAD_STATS_QUERY } from '../types';
import ByNationality from './ByNationality';

interface Props {
  players?: FETCH_SQUAD_STATS_QUERY['stats'];
  loading: boolean;
  season?: string;
  showAge?: boolean;
}

export default function PlayersByNumbers({ players, loading, season, showAge }: Props) {
  const numberOfPlayers = players?.length ?? 0;
  const nationalitySet = new Set(
    (players ?? [])
      .map(player => (player && 'nationality' in player ? player.nationality : undefined))
      .filter(Boolean)
  );
  const nationalitiesCount = nationalitySet.size;

  const ages = (players ?? [])
    .map(player =>
      'dateOfBirth' in (player || {}) ? (player as { dateOfBirth: string }).dateOfBirth : undefined
    )
    .filter((v): v is string => typeof v === 'string');

  const averageAge = getAverageAge(ages, season);

  const avgAgeDisplay = Number.isFinite(averageAge) ? averageAge.toFixed(1) : '—';

  const data: IListItem[] = [
    { label: 'Players', value: numberOfPlayers },
    {
      label: 'Nationalities',
      value: <ByNationality players={players} title={nationalitiesCount.toString()} />,
    },
    { label: 'Average Age', value: avgAgeDisplay, hidden: !showAge },
  ].filter(elem => !elem.hidden) as IListItem[];
  return (
    <SectionContainer>
      <TextList data={data} loading={loading} />
    </SectionContainer>
  );
}
