import { useMutation, useQuery } from '@apollo/client/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useCustomParams, useUpload } from '../../../hooks';
import { removePlayerPhoto, uploadPlayerPhoto } from '../../../services/images/player-images';
import { AppDispatch, showAlert } from '../../../store';
import { EDIT_PLAYER_PHOTO, FETCH_PLAYER } from '../graphql';
import EditPlayerPhotoPage from '../pages/EditPlayerPhotoPage';

export default function EditPlayerImage() {
  const dispatch: AppDispatch = useDispatch();
  const { playerId, teamId } = useCustomParams();
  const {
    data,
    error,
    loading: loadingTeam,
    refetch,
  } = useQuery(FETCH_PLAYER, {
    variables: { playerId: playerId! },
  });
  const [editPlayerPhoto, { loading: editLoading, error: editError }] = useMutation(
    EDIT_PLAYER_PHOTO,
    {
      variables: { teamId: teamId!, playerId: playerId! },
      onError: err => dispatch(showAlert({ text: err.message, type: 'error' })),
    }
  );
  const { loading, onSubmit, removeImage, imageUrl, setImageUrl } = useUpload({
    uploadFunc: uploadPlayerPhoto,
    removeFunc: removePlayerPhoto,
    graphQLMutation: editPlayerPhoto,
    refetchFunc: refetch,
    url: data?.player?.image?.url,
    public_id: data?.player?.image?.public_id,
  });

  useEffect(() => {
    if (data) {
      setImageUrl(data?.player.image.url);
    }
  }, [data, setImageUrl]);

  const loadingState = loading || loadingTeam || editLoading;

  return (
    <EditPlayerPhotoPage
      loading={loadingState}
      onSubmit={onSubmit}
      removeImage={removeImage}
      setImageUrl={setImageUrl}
      imageUrl={imageUrl}
      error={error || editError}
    />
  );
}
