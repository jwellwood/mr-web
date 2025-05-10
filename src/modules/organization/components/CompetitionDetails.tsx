import React from 'react';
import { DataContainer, SectionContainer } from '../../../components/containers';
import TextList from '../../../components/lists/TextList';
import { ICompetition, IListItem } from '../../../types';
interface Props {
  competition: ICompetition;
}

const CompetitionDetails: React.FC<Props> = ({ competition }) => {
  const data: IListItem[] = [
    {
      label: 'Name',
      value: competition.name,
    },
    {
      label: 'Type',
      value: competition.competitionType,
    },

    {
      label: 'Currently Active',
      value: competition.isActive ? 'Yes' : 'No',
    },
  ];

  const numbersData = [
    {
      label: 'Players / Team',
      value: competition.playersPerTeam,
    },
    {
      label: 'Match Length',
      value: competition.matchMinutes,
    },
    {
      label: 'Teams',
      value: competition.numberOfTeams,
    },
  ];

  return (
    <SectionContainer title="Summary">
      <TextList data={data} />
      <DataContainer data={numbersData} />
    </SectionContainer>
  );
};

export default CompetitionDetails;
