import { IMAGE_TYPE } from '../../../constants';
import { useCustomParams } from '../../../hooks';
import { ImageAvatar } from '../../avatars';
import { LinksList } from '../../lists';
import { IMatchesListMatch } from '../types';
import MatchListLabel from './MatchListLabel';
import MatchListScoreBox from './MatchListScoreBox';
import MatchLoading from './MatchLoading';

interface Props {
  matches?: IMatchesListMatch[];
  loading: boolean;
  showBadge?: boolean;
  showComp?: boolean;
}
export default function MatchList({ matches, loading, showBadge = true, showComp = true }: Props) {
  const { orgId, teamId, matchId } = useCustomParams();

  const data = matches?.map(match => {
    return {
      avatar: showBadge ? (
        <ImageAvatar
          size="40px"
          fallbackIcon={IMAGE_TYPE.BADGE}
          loading={loading}
          imageUrl={match.opponentBadge || ''}
        />
      ) : null,
      label: <MatchListLabel match={match} loading={loading} showComp={showComp} />,
      value: (
        <MatchListScoreBox
          teamGoals={match?.teamGoals}
          opponentGoals={match?.opponentGoals}
          loading={loading}
        />
      ),
      link: `/org/${orgId}/team/${teamId}/match/${match._id}`,
      border: (matchId?.length || 0) > 0 && matchId === match._id,
    };
  });
  return loading ? (
    <MatchLoading showBadge={showBadge} />
  ) : (
    <LinksList links={data} loading={loading} rows={20} />
  );
}
