import { CustomTypography } from '../../../../../components';
import { T_FETCH_RESULTS } from '../../../graphql';
import ResultScoreBox from '../ResultScoreBox';

export const rows = (results: T_FETCH_RESULTS['results'], orgId: string) => {
  const link = (resultId: string, orgSeasonId: string) =>
    `/org/${orgId}/org_season/${orgSeasonId}/result/${resultId}`;

  return results.map(result => {
    return {
      kickoffTime: result.kickoffTime || '09:00',
      homeTeam: result.homeTeam.teamName,
      homeScore: {
        value: (
          <ResultScoreBox
            resultStatus={result.resultStatus}
            goals={result.homeGoals}
            date={result.date}
          />
        ),
        link: link(result._id, result.orgSeasonId._id),
      },
      divider: <CustomTypography color="label">-</CustomTypography>,
      awayScore: {
        value: (
          <ResultScoreBox
            resultStatus={result.resultStatus}
            goals={result.awayGoals}
            date={result.date}
          />
        ),
        link: link(result._id, result.orgSeasonId._id),
      },
      awayTeam: result.awayTeam.teamName,
    };
  });
};
