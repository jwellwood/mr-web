import { SectionContainer } from '../../../components';
import { CustomTypography } from '../../../components/typography';
import LinksList from '../../../components/lists/LinksList';
import { getTrophyListItemTeam } from '../helpers/getTrophyListItemTeam';
import { ITrophyResponse } from '../types';

type Props = {
  trophies: ITrophyResponse[];
};

export default function TrophiesOrderByCompetition({ trophies }: Props) {
  // const getComps = Object.groupBy(trophies, ({ name }) => name); // TODO add this when
  const getComps = trophies.reduce<Record<string, ITrophyResponse[]>>((acc, trophy) => {
    const { name } = trophy;
    if (!acc[name]) {
      acc[name] = [];
    }

    acc[name].push(trophy);
    return acc;
  }, {});

  return Object.entries(getComps).map(comp => {
    const compList = comp[1]?.map(value => getTrophyListItemTeam(value));
    return (
      <SectionContainer key={comp[0]}>
        <CustomTypography color="label" bold size="xs">
          {comp[0]}
        </CustomTypography>
        <LinksList links={compList || []} />
      </SectionContainer>
    );
  });
}
