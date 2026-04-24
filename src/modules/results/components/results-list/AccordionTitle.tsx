import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { CustomTypography, SectionContainer } from '../../../../components';
import { CustomStack } from '../../../../components/grids';
import { AppIcon } from '../../../../components/icons';
import { useAuth, useCustomParams } from '../../../../hooks';
import BatchConfirmResults from '../../containers/BatchConfirmResults';
import { T_FETCH_RESULTS } from '../../graphql';
import { getResultStatusInGameweek } from '../../helpers/getResultStatusInGameweek';
import { isDateInPast } from '../../helpers/isDateInPast';

interface Props {
  gameWeek: string;
  gwResults: T_FETCH_RESULTS['results'];
  isExpanded: boolean;
  isFixture?: boolean;
}

export default function AccordionTitle({ gameWeek, gwResults, isExpanded, isFixture }: Props) {
  const { t } = useTranslation('results');
  const { orgId, orgSeasonId } = useCustomParams();
  const { isOrgAuth } = useAuth('', orgId);
  const counts = getResultStatusInGameweek(gwResults);
  const pastPendingCount = gwResults.filter(
    r =>
      (r.resultStatus == null || String(r.resultStatus).toLowerCase().includes('pending')) &&
      isDateInPast(r.date)
  ).length;
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isExpanded && isFixture && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isExpanded, isFixture]);

  const listData = [
    { label: <AppIcon icon="pending" color="warning" />, value: pastPendingCount },
    { label: <AppIcon icon="disputed" color="error" />, value: counts.disputed },
    { label: <AppIcon icon="submitted" color="info" />, value: counts.submitted },
  ].filter(item => item.value > 0);

  return (
    <CustomStack direction="row" justify="space-between">
      <div style={{ width: '100%' }}>
        <CustomTypography color="data" bold>
          {`${t('ROUND')} ${gameWeek} `} -{' '}
          <CustomTypography color="label">
            {`${gwResults.length} ${t('GAME')}${gwResults.length !== 1 ? 's' : ''}`}
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
        {isOrgAuth && counts.submitted > 0 && orgSeasonId && (
          <BatchConfirmResults resultIds={gwResults.map(r => r._id)} />
        )}
      </CustomStack>
    </CustomStack>
  );
}
