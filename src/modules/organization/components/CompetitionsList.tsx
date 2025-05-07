import React from 'react';
import { SectionContainer } from 'components/containers';
import LinksList from 'components/lists/LinksList';
import { ICompetition, IListItem } from 'types';

type Props = {
  competitions: ICompetition[];
};

const CompetitionsList: React.FC<Props> = ({ competitions }) => {
  const data: IListItem[] = competitions.map((comp) => {
    return {
      label: comp.name,
      value: comp.competitionType,
      link: `competition/${comp._id}`,
    };
  });

  return (
    <SectionContainer title="Competitions">
      <LinksList links={data} />
    </SectionContainer>
  );
};

export default CompetitionsList;
