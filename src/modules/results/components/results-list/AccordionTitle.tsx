import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { CustomTypography, SectionContainer } from '../../../../components';
import { CustomButton } from '../../../../components/buttons';
import { CustomStack } from '../../../../components/grids';
import { APP_ICONS, AppIcon } from '../../../../components/icons';
import { useAuth, useCustomParams } from '../../../../hooks';
import BatchConfirmResults from '../../containers/BatchConfirmResults';
import { T_FETCH_RESULTS } from '../../graphql';
import { getCupRoundLabel } from '../../helpers/getCupRoundLabel';
import { getResultStatusInGameweek } from '../../helpers/getResultStatusInGameweek';
import { isDateInPast } from '../../helpers/isDateInPast';
import useCompetitionConfig from '../../hooks/useCompetitionConfig';

interface Props {
  gameWeek: string;
  gwResults: T_FETCH_RESULTS['results'];
  isExpanded: boolean;
  isAdminView?: boolean;
}

export default function AccordionTitle({ gameWeek, gwResults, isExpanded, isAdminView }: Props) {
  const { t } = useTranslation('results');
  const { orgId, orgSeasonId } = useCustomParams();
  const { isOrgAuth } = useAuth('', orgId);
  const { competitionConfig } = useCompetitionConfig(gwResults[0].orgSeasonId._id);

  const currentCompConfig = competitionConfig?.find(c => c.id === gwResults[0].competitionId._id);
  const isCup = currentCompConfig?.type === 'Cup';
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

  const competitionId = gwResults[0].competitionId._id;
  const editGameweekLink = `/org/${orgId}/org_admin/org_season/${orgSeasonId}/edit_game_week/${gameWeek}?competitionId=${competitionId}`;

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

  const showAuthAdminControls = isOrgAuth && orgSeasonId;

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

      {isAdminView && (
        <CustomStack direction="row" spacing={1} justify="flex-end">
          {listData.map((item, index) => (
            <SectionContainer key={index}>
              <CustomTypography color="data" bold>
                {item.label} {item.value}
              </CustomTypography>
            </SectionContainer>
          ))}
          {showAuthAdminControls &&
            (counts.submitted > 0 || counts.disputed > 0 || pastPendingCount > 0) && (
              <BatchConfirmResults results={gwResults} />
            )}
          {showAuthAdminControls && (
            <CustomButton link={editGameweekLink} variant="text" color="secondary">
              <AppIcon icon={APP_ICONS.EDIT} size="16px" color="warning" />
            </CustomButton>
          )}
        </CustomStack>
      )}
    </CustomStack>
  );
}
