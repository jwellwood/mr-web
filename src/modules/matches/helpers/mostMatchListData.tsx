import { IListItem, IMostMatch } from '../../../types';
import MatchListLabelBasic from '../components/MatchListLabelBasic';
import MatchListScoreBox from '../components/MatchListScoreBox';

export const mostMatchListData = (
  data?: IMostMatch[],
  orgId?: string,
  teamId?: string,
  loading?: boolean
): IListItem[] => {
  const arr = new Array(10).fill({});
  const mappedData =
    loading || !data ? arr.map((_item, i) => ({ link: i }) as unknown as IMostMatch) : data;
  return mappedData.map((match: IMostMatch) => {
    return {
      label: (
        <MatchListLabelBasic
          opponent={match?.opponent}
          date={match?.date}
          isHome={match?.isHome}
          loading={loading}
        />
      ),
      value: (
        <MatchListScoreBox
          teamGoals={match?.teamGoals}
          opponentGoals={match?.opponentGoals}
          loading={loading}
        />
      ),
      link: `/org/${orgId}/team/${teamId}/match/${match._id}`,
    };
  });
};
