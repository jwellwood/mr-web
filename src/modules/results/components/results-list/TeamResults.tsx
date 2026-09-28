import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { CustomTypography, SectionContainer } from '../../../../components';
import { CustomGridContainer, CustomGridItem, CustomStack } from '../../../../components/grids';
import { useCustomParams } from '../../../../hooks';
import { parseDate } from '../../../../utils';
import { RESULT_STATUS } from '../../constants';
import { T_FETCH_RESULTS } from '../../graphql';
import ResultStatus from '../ResultStatus';

interface Props {
  results: T_FETCH_RESULTS['results'];
  selectedTeam: string;
}

const OUTCOME_COLOR = {
  WIN: 'success',
  DRAW: 'warning',
  LOSS: 'error',
} as const;

export default function TeamResults({ results, selectedTeam }: Props) {
  const { orgId } = useCustomParams();
  const { t } = useTranslation('results');
  const data = results[0];
  const { homeGoals, awayGoals, homeTeam, awayTeam, winnerSide } = data;
  const link = `/org/${orgId}/org_season/${data.orgSeasonId._id}/result/${data._id}`;

  const selectedSide =
    homeTeam?._id === selectedTeam ? 'HOME' : awayTeam?._id === selectedTeam ? 'AWAY' : null;
  const hasScore = homeGoals != null && awayGoals != null;
  const scoreWinnerSide =
    hasScore && homeGoals !== awayGoals ? (homeGoals > awayGoals ? 'HOME' : 'AWAY') : null;
  const winningSide = winnerSide ?? scoreWinnerSide;

  const isPending = data.resultStatus === RESULT_STATUS.PENDING;

  const outcomeType =
    !selectedSide || !hasScore
      ? null
      : !winningSide
        ? 'DRAW'
        : selectedSide === winningSide
          ? 'WIN'
          : 'LOSS';
  const outcome = outcomeType && {
    label: t(`OUTCOME.${outcomeType}`),
    color: OUTCOME_COLOR[outcomeType],
  };

  const team = (team: { teamName: string; _id: string } | null) => (
    <CustomTypography size="sm" bold color={team?._id === selectedTeam ? 'data' : 'label'}>
      {team?.teamName}
    </CustomTypography>
  );
  return (
    <Link to={link} style={{ textDecoration: 'none', color: 'inherit' }}>
      <SectionContainer>
        <CustomStack direction="row" justify="space-between" align="center">
          <CustomStack direction="row" divider justify="flex-start" align="center">
            <CustomTypography size="xs" bold color="label">
              {parseDate(data.date || '') || '-'}
            </CustomTypography>
            <CustomTypography size="xs" bold color="label">
              {data.kickoffTime || '-'}
            </CustomTypography>
            {outcome && (
              <CustomTypography size="sm" bold color={outcome.color}>
                {outcome.label}
              </CustomTypography>
            )}
          </CustomStack>
          <ResultStatus resultStatus={data.resultStatus} display="icon" />
        </CustomStack>
        <CustomGridContainer>
          <CustomGridItem size={5}>{team(homeTeam)}</CustomGridItem>
          <CustomGridItem size={2}>
            <CustomStack direction="row" divider justify="center">
              <CustomTypography size="md" bold color="data">
                {isPending ? '-' : homeGoals}
              </CustomTypography>

              <CustomTypography size="md" bold color="data">
                {isPending ? '-' : awayGoals}
              </CustomTypography>
            </CustomStack>
          </CustomGridItem>
          <CustomGridItem size={5}>{team(awayTeam)}</CustomGridItem>
        </CustomGridContainer>
      </SectionContainer>
    </Link>
  );
}
