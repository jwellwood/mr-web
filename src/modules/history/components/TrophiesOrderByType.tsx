import { SectionContainer } from '../../../components';
import { CustomTypography } from '../../../components/typography';
import LinksList from '../../../components/lists/LinksList';
import { getTrophyListItemTeam } from '../helpers/getTrophyListItemTeam';
import { ITrophyResponse } from '../types';
import { IListItem } from '../../../components/lists/types';

type Props = {
  trophies: ITrophyResponse[];
};

export default function TrophiesOrderByType({ trophies }: Props) {
  const winner: IListItem[] = (trophies || [])
    .filter(trophy => trophy.isWinner)
    .map(trophy => getTrophyListItemTeam(trophy));
  const runnerUp: IListItem[] = (trophies || [])
    .filter(trophy => !trophy.isWinner)
    .map(trophy => getTrophyListItemTeam(trophy));
  return (
    <>
      <SectionContainer>
        <CustomTypography color="label" bold size="xs">
          Winner
        </CustomTypography>
        <LinksList links={winner} />
      </SectionContainer>
      <SectionContainer>
        <CustomTypography color="label" bold size="xs">
          Runner up
        </CustomTypography>
        <LinksList links={runnerUp} />
      </SectionContainer>
    </>
  );
}
