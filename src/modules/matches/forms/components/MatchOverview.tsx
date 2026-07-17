import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { SectionContainer } from '../../../../components';
import CustomStack from '../../../../components/grids/custom-stack/CustomStack';
import { CustomTypography } from '../../../../components/typography';
import { getTempMatch } from '../../../../store';
import { parseDate } from '../../../../utils';

export default function MatchOverview() {
  const { t } = useTranslation('matches');
  const currentMatch = useSelector(getTempMatch);
  const {
    teamName,
    opponentName,
    teamGoals,
    opponentGoals,
    date,
    isHome,
    competitionName,
    decision,
    winnerSide,
  } = currentMatch;
  const homeTeam = isHome ? teamName : opponentName;
  const awayTeam = !isHome ? teamName : opponentName;
  const homeScore = isHome ? teamGoals : opponentGoals;
  const awayScore = !isHome ? teamGoals : opponentGoals;
  const translatedWinnerSideLabel =
    winnerSide === 'HOME'
      ? t('FORM.OPTIONS.WINNER_SIDE.HOME')
      : winnerSide === 'AWAY'
        ? t('FORM.OPTIONS.WINNER_SIDE.AWAY')
        : '';
  const translatedDecisionLabel =
    decision === 'NORMAL_TIME'
      ? t('FORM.OPTIONS.DECISION.NORMAL_TIME')
      : decision === 'EXTRA_TIME'
        ? t('FORM.OPTIONS.DECISION.EXTRA_TIME')
        : decision === 'PENALTIES'
          ? t('FORM.OPTIONS.DECISION.PENALTIES')
          : '';

  return (
    <SectionContainer>
      <CustomStack>
        <CustomTypography color="primary" bold>
          {parseDate(date)}
        </CustomTypography>
        <CustomTypography color="label">{competitionName}</CustomTypography>
        <div>
          <CustomTypography color="label">{homeTeam}</CustomTypography>{' '}
          <CustomTypography color="data" bold>{`${homeScore} - ${awayScore} `}</CustomTypography>
          <CustomTypography color="label">{awayTeam}</CustomTypography>
        </div>
        {translatedDecisionLabel ? (
          <CustomTypography color="label">
            {t('FORM.LABELS.DECISION')}: {translatedDecisionLabel}
          </CustomTypography>
        ) : null}
        {translatedWinnerSideLabel ? (
          <CustomTypography color="label">
            {t('FORM.LABELS.WINNER_SIDE')}: {translatedWinnerSideLabel}
          </CustomTypography>
        ) : null}
      </CustomStack>
    </SectionContainer>
  );
}
