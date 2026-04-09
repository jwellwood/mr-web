import { CustomTypography } from '../../../../components';
import { ResultStatusType } from '../../constants';
import { T_FETCH_RESULTS } from '../../graphql';
import ResultStatus from '../ResultStatus';

export const rows = (results: T_FETCH_RESULTS['results'], orgId: string) => {
  const getScoreColor = (homeGoals?: number, awayGoals?: number) => {
    if (typeof homeGoals === 'number' && typeof awayGoals === 'number') {
      if (homeGoals > awayGoals) return 'primary';
      if (homeGoals < awayGoals) return 'label';
    }
    return 'inherit';
  };

  const renderGoals = (goals: number | undefined, opponentGoals: number | undefined) => {
    return typeof goals === 'number' ? (
      <CustomTypography color={getScoreColor(goals, opponentGoals)} bold>
        {goals}
      </CustomTypography>
    ) : (
      '-'
    );
  };
  const link = (resultId: string, orgSeasonId: string) =>
    `/org/${orgId}/org_season/${orgSeasonId}/result/${resultId}`;
  return results.map(result => ({
    kickoffTime: result.kickoffTime || '10:00',
    homeTeam: result.homeTeam.teamName,
    homeScore: {
      value: renderGoals(result.homeGoals, result.awayGoals),
      link: link(result._id, result.orgSeasonId._id),
    },
    awayScore: {
      value: renderGoals(result.awayGoals, result.homeGoals),
      link: link(result._id, result.orgSeasonId._id),
    },
    awayTeam: result.awayTeam.teamName,
    status: {
      value: (
        <ResultStatus
          resultStatus={result.resultStatus as ResultStatusType}
          display="icon"
          isComplete={!!result.isComplete}
        />
      ),
      link: link(result._id, result.orgSeasonId._id),
    },
  }));
};
