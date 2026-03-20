import { CustomButton, PageContainer } from '../../components';
import CustomStack from '../../components/grids/custom-stack/CustomStack';
import AppTitle from './components/AppTitle';
import OrgSearch from './forms/OrgSearch';
import TeamSearch from './forms/TeamSearch';

export default function HomeContainer() {
  const buttonElement = (type: 'team' | 'org') => (
    <CustomButton variant={type === 'team' ? 'contained' : 'outlined'} color="primary">
      {type === 'team' ? 'Search Teams' : 'Search Leagues'}
    </CustomButton>
  );

  return (
    <PageContainer title={''} backButton={false}>
      <CustomStack>
        <AppTitle />
        <TeamSearch buttonElement={buttonElement('team')} />
        <OrgSearch buttonElement={buttonElement('org')} />
      </CustomStack>
    </PageContainer>
  );
}
