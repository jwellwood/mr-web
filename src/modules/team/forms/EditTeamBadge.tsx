import { useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { FETCH_TEAM, EDIT_TEAM_BADGE } from '../graphql';
import { PAGES } from '../constants';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { AUTH_ROLES } from '../../../constants';
import { removeTeamBadge, uploadTeamBadge } from '../../../services/images';
import { useUpload } from '../../../hooks';
import { PageContainer } from '../../../components';
import EditTeamBadgeView from '../views/EditTeamBadgeView';

export default function EditTeamBadge() {
  const { teamId } = useCustomParams();
  const {
    data,
    error,
    loading: loadingTeam,
    refetch,
  } = useQuery(FETCH_TEAM, {
    variables: { teamId },
    notifyOnNetworkStatusChange: true,
  });
  const [editTeamBadge, { loading: editLoading, error: editError }] = useMutation(EDIT_TEAM_BADGE, {
    variables: { teamId },
  });
  const { loading, onSubmit, removeImage, imageUrl, setImageUrl } = useUpload({
    uploadFunc: uploadTeamBadge,
    removeFunc: removeTeamBadge,
    graphqlFunc: editTeamBadge,
    refetchFunc: refetch,
    url: data?.team?.teamBadge?.url as string,
    public_id: data?.team?.teamBadge?.public_id as string,
  });

  useEffect(() => {
    if (data) {
      setImageUrl(data.team.teamBadge?.url as string);
    }
  }, [data, setImageUrl]);

  const isLoading = loading || loadingTeam || editLoading;

  return (
    <PageContainer auth={AUTH_ROLES.TEAM_ADMIN} title={PAGES.EDIT_BADGE}>
      <EditTeamBadgeView
        onSubmit={onSubmit}
        loading={isLoading}
        error={error || editError}
        imageUrl={imageUrl as string}
        setImageUrl={setImageUrl}
        removeImage={removeImage}
        data={data}
      />
    </PageContainer>
  );
}
