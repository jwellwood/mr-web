import { SectionContainer } from '../../../components/containers';
import { CustomTypography } from '../../../components/typography';
import LinksList from '../../../components/lists/LinksList';
import { getTrophyListItemTeam } from '../helpers/getTrophyListItemTeam';
import { ITrophyResponse } from '../types';
import { theme } from '../../../theme';

type Props = {
  trophies: ITrophyResponse[];
};

const TrophyOrderByCompetition = ({ trophies }: Props) => {
  const getComps = Object.groupBy(trophies, ({ name }) => name);

  return Object.entries(getComps).map(comp => {
    const compList = comp[1]?.map(value => getTrophyListItemTeam(value));
    return (
      <SectionContainer key={comp[0]} background={theme.palette.dark.main}>
        <CustomTypography color="label" bold size="xs">
          {comp[0]}
        </CustomTypography>
        <LinksList links={compList || []} />
      </SectionContainer>
    );
  });
};

export default TrophyOrderByCompetition;
