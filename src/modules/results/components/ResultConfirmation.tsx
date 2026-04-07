import { useTranslation } from 'react-i18next';
import { CustomTypography, ISelectOptions, SectionContainer } from '../../../components';
import { TextList } from '../../../components/lists';
import { parseDate } from '../../../utils';
import { ResultFormData } from '../forms/result/schema';

interface Props {
  result?: ResultFormData;
  teamOptions: ISelectOptions[];
}

export default function ResultConfirmation({ result, teamOptions }: Props) {
  const { t } = useTranslation('results');
  const homeTeam = teamOptions.find(option => option.value === result?.homeTeam)?.label || '';
  const awayTeam = teamOptions.find(option => option.value === result?.awayTeam)?.label || '';

  const listItems = [
    {
      label: (
        <CustomTypography color="data" bold>
          {homeTeam}
        </CustomTypography>
      ),
      value: result?.homeGoals ?? '-',
    },
    {
      label: (
        <CustomTypography color="data" bold>
          {awayTeam}
        </CustomTypography>
      ),
      value: result?.awayGoals ?? '-',
    },
  ];

  return (
    <SectionContainer
      type="success"
      title={parseDate(result?.date)}
      secondaryAction={
        <CustomTypography color="secondary">
          {t('LABELS.ROUND')} {result?.gameWeek}
        </CustomTypography>
      }
    >
      <TextList data={listItems} />
      {result?.isForfeit && (
        <CustomTypography color="error" bold>
          {t('LABELS.FORFEIT')}
        </CustomTypography>
      )}
    </SectionContainer>
  );
}
