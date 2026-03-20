import { CustomTypography, SectionContainer } from '../../components';
import { CustomStack } from '../../components/grids';
import { AppIcon } from '../../components/icons';
import { TextList } from '../../components/lists';

export default function TeamHelp() {
  const listItems = [
    {
      label: 'Stats',
      secondary: (
        <>
          You can use the filter <AppIcon icon="filter" size="20px" color="data" /> to see stats by
          season, competition, teams, etc.
        </>
      ),
    },
    {
      label: 'Tables',
      secondary: <>You can click the top of the table column to sort by that column</>,
    },
  ];

  const orderList = [
    {
      label: 'Season',
      secondary: 'Both players and matches need a season',
    },
    {
      label: 'Players',
      secondary: 'You assign a season(s) when you create a player',
    },
    {
      label: 'Match',
      secondary: 'Matches need a season and players',
    },
  ];
  const adminListItems = [
    {
      label: (
        <CustomStack direction="column" spacing={2}>
          <CustomTypography>
            You must enter the following{' '}
            <CustomTypography bold color="tertiary">
              in order
            </CustomTypography>
            :
          </CustomTypography>
          <TextList data={orderList} />
        </CustomStack>
      ),
    },
  ];

  return (
    <>
      <SectionContainer title="General">
        <TextList data={listItems} />
      </SectionContainer>
      <SectionContainer title="Team Admin" type="admin">
        <TextList data={adminListItems} />
      </SectionContainer>
    </>
  );
}
