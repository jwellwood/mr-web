import { lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { CustomAvatar, CustomTypography, SectionContainer } from '../../../../components';
import TiebreakerText from '../../../../components/composed/TiebreakerText';
import { CustomStack } from '../../../../components/grids';
import { TextList } from '../../../../components/lists';
import { parseDate } from '../../../../utils';
import { T_FETCH_RESULT } from '../../graphql';

const ResultGoalscorers = lazy(() => import('../../../goalscorers/components/ResultGoalscorers'));
const ResultAdmin = lazy(() => import('./ResultAdmin'));
interface Props {
  result: T_FETCH_RESULT['result'];
}

export default function ResultDetails({ result }: Props) {
  const { t } = useTranslation('results');
  const {
    date,
    gameWeek,
    competitionId,
    orgSeasonId,
    homeTeam,
    awayTeam,
    homeGoals,
    awayGoals,
    kickoffTime,
    winnerSide,
    decision,
    isBye,
  } = result;

  const goalsAvatar = (goals: number | null | undefined) => (
    <CustomAvatar bgColor="white" size="40px" variant="square">
      <CustomTypography size="lg" bold color="secondary">
        {typeof goals === 'number' ? goals : '-'}
      </CustomTypography>
    </CustomAvatar>
  );

  const scoreData = (isBye?: boolean) => [
    {
      label: (
        <CustomTypography size="lg" bold color="data">
          {homeTeam?.teamName}{' '}
          {decision && winnerSide === 'HOME' && (
            <TiebreakerText tiebreakType={decision} size="md" />
          )}
        </CustomTypography>
      ),
      value: isBye ? undefined : goalsAvatar(homeGoals),
    },
    {
      label: isBye ? (
        ''
      ) : (
        <CustomTypography size="lg" bold color="data">
          {awayTeam?.teamName}{' '}
          {decision && winnerSide === 'AWAY' && (
            <TiebreakerText tiebreakType={decision} size="md" />
          )}
        </CustomTypography>
      ),
      value: isBye ? undefined : goalsAvatar(awayGoals),
    },
  ];

  return (
    <>
      <SectionContainer>
        <CustomStack direction="row" justify="space-between">
          <CustomTypography size="xs" bold color="label">
            {orgSeasonId.name}
          </CustomTypography>
          {isBye ? (
            <CustomTypography size="md" bold color="warning">
              {t('BYE')}
            </CustomTypography>
          ) : (
            <CustomTypography size="xs" bold color="primary">
              {date ? parseDate(date) : ''}
              <CustomTypography size="xs" bold color="label">
                {kickoffTime ? ` ${kickoffTime}` : ''}
              </CustomTypography>
            </CustomTypography>
          )}
        </CustomStack>
        <CustomTypography size="sm" bold color="label">
          {competitionId.name} - {gameWeek ? `${t('ROUND')} ${gameWeek}` : ''}
        </CustomTypography>

        <TextList data={scoreData(isBye || false)} />
        <ResultGoalscorers result={result} />
      </SectionContainer>
      <ResultAdmin result={result} />
    </>
  );
}
