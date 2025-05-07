import React from 'react';
import { AUTH_ROLES } from 'app/constants';
import { CenteredGrid, GridItem } from 'components/grids';
import { CustomTypography, PageHeader } from 'components/typography';
import RouteGuard from 'router/RouteGuard';
import { TeamSearch } from './TeamSearch';

const HomeContainer: React.FC = () => {
  return (
    <RouteGuard authorization={AUTH_ROLES.PUBLIC}>
      <PageHeader title={''} />
      <CenteredGrid dir="row">
        <GridItem xs={12}>
          <CustomTypography size="lg" color="primary">
            Football Stats
          </CustomTypography>
        </GridItem>
        <GridItem xs={12}>
          <TeamSearch />
        </GridItem>
      </CenteredGrid>
    </RouteGuard>
  );
};

export default HomeContainer;
