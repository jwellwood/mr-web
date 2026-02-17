import { SectionContainer } from '../../../../components';
import { TextList, type IListItem } from '../../../../components/lists';
import { CustomTypography } from '../../../../components/typography';
import { T_FETCH_COMPETITION } from '../graphql';

interface Props {
  competition?: T_FETCH_COMPETITION['competition'];
}

export default function CompetitionDetails({ competition }: Props) {
  if (!competition) {
    return (
      <CustomTypography size="md" color="label">
        No competition data available
      </CustomTypography>
    );
  }
  const data: IListItem[] = [
    {
      label: 'Name',
      value: competition?.name,
    },
    {
      label: 'Type',
      value: competition?.competitionType,
    },
    {
      label: 'Currently Active',
      value: competition?.isActive ? 'Yes' : 'No',
    },
    {
      label: 'Players / Team',
      value: competition?.playersPerTeam || '-',
    },
    {
      label: 'Match Length (minutes)',
      value: competition?.matchMinutes || '-',
    },
  ];

  return (
    <SectionContainer title="Summary">
      <TextList data={data} />
    </SectionContainer>
  );
}
