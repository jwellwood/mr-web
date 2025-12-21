import { IMAGE_TYPE } from '../../../constants';
import { CenteredGrid } from '../../../components/grids';
import TextList from '../../../components/lists/TextList';
import { CustomTypography } from '../../../components/typography';
import { parseDate } from '../../../utils/helpers';
import { getPoints } from '../helpers';
import { ICompetition } from '../../organization/types';
import { ITeam } from '../../team/types';
import { IMatchResponse } from '../types';
import { IListItem } from '../../../components/lists/types';
import { ImageAvatar, ModuleHeaderContainer } from '../../../components';
import ScoreBox from './ScoreBox';

type Props = {
  match: IMatchResponse;
};

export default function MatchDetails({ match }: Props) {
  const { date, teamId, teamGoals, opponentId, opponentGoals, isHome, competitionId } = match;
  const matchDate = parseDate(date);
  const team = (teamId as ITeam).teamName;
  const teamBadge = (teamId as ITeam)?.teamBadge?.url || 'default';
  const opponent = (opponentId as ITeam)?.teamName;
  const oppBadge = (opponentId as ITeam)?.teamBadge?.url || 'default';
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
      avatar: <ImageAvatar imageUrl={homeTeam.badge} fallbackIcon={IMAGE_TYPE.TEAM} />,
      label: (
        <CustomTypography size="lg" bold color="data">
          {homeTeam.name}
        </CustomTypography>
      ),
      value: <ScoreBox points={getPoints(teamGoals, opponentGoals)} goals={homeTeam.score} />,
    },
    {
      avatar: <ImageAvatar imageUrl={awayTeam.badge} fallbackIcon={IMAGE_TYPE.TEAM} />,
      label: (
        <CustomTypography size="lg" bold color="data">
          {awayTeam.name}
        </CustomTypography>
      ),
      value: <ScoreBox points={getPoints(teamGoals, opponentGoals)} goals={awayTeam.score} />,
    },
  ];

  return (
    <ModuleHeaderContainer>
      <CenteredGrid>
        <CustomTypography size="xs" color="label">
          {matchDate}
        </CustomTypography>
        <CustomTypography color="label">{(competitionId as ICompetition)?.name}</CustomTypography>
      </CenteredGrid>
      <div style={{ marginLeft: 16 }}>
        <TextList data={scoreData} />
      </div>
    </ModuleHeaderContainer>
  );
}
