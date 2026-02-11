import { SectionContainer } from '../../../../components';
import { LinksList, type IListItem } from '../../../../components/lists';
import { getTrophyListItemTeam } from '../../helpers/getTrophyListItemTeam';
import { T_FETCH_TROPHIES } from '../../types';

interface Props {
  trophies?: T_FETCH_TROPHIES['trophies'];
}

export default function TrophiesOrderByType({ trophies }: Props) {
  const winner: IListItem[] = (trophies || [])
    .filter(trophy => trophy.isWinner)
    .map(trophy => getTrophyListItemTeam(trophy));
  const runnerUp: IListItem[] = (trophies || [])
    .filter(trophy => !trophy.isWinner)
    .map(trophy => getTrophyListItemTeam(trophy));
  return (
    <>
      <SectionContainer subtitle="Winner">
        <LinksList links={winner} />
      </SectionContainer>
      <SectionContainer subtitle="Runner up">
        <LinksList links={runnerUp} />
      </SectionContainer>
    </>
  );
}
