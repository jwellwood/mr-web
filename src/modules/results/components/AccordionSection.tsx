import { useTranslation } from 'react-i18next';
import { CustomTypography, SectionContainer } from '../../../components';
import { CustomAccordion } from '../../../components/accordion';
import { CustomStack } from '../../../components/grids';
import { APP_ICONS, AppIcon } from '../../../components/icons';
import { useAuth, useCustomParams } from '../../../hooks';
import { parseDate } from '../../../utils';
import BatchConfirmResults from '../containers/BatchConfirmResults';
import { T_FETCH_RESULTS } from '../graphql';
import { getResultStatusInGameweek } from '../helpers/getResultStatusInGameweek';
import ResultTable from './result-table/ResultTable';

interface Props {
  competitionName: string;
  gameWeek: string;
  gwResults: T_FETCH_RESULTS['results'];
  gwIndex: number;
}

export default function AccordionSection({ competitionName, gameWeek, gwResults, gwIndex }: Props) {
  const { t } = useTranslation('results');
  const { orgId, orgSeasonId } = useCustomParams();
  const { isOrgAuth } = useAuth('', orgId);
  const counts = getResultStatusInGameweek(gwResults);
  const allComplete = counts.confirmed === gwResults.length;

  const listData = [
    { label: <AppIcon icon="check" color="primary" />, value: counts.confirmed },
    { label: <AppIcon icon="pending" color="warning" />, value: counts.pending },
    { label: <AppIcon icon="disputed" color="error" />, value: counts.disputed },
    { label: <AppIcon icon="submitted" color="info" />, value: counts.submitted },
  ].filter(item => item.value > 0);

  return (
    <CustomAccordion
      key={`${competitionName}-${gameWeek}`}
      isExpanded={gwIndex === 0}
      title={
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
            {counts.confirmed === gwResults.length ? (
              <AppIcon icon={APP_ICONS.CHECK} color="primary" />
            ) : (
              listData.map((item, index) => (
                <SectionContainer key={index}>
                  <CustomTypography color="data" bold>
                    {item.label} {item.value}
                  </CustomTypography>
                </SectionContainer>
              ))
            )}
            {isOrgAuth && !allComplete && orgSeasonId && (
              <BatchConfirmResults resultIds={gwResults.map(r => r._id)} />
            )}
          </CustomStack>
        </CustomStack>
      }
    >
      <>
        {Object.entries(
          gwResults.reduce<Record<string, typeof gwResults>>((acc, r) => {
            const key = (r?.date || '').split('T')[0] || 'unknown';
            if (!acc[key]) acc[key] = [] as typeof gwResults;
            acc[key].push(r);
            return acc;
          }, {})
        )
          // sort dates descending (newest first)
          .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
          .map(([dateKey, dateResults]) => (
            <SectionContainer
              type="success"
              key={`${competitionName}-${gameWeek}-${dateKey}`}
              title={parseDate(dateKey)}
            >
              <ResultTable results={dateResults} />
            </SectionContainer>
          ))}
      </>
    </CustomAccordion>
  );
}
