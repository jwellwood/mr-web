import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { CustomTypography, SectionContainer } from '../../../../components';
import { CustomStack } from '../../../../components/grids';
import { AppIcon } from '../../../../components/icons';
import { useAuth, useCustomParams } from '../../../../hooks';
import { useCompetitionOptions } from '../../../competitions/hooks/useCompetitionOptions';
import BatchConfirmResults from '../../containers/BatchConfirmResults';
import { T_FETCH_RESULTS } from '../../graphql';
import { getCupRoundLabel } from '../../helpers/getCupRoundLabel';
import { getResultStatusInGameweek } from '../../helpers/getResultStatusInGameweek';
import { isCupMatch } from '../../helpers/isCupMatch';
import { isDateInPast } from '../../helpers/isDateInPast';
import useCompetitionConfig from '../../hooks/useCompetitionConfig';

interface Props {
  gameWeek: string;
  gwResults: T_FETCH_RESULTS['results'];
  isExpanded: boolean;
}

export default function AccordionTitle({ gameWeek, gwResults, isExpanded }: Props) {
  const { t } = useTranslation('results');
  const { orgId, orgSeasonId } = useCustomParams();
  const { isOrgAuth } = useAuth('', orgId);
  const { competitionOptions } = useCompetitionOptions();
  const isCup = isCupMatch(competitionOptions, gwResults[0].competitionId._id);
  const { competitionConfig } = useCompetitionConfig(gwResults[0].orgSeasonId._id);

  const currentCompConfig = competitionConfig?.find(c => c.id === gwResults[0].competitionId._id);
  const totalRounds = currentCompConfig?.rounds;
  const counts = getResultStatusInGameweek(gwResults);
  const nonByeGames = gwResults.filter(r => !r.isBye);
  const pastPendingCount = nonByeGames.filter(
    r =>
      (r.resultStatus == null || String(r.resultStatus).toLowerCase().includes('pending')) &&
      r.date &&
      isDateInPast(r.date)
  ).length;
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isExpanded && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isExpanded]);

  const listData = [
    { label: <AppIcon icon="pending" color="warning" />, value: pastPendingCount },
    { label: <AppIcon icon="disputed" color="error" />, value: counts.disputed },
    { label: <AppIcon icon="submitted" color="info" />, value: counts.submitted },
  ].filter(item => item.value > 0);

  return (
    <CustomStack direction="row" justify="space-between">
      <div style={{ width: '100%' }}>
        <CustomTypography color="data" bold>
          {isCup
            ? `${getCupRoundLabel(Number(gameWeek), totalRounds ?? 0, t)} `
            : `${t('ROUND')} ${gameWeek} `}{' '}
          {' - '}
          <CustomTypography color="label">
            {`${nonByeGames.length} ${t('GAME')}${nonByeGames.length !== 1 ? 's' : ''}`}
          </CustomTypography>
        </CustomTypography>
      </div>

      <CustomStack direction="row" spacing={1} justify="flex-end">
        {listData.map((item, index) => (
          <SectionContainer key={index}>
            <CustomTypography color="data" bold>
              {item.label} {item.value}
            </CustomTypography>
          </SectionContainer>
        ))}
        {isOrgAuth &&
          (counts.submitted > 0 || counts.disputed > 0 || pastPendingCount > 0) &&
          orgSeasonId && <BatchConfirmResults resultIds={gwResults.map(r => r._id)} />}
      </CustomStack>
    </CustomStack>
  );
}
