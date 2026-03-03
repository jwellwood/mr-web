import { T_FETCH_RESULT } from '../graphql';
import { ResultStatusType } from '../types';
import ResultStatus from './ResultStatus';

export const rows = (results: T_FETCH_RESULT['result'][], orgId: string, orgSeasonId: string) => {
  return results.map(result => ({
    homeTeam: result.homeTeam.teamName,
    homeScore: {
      value: typeof result.homeGoals === 'number' ? result.homeGoals : '-',
      link: `/org/${orgId}/org_season/${orgSeasonId}/result/${result._id}`,
    },
    awayScore: {
      value: typeof result.awayGoals === 'number' ? result.awayGoals : '-',
      link: `/org/${orgId}/org_season/${orgSeasonId}/result/${result._id}`,
    },
    awayTeam: result.awayTeam.teamName,
    status: {
      value: <ResultStatus resultStatus={result.resultStatus as ResultStatusType} />,
      link: `/org/${orgId}/org_season/${orgSeasonId}/result/${result._id}`,
    },
  }));
};
