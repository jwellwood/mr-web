import { SectionContainer } from '../../../components/containers';
import { TextList } from '../../../components/lists';

export default function OrgHelp() {
  const listItems = [
    {
      label: 'Fixtures',
      secondary: 'Games that are scheduled to be played',
    },
    {
      label: 'Results',
      secondary: 'Games that have already been played',
    },
    {
      label: 'Tables',
      secondary: 'Standings and rankings of teams for each competition',
    },
    {
      label: 'Teams',
      secondary:
        "Information about the teams participating in each competition. The colors show the team's home and away colors",
    },
    {
      label: 'History',
      secondary: 'Shows results and tables from previous seasons',
    },
  ];
  const adminItems = [
    {
      label: 'Submitting a result',
      secondary: 'Click on the match enter the scores and submit the result',
    },
    {
      label: 'Confirming a result',
      secondary:
        'Once a result has been submitted, you can click on the match and confirm the result. This will make the result official and update the tables',
    },
    {
      label: 'Disputing a result',
      secondary:
        'If there is a dispute about a result, you can click on the match and submit a dispute. This will notify the admin to review the result',
    },
  ];

  return (
    <SectionContainer>
      <SectionContainer title="General">
        <TextList data={listItems} />
      </SectionContainer>
      <SectionContainer title="Team Admin" type="admin">
        <TextList data={adminItems} />
      </SectionContainer>
    </SectionContainer>
  );
}
