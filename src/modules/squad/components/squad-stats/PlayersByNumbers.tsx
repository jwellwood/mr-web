import { useTranslation } from 'react-i18next';
import { SectionContainer } from '../../../../components/containers';
import { TextList, type IListItem } from '../../../../components/lists';
import { getAverageAge } from '../../../../utils';
import { T_FETCH_SQUAD_STATS_QUERY } from '../../graphql';
import ByNationality from './ByNationality';

interface Props {
  players?: T_FETCH_SQUAD_STATS_QUERY['stats'];
  loading: boolean;
  season?: string;
  showAge?: boolean;
}

export default function PlayersByNumbers({ players, loading, season, showAge }: Props) {
  const { t } = useTranslation('squad');
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
    { label: t('STATS.PLAYERS'), value: numberOfPlayers },
    {
      label: t('STATS.NATIONALITIES'),
      value: <ByNationality players={players} title={nationalitiesCount.toString()} />,
    },
    { label: t('STATS.AVERAGE_AGE'), value: avgAgeDisplay, hidden: !showAge },
  ].filter(elem => !elem.hidden) as IListItem[];
  return (
    <SectionContainer>
      <TextList data={data} loading={loading} />
    </SectionContainer>
  );
}
