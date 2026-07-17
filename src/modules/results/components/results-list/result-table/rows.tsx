import { CustomTypography } from '../../../../../components';
import TiebreakerText from '../../../../../components/composed/TiebreakerText';
import { T_FETCH_RESULTS } from '../../../graphql';
import ResultScoreBox from '../ResultScoreBox';

export const rows = (results: T_FETCH_RESULTS['results'], orgId: string) => {
  const link = (resultId: string, orgSeasonId: string) =>
    `/org/${orgId}/org_season/${orgSeasonId}/result/${resultId}`;

  return results.map(result => {
    const homeWin = result.homeGoals! > result.awayGoals! || result.winnerSide === 'HOME';
    const awayWin = result.awayGoals! > result.homeGoals! || result.winnerSide === 'AWAY';

    return {
      kickoffTime: result.kickoffTime || '09:00',
      homeTeam: (
        <CustomTypography color={homeWin ? 'data' : 'label'} bold={homeWin}>
          {result?.homeTeam?.teamName}{' '}
          {result.decision && homeWin && (
            <TiebreakerText tiebreakType={result.decision} size="xs" />
          )}
        </CustomTypography>
      ),
      homeScore: {
        value: (
          <ResultScoreBox
            resultStatus={result.resultStatus}
            goals={result.homeGoals!}
            date={result.date!}
          />
        ),
        link: link(result._id, result.orgSeasonId._id),
      },
      divider: <CustomTypography color="label">-</CustomTypography>,
      awayScore: {
        value: (
          <ResultScoreBox
            resultStatus={result.resultStatus}
            goals={result.awayGoals!}
            date={result.date!}
          />
        ),
        link: link(result._id, result.orgSeasonId._id),
      },
      awayTeam: (
        <CustomTypography color={awayWin ? 'data' : 'label'} bold={awayWin}>
          {result.decision && awayWin && (
            <TiebreakerText tiebreakType={result.decision} size="xs" />
          )}{' '}
          {result?.awayTeam?.teamName}
        </CustomTypography>
      ),
    };
  });
};
