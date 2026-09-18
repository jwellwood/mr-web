import { useTranslation } from 'react-i18next';
import { CustomTypography, ISelectOptions, SectionContainer } from '../../../components';
import { TextList } from '../../../components/lists';
import { parseDate } from '../../../utils';
import { BatchResultFormData } from '../forms/batch-result/schema';

interface Props {
  results: BatchResultFormData;
  teamOptions?: ISelectOptions[];
  removedCount?: number;
}

export default function BatchResultConfirmation({ results, teamOptions, removedCount }: Props) {
  const { t } = useTranslation('results');

  return (
    <SectionContainer>
      {removedCount ? (
        <CustomTypography color="error" bold>
          {t('MESSAGES.GAMEWEEK_RESULTS_REMOVED', { count: removedCount })}
        </CustomTypography>
      ) : null}
      {results.matches?.map((match: BatchResultFormData['matches'][number], index: number) => {
        const homeTeam = teamOptions?.find(option => option.value === match.homeTeam)?.label || '';
        const awayTeam = teamOptions?.find(option => option.value === match.awayTeam)?.label || '';

        const listItems = [
          {
            label: (
              <CustomTypography color="data" bold>
                {homeTeam}
              </CustomTypography>
            ),
            value: match.homeGoals ?? '-',
          },
          {
            label: (
              <CustomTypography color="data" bold>
                {awayTeam}
              </CustomTypography>
            ),
            value: match.awayGoals ?? '-',
          },
        ];

        return (
          <SectionContainer
            key={index}
            type="success"
            title={parseDate(results.date)}
            secondaryAction={
              <CustomTypography color="secondary">{match.kickoffTime}</CustomTypography>
            }
          >
            <TextList data={listItems} />
          </SectionContainer>
        );
      })}
    </SectionContainer>
  );
}
