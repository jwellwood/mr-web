import React from 'react';
import { useQuery } from '@apollo/client';
import { AUTH_ROLES, LINK_TYPE } from '../../../app/constants';
import { Spinner } from '../../../components/loaders';
import EditLinksModal from '../../../components/modals/EditLinksModal';
import CustomAppBar from '../../../components/navigation/CustomAppBar';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { useAuth } from '../../../hooks';
import { useCustomParams } from '../../../hooks/useCustomParams';
import RouteGuard from '../../../router/RouteGuard';
import { IListItem } from '../../../types';
import { PAGES } from '../constants';
import { AWARD_BY_ID } from '../graphql/award';
import TextList from '../../../components/lists/TextList';
import { SectionContainer } from '../../../components/containers';
import { CustomTypography } from '../../../components/typography';

const Award: React.FC = () => {
  const { teamId, awardId } = useCustomParams();
  const { isTeamAuth } = useAuth(teamId);

  const links: IListItem[] = [
    {
      label: 'Edit Award',
      type: LINK_TYPE.EDIT,
      link: 'edit',
    },
  ];

  const { data, loading, error } = useQuery(AWARD_BY_ID, {
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

  const children = error ? (
    <ErrorGraphql error={error} />
  ) : loading ? (
    <Spinner />
  ) : (
    <SectionContainer title={data?.award?.awardName || 'Details'}>
      <TextList data={listData} />
      <CustomTypography color="data">{data?.award?.comment || ''}</CustomTypography>
    </SectionContainer>
  );

  return (
    <RouteGuard authorization={AUTH_ROLES.PUBLIC}>
      <CustomAppBar
        title={PAGES.AWARD}
        actionButton={isTeamAuth ? <EditLinksModal data={links} /> : null}
      >
        {children}
      </CustomAppBar>
    </RouteGuard>
  );
};

export default Award;
