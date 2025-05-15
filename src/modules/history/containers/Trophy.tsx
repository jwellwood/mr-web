import React from 'react';
import { useQuery } from '@apollo/client';
import { AUTH_ROLES, LINK_TYPE } from '../../../app/constants';
import { Spinner } from '../../../components/loaders';
import EditLinksModal from '../../../components/modals/EditLinksModal';
import CustomAppBar from '../../../components/navigation/CustomAppBar';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import TrophyDetails from '../components/TrophyDetails';
import { PAGES } from '../constants';
import { GET_TROPHY_BY_ID } from '../graphql/getTrophyById.graphql';
import { useAuth } from '../../../hooks';
import { IListItem } from '../../../types';
import RouteGuard from '../../../router/RouteGuard.tsx';

const Trophy: React.FC = () => {
  const { teamId, trophyId } = useCustomParams();
  const { isTeamAuth } = useAuth('trophy', teamId);

  const links: IListItem[] = [
    {
      label: 'Edit Trophy',
      type: LINK_TYPE.EDIT,
      link: 'edit',
    },
  ];

  const { data, loading, error } = useQuery(GET_TROPHY_BY_ID, {
    variables: { trophyId },
  });

  if (error) {
    return <ErrorGraphql error={error} />;
  }

  return (
    <RouteGuard authorization={AUTH_ROLES.PUBLIC}>
      <CustomAppBar
        title={PAGES.TROPHY}
        actionButton={isTeamAuth && <EditLinksModal data={links} />}
      >
        {!loading ? <TrophyDetails trophy={data?.trophy} /> : <Spinner />}
      </CustomAppBar>
    </RouteGuard>
  );
};

export default Trophy;
