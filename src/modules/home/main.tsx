import { PageContainer } from '../../components';
import CustomStack from '../../components/grids/custom-stack/CustomStack';
import AppTitle from './components/AppTitle';
import TeamSearch from './forms/TeamSearch';

export default function HomeContainer() {
  return (
    <PageContainer title={''} backButton={false}>
      <CustomStack>
        <AppTitle />
        <TeamSearch />
      </CustomStack>
    </PageContainer>
  );
}
