import { useTranslation } from 'react-i18next';
import { SectionContainer } from '../../../components';
import { LinksList, type IListItem } from '../../../components/lists';
import { T_FETCH_TROPHIES } from '../graphql';
import { getTrophyListItemTeam } from '../helpers/getTrophyListItemTeam';

interface Props {
  trophies?: T_FETCH_TROPHIES['trophies'];
}

export default function TrophiesOrderByType({ trophies }: Props) {
  const { t } = useTranslation('trophies');
  const winner: IListItem[] = (trophies || [])
    .filter(trophy => trophy.isWinner)
    .map(trophy => getTrophyListItemTeam(trophy));
  const runnerUp: IListItem[] = (trophies || [])
    .filter(trophy => !trophy.isWinner)
    .map(trophy => getTrophyListItemTeam(trophy));
  return (
    <>
      <SectionContainer subtitle={t('TYPE.WINNER')}>
        <LinksList links={winner} />
      </SectionContainer>
      <SectionContainer subtitle={t('TYPE.RUNNER_UP')}>
        <LinksList links={runnerUp} />
      </SectionContainer>
    </>
  );
}
