import { useMutation, useQuery } from '@apollo/client/react';
import { useEffect } from 'react';
import { DataError, PageHeader } from '../../../../components';
import ImageForm from '../../../../components/forms/ImageForm';
import { Spinner } from '../../../../components/loaders';
import { useCustomParams, useUpload } from '../../../../hooks';
import { removePlayerPhoto, uploadPlayerPhoto } from '../../../../services/images/player-images';
import { TApolloError } from '../../../../types/apollo';
import { PAGES } from '../../constants';
import { EDIT_PLAYER_PHOTO, FETCH_PLAYER } from '../../graphql';

export default function EditPlayerImage() {
  const { teamId, playerId } = useCustomParams();
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
    { variables: { teamId: teamId!, playerId: playerId!, public_id: '', url: '' } } // TODO
  );
  const { loading, onSubmit, removeImage, imageUrl, setImageUrl } = useUpload({
    uploadFunc: uploadPlayerPhoto,
    removeFunc: removePlayerPhoto,
    graphqlFunc: editPlayerPhoto,
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
      />
    ) : (
      <Spinner />
    );
  };

  return (
    <PageHeader title={PAGES.EDIT_PLAYER_PHOTO}>
      {error || editError ? (
        <DataError error={(error || editError) as TApolloError} />
      ) : (
        renderContent()
      )}
    </PageHeader>
  );
}
