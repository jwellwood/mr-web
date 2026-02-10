import { useMutation, useQuery } from '@apollo/client/react';
import { useEffect } from 'react';
import { PageContainer } from '../../../../components';
import { useUpload, useCustomParams } from '../../../../hooks';
import { removeTeamBadge, uploadTeamBadge } from '../../../../services/images';
import { PAGES } from '../../constants';
import { FETCH_TEAM, EDIT_TEAM_BADGE } from '../../graphql';
import EditTeamBadgeView from './EditTeamBadgeView';

export default function EditTeamBadge() {
  const { teamId } = useCustomParams();
  const {
    data,
    error,
    loading: loadingTeam,
    refetch,
  } = useQuery(FETCH_TEAM, {
    variables: { teamId: teamId! },
  });
  const [editTeamBadge, { loading: editLoading, error: editError }] = useMutation(EDIT_TEAM_BADGE, {
    variables: { teamId: teamId!, public_id: '', url: '' }, // TODO
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
    <PageContainer title={PAGES.EDIT_BADGE}>
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
