import { ImageAvatar, ModuleHeaderContainer } from '../../../../components';
import { CenteredGrid } from '../../../../components/grids';
import TextList from '../../../../components/lists/TextList';
import { IListItem } from '../../../../components/lists/types';
import CustomSkeleton from '../../../../components/loaders/CustomSkeleton';
import { CustomTypography } from '../../../../components/typography';
import { IMAGE_TYPE } from '../../../../constants';
import { parseDate } from '../../../../utils/helpers';
import { ICompetition } from '../../../organization/types';
import { ITeam } from '../../../team/types';
import { getPoints } from '../../helpers';
import { T_FETCH_MATCH } from '../../types';
import ScoreBox from './ScoreBox';

interface Props {
  match?: T_FETCH_MATCH['match'];
  loading: boolean;
}

export default function MatchDetails({ match, loading }: Props) {
  const { date, teamId, teamGoals, opponentId, opponentGoals, isHome, competitionId } = match || {
    teamGoals: 0,
    opponentGoals: 0,
  };
  const matchDate = parseDate(date);
  const team = (teamId as ITeam)?.teamName;
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
      avatar: (
        <ImageAvatar
          size="50px"
          iconSize="30px"
          imageUrl={homeTeam.badge}
          fallbackIcon={IMAGE_TYPE.BADGE}
          loading={loading}
        />
      ),
      label: (
        <CustomTypography size="lg" bold color="data">
          {homeTeam.name}
        </CustomTypography>
      ),
      value: <ScoreBox points={getPoints(teamGoals, opponentGoals)} goals={homeTeam.score} />,
    },
    {
      avatar: (
        <ImageAvatar
          size="50px"
          iconSize="30px"
          imageUrl={awayTeam.badge}
          fallbackIcon={IMAGE_TYPE.BADGE}
          loading={loading}
        />
      ),
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
          {loading ? <CustomSkeleton width="40px" /> : matchDate}
        </CustomTypography>
        <CustomTypography color="label">
          {loading ? <CustomSkeleton width="70px" /> : (competitionId as ICompetition)?.name}
        </CustomTypography>
      </CenteredGrid>
      <div style={{ marginLeft: 16 }}>
        <TextList data={scoreData} loading={loading} />
      </div>
    </ModuleHeaderContainer>
  );
}
