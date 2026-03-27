import { CustomTypography, ISelectOptions, SectionContainer } from '../../../../components';
import { TextList } from '../../../../components/lists';
import { parseDate } from '../../../../utils';
import { ResultFormData } from './validation';

interface Props {
  result?: ResultFormData;
  teamOptions: ISelectOptions[];
}

export default function ResultConfirmation({ result, teamOptions }: Props) {
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
        <CustomTypography color="secondary">Round {result?.gameWeek}</CustomTypography>
      }
    >
      <TextList data={listItems} />
      {result?.isForfeit && (
        <CustomTypography color="error" bold>
          FORFEIT
        </CustomTypography>
      )}
    </SectionContainer>
  );
}
