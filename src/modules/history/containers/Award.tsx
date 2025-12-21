import { useQuery } from '@apollo/client';

import { FETCH_AWARD } from '../graphql';

import { AUTH_ROLES, LINK_TYPE } from '../../../constants';
import { Spinner } from '../../../components/loaders';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { useAuth } from '../../../hooks';
import { useCustomParams } from '../../../hooks/useCustomParams';
import RouteGuard from '../../../router/RouteGuard';
import { PAGES } from '../constants';
import TextList from '../../../components/lists/TextList';
import { SectionContainer } from '../../../components';
import { CustomTypography } from '../../../components/typography';
import { IListItem } from '../../../components/lists/types';
import { PageHeader } from '../../../components';

export default function Award() {
  const { teamId, awardId } = useCustomParams();
  const { isTeamAuth } = useAuth(teamId);

  const links: IListItem[] = [
    {
      label: 'Edit Award',
      type: LINK_TYPE.EDIT,
      link: 'edit',
    },
  ];

  const { data, loading, error } = useQuery(FETCH_AWARD, {
    variables: { awardId },
  });

  const listData: IListItem[] = data?.award
    ? [
        {
          label: (
            <CustomTypography color="primary" bold>
              {data.award?.winners
                ?.map(winner => (typeof winner === 'string' ? winner : winner.name))
                .join(', ')}
            </CustomTypography>
          ),
          value: data.award.awardValue || '-',
        },
      ]
    : [];

  const renderContent = () =>
    loading ? (
      <Spinner />
    ) : (
      <SectionContainer title={data?.award?.awardName || 'Details'}>
        <TextList data={listData} />
        <CustomTypography color="data">{data?.award?.comment || ''}</CustomTypography>
      </SectionContainer>
    );

  return (
    <RouteGuard authorization={AUTH_ROLES.PUBLIC}>
      <PageHeader title={PAGES.AWARD} links={isTeamAuth ? links : undefined}>
        {error ? <ErrorGraphql error={error} /> : renderContent()}
      </PageHeader>
    </RouteGuard>
  );
}
