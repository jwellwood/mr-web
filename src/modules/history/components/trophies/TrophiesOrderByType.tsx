import { SectionContainer } from '../../../../components';
import LinksList from '../../../../components/lists/links-list/LinksList';
import { getTrophyListItemTeam } from '../../helpers/getTrophyListItemTeam';
import { T_FETCH_TROPHIES } from '../../types';
import { IListItem } from '../../../../components/lists/types';

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
