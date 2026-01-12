import { IMAGE_TYPE } from '../../../constants';
import ImageAvatar from '../../../components/avatars/image-avatar/ImageAvatar';
import MatchListLabel from '../../../components/common/matches/match-list/MatchListLabel';
import MatchListScoreBox from '../../../components/common/matches/match-list/MatchListScoreBox';
import { IMatchList } from '../types';

interface Args {
  data?: IMatchList[];
  orgId?: string;
  teamId?: string;
  loading?: boolean;
  showBadge?: boolean;
  matchId?: string;
}

export const getMatchListData = ({
  data = [],
  orgId,
  teamId,
  loading,
  showBadge,
  matchId,
}: Args) => {
  const arr = new Array(15).fill({});
  const mappedData =
    loading || data === undefined
      ? arr.map((_item, i) => ({ link: i }) as unknown as IMatchList)
      : data;
  return mappedData.map((match: IMatchList) => {
    return {
      avatar: showBadge ? (
        <ImageAvatar
          size="40px"
          fallbackIcon={IMAGE_TYPE.TEAM}
          loading={loading || !data}
          imageUrl={match.opponentBadge || ''}
        />
      ) : null,
      label: <MatchListLabel match={match} loading={loading || !data} />,
      value: (
        <MatchListScoreBox
          teamGoals={match?.teamGoals}
          opponentGoals={match?.opponentGoals}
          loading={loading || !data}
        />
      ),
      link: `/org/${orgId}/team/${teamId}/match/${match._id}`,
      border: (matchId?.length || 0) > 0 && matchId === match._id,
    };
  });
};
