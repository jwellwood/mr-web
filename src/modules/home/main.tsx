import { PageContainer } from '../../components';
import CustomStack from '../../components/grids/custom-stack/CustomStack';
import AppTitle from './components/AppTitle';
import TeamSearch from './forms/TeamSearch';
import { HOME_HELP } from './help';

export default function HomeContainer() {
  return (
    <PageContainer title={''} backButton={false} help={HOME_HELP}>
      <CustomStack>
        <AppTitle />
        <TeamSearch />
      </CustomStack>
    </PageContainer>
  );
}
