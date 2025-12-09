import { DataContainer, SectionContainer } from '../../../components';
import TextList from '../../../components/lists/TextList';
import { IListItem } from '../../../components/lists/types';
import { CustomTypography } from '../../../components/typography';
import { ICompetition } from '../types';

interface Props {
  competition: ICompetition | null;
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
  ];

  const numbersData = [
    {
      label: 'Players / Team',
      value: competition?.playersPerTeam,
    },
    {
      label: 'Match Length',
      value: competition?.matchMinutes,
    },
    {
      label: 'Teams',
      value: competition?.numberOfTeams,
    },
  ];

  return (
    <SectionContainer title="Summary">
      <TextList data={data} />
      <DataContainer data={numbersData} />
    </SectionContainer>
  );
}
