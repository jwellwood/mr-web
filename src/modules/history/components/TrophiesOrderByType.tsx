import { SectionContainer } from '../../../components/containers';
import { CustomTypography } from '../../../components/typography';
import { theme } from '../../../theme';
import LinksList from '../../../components/lists/LinksList';
import { getTrophyListItemTeam } from '../helpers/getTrophyListItemTeam';
import { IListItem } from '../../../types';
import { ITrophyResponse } from '../types';

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
      <SectionContainer background={theme.palette.dark.main}>
        <CustomTypography color="label" bold size="xs">
          Winner
        </CustomTypography>
        <LinksList links={winner} />
      </SectionContainer>
      <SectionContainer background={theme.palette.dark.main}>
        <CustomTypography color="label" bold size="xs">
          Runner up
        </CustomTypography>
        <LinksList links={runnerUp} />
      </SectionContainer>
    </>
  );
}
