import { AUTH_ROLES } from '../../constants';
import { CenteredGrid, GridItem } from '../../components/grids';
import { PageContainer } from '../../components';
import AppTitle from './components/AppTitle';
import TeamSearch from './forms/TeamSearch';

export default function HomeContainer() {
  return (
    <PageContainer title={''} auth={AUTH_ROLES.PUBLIC} backButton={false}>
      <CenteredGrid dir="row">
        <AppTitle />
        <GridItem size={12}>
          <TeamSearch />
        </GridItem>
      </CenteredGrid>
    </PageContainer>
  );
}
