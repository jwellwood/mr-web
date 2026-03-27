import { useMutation, useQuery } from '@apollo/client/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { DataError, PageHeader } from '../../../../components';
import ImageForm from '../../../../components/forms/image-form/ImageForm';
import { Spinner } from '../../../../components/loaders';
import { IMAGE_TYPE } from '../../../../constants';
import { useCustomParams, useUpload } from '../../../../hooks';
import { removePlayerPhoto, uploadPlayerPhoto } from '../../../../services/images/player-images';
import { AppDispatch, showAlert } from '../../../../store';
import { TApolloError } from '../../../../types/apollo';
import { PAGES } from '../../constants';
import { EDIT_PLAYER_PHOTO, FETCH_PLAYER } from '../../graphql';

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
    url: data?.player?.image.url,
    public_id: '', //TODO
  });

  useEffect(() => {
    if (data) {
      setImageUrl(data?.player.image.url);
    }
  }, [data, setImageUrl]);

  const loadingState = loading || loadingTeam || editLoading;

  const renderContent = () => {
    return imageUrl ? (
      <ImageForm
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
        currentUrl={data?.player.image.url}
        onSubmit={onSubmit}
        removeImage={removeImage}
        loading={loadingState}
        error={error}
        fallbackIcon={IMAGE_TYPE.USER}
      />
    ) : (
      <Spinner />
    );
  };

  return (
    <PageHeader title={PAGES.EDIT_PLAYER_PHOTO}>
      {error || editError ? <DataError error={error as TApolloError} /> : renderContent()}
    </PageHeader>
  );
}
