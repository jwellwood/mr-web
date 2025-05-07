import React from 'react';
import { IMAGE_TYPE } from 'app/constants';
import CustomAvatar from 'components/avatars/CustomAvatar';
import { SectionContainer } from 'components/containers';
import { CenteredGrid } from 'components/grids';
import TextList from 'components/lists/TextList';
import { CustomTypography } from 'components/typography';
import { ICompetition, IListItem, IMatchResponse, ITeam } from 'types';
import { parseDate } from 'utils/helpers';
import { getPoints } from '../helpers';
import ScoreBox from './ScoreBox';

type Props = {
  match: IMatchResponse;
};

const MatchDetails: React.FC<Props> = ({ match }) => {
  const {
    date,
    teamId,
    teamGoals,
    opponentId,
    opponentGoals,
    isHome,
    competitionId,
  } = match;
  const matchDate = parseDate(date);
  const team = (teamId as ITeam).teamName;
  const teamBadge = (teamId as ITeam).teamBadge.url;
  const opponent = (opponentId as ITeam).teamName;
  const oppBadge = (opponentId as ITeam).teamBadge.url;
  const homeTeam = {
    name: isHome ? team : opponent,
    score: isHome ? teamGoals : opponentGoals,
    badge: isHome ? teamBadge : oppBadge,
  };
  const awayTeam = {
    name: isHome ? opponent : team,
    score: isHome ? opponentGoals : teamGoals,
    badge: isHome ? oppBadge : teamBadge,
  };

  const scoreData: IListItem[] = [
    {
      avatar: <CustomAvatar imageUrl={homeTeam.badge} type={IMAGE_TYPE.TEAM} />,
      label: (
        <CustomTypography size="lg" bold color="data">
          {homeTeam.name}
        </CustomTypography>
      ),
      value: (
        <ScoreBox
          points={getPoints(teamGoals, opponentGoals)}
          goals={homeTeam.score}
        />
      ),
    },
    {
      avatar: <CustomAvatar imageUrl={awayTeam.badge} type={IMAGE_TYPE.TEAM} />,
      label: (
        <CustomTypography size="lg" bold color="data">
          {awayTeam.name}
        </CustomTypography>
      ),
      value: (
        <ScoreBox
          points={getPoints(teamGoals, opponentGoals)}
          goals={awayTeam.score}
        />
      ),
    },
  ];

  return (
    <SectionContainer>
      <CenteredGrid>
        <CustomTypography size="xs" color="label">
          {matchDate}
        </CustomTypography>
        <CustomTypography color="label">
          {(competitionId as ICompetition)?.name}
        </CustomTypography>
      </CenteredGrid>
      <TextList data={scoreData} />
    </SectionContainer>
  );
};

export default MatchDetails;
