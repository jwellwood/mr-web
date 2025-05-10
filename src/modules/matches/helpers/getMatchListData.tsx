import React from 'react';
import { IMAGE_TYPE } from '../../../app/constants';
import CustomAvatar from '../../../components/avatars/CustomAvatar';
import { IMatchList } from 'types/IMatchList';
import MatchListLabel from '../components/MatchListLabel';
import MatchListScoreBox from '../components/MatchListScoreBox';

interface Args {
  data: IMatchList[];
  orgId: string;
  teamId: string;
  loading: boolean;
  showBadge: boolean;
  matchId?: string;
}

export const matchListData = ({
  data,
  orgId,
  teamId,
  loading,
  showBadge,
  matchId,
}: Args) => {
  const arr = new Array(5).fill({});
  const mappedData =
    loading || data === undefined
      ? arr.map((_item, i) => ({ link: i } as unknown as IMatchList))
      : data;
  return mappedData.map((match: IMatchList) => {
    return {
      avatar: showBadge ? (
        <CustomAvatar
          iconSize="24px"
          size="40px"
          type={IMAGE_TYPE.TEAM}
          loading={loading || !data}
          imageUrl={match.opponentBadge}
          isList
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
      border: matchId && matchId === match._id,
    };
  });
};
