import { useQuery } from '@apollo/client';

import { FETCH_ORG_SEASON } from '../graphql';

import { AUTH_ROLES, LINK_TYPE } from '../../../app/constants';
import { Spinner } from '../../../components/loaders';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { useAuth } from '../../../hooks';
import { useCustomParams } from '../../../hooks/useCustomParams';
import RouteGuard from '../../../router/RouteGuard';
import { PAGES } from '../constants';
import { SectionContainer } from '../../../components/containers';
import { CustomTypography } from '../../../components/typography';
import { IListItem } from '../../../components/lists/types';
import { PageHeader } from '../../../components';

export default function OrgSeason() {
  const { orgId, orgSeasonId } = useCustomParams();
  const { isOrgAuth } = useAuth('', orgId);

  const links: IListItem[] = [
    {
      label: 'Edit Season',
      type: LINK_TYPE.EDIT,
      link: 'edit',
    },
  ];

  const { data, loading, error } = useQuery(FETCH_ORG_SEASON, {
    variables: { seasonId: orgSeasonId },
  });

  const renderContent = () =>
    loading ? (
      <Spinner />
    ) : (
      <SectionContainer title={data?.orgSeason?.name || 'Details'}>
        <CustomTypography color="data">{data?.orgSeason?.comment || ''}</CustomTypography>
      </SectionContainer>
    );

  return (
    <RouteGuard authorization={AUTH_ROLES.PUBLIC}>
      <PageHeader title={PAGES.ORG_SEASON} links={isOrgAuth ? links : undefined}>
        {error ? <ErrorGraphql error={error} /> : renderContent()}
      </PageHeader>
    </RouteGuard>
  );
}
