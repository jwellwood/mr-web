import { AUTH_ROLES } from '../../../app/constants';
import { CenteredGrid, GridItem } from '../../../components/grids';
import { CustomTypography, PageHeader } from '../../../components/typography';
import { TeamSearch } from './TeamSearch';
import RouteGuard from '../../../router/RouteGuard.tsx';

function HomeContainer() {
  return (
    <RouteGuard authorization={AUTH_ROLES.PUBLIC}>
      <PageHeader title={''} />
      <CenteredGrid dir="row">
        <GridItem size={12}>
          <CustomTypography size="lg" color="primary">
            Football Stats
          </CustomTypography>
        </GridItem>
        <GridItem size={12}>
          <TeamSearch />
        </GridItem>
      </CenteredGrid>
    </RouteGuard>
  );
}

export default HomeContainer;
