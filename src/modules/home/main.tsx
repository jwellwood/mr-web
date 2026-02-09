import { PageContainer } from '../../components';
import { CenteredGrid, GridItem } from '../../components/grids';
import AppTitle from './components/AppTitle';
import TeamSearch from './forms/TeamSearch';

export default function HomeContainer() {
  return (
    <PageContainer title={''} backButton={false}>
      <CenteredGrid dir="row">
        <AppTitle />
        <GridItem size={12}>
          <TeamSearch />
        </GridItem>
      </CenteredGrid>
    </PageContainer>
  );
}
