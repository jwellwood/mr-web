import { AUTH_ROLES } from '../../../app/constants';
import { CenteredGrid, GridItem } from '../../../components/grids';
import { PageHeader } from '../../../components/typography';
import TeamSearch from './TeamSearch';
import RouteGuard from '../../../router/RouteGuard.tsx';
import AppTitle from '../components/AppTitle.tsx';

export default function HomeContainer() {
  return (
    <RouteGuard authorization={AUTH_ROLES.PUBLIC}>
      <PageHeader title={''} backButton={false} />
      <CenteredGrid dir="row">
        <AppTitle />
        <GridItem size={12}>
          <TeamSearch />
        </GridItem>
      </CenteredGrid>
    </RouteGuard>
  );
}
