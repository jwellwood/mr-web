import { useMutation, useQuery } from '@apollo/client/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useUpload, useCustomParams } from '../../../hooks';
import { removeTeamBadge, uploadTeamBadge } from '../../../services/images';
import { AppDispatch, showAlert } from '../../../store';
import { FETCH_TEAM, EDIT_TEAM_BADGE } from '../graphql';
import EditTeamBadgePage from '../pages/EditTeamBadgePage';

export default function EditTeamBadge() {
  const dispatch: AppDispatch = useDispatch();
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
    variables: { teamId: teamId! },
    onError: err => dispatch(showAlert({ text: err.message, type: 'error' })),
  });
  const { loading, onSubmit, removeImage, imageUrl, setImageUrl } = useUpload({
    uploadFunc: uploadTeamBadge,
    removeFunc: removeTeamBadge,
    graphQLMutation: editTeamBadge,
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
    <EditTeamBadgePage
      loading={isLoading}
      data={data}
      onSubmit={onSubmit}
      removeImage={removeImage}
      setImageUrl={setImageUrl}
      imageUrl={imageUrl}
      error={error || editError}
    />
  );
}
