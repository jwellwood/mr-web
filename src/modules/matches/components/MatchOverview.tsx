import React from 'react';
import { SectionContainer } from '../../../components/containers';
import { CenteredGrid, GridItem } from '../../../components/grids';
import { CustomTypography } from '../../../components/typography';
import { ITempMatch } from '../../../types';
import {parseDate} from "../../../utils/helpers";

type Props = {
  currentTempMatch: ITempMatch;
};

const MatchOverview: React.FC<Props> = ({ currentTempMatch }) => {
  const {
    teamName,
    opponentName,
    teamGoals,
    opponentGoals,
    date,
    isHome,
    competition,
  } = currentTempMatch;
  const homeTeam = isHome ? teamName : opponentName;
  const awayTeam = !isHome ? teamName : opponentName;
  const homeScore = isHome ? teamGoals : opponentGoals;
  const awayScore = !isHome ? teamGoals : opponentGoals;

  return (
    <SectionContainer>
      <CenteredGrid>
        <CustomTypography color="primary">{parseDate(date)}</CustomTypography>{' '}
        <GridItem>
          <CustomTypography color="label">{homeTeam}</CustomTypography>{' '}
          <CustomTypography
            color="data"
            bold
          >{`${homeScore}-${awayScore} `}</CustomTypography>
          <CustomTypography color="label">{awayTeam}</CustomTypography>
        </GridItem>
        <CustomTypography color="label">{competition?.name}</CustomTypography>
      </CenteredGrid>
    </SectionContainer>
  );
};

export default MatchOverview;
