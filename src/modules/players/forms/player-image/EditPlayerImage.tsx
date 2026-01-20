import { useEffect } from 'react';
import { ApolloError, useMutation, useQuery } from '@apollo/client';

import { EDIT_PLAYER_PHOTO, FETCH_PLAYER } from '../../graphql';
import { AUTH_ROLES } from '../../../../constants';
import ImageForm from '../../../../components/forms/ImageForm';
import { Spinner } from '../../../../components/loaders';
import { useCustomParams, useUpload } from '../../../../hooks';
import { PAGES } from '../../constants';
import RouteGuard from '../../../../router/RouteGuard';
import { removePlayerPhoto, uploadPlayerPhoto } from '../../../../services/images/player-images';
import { DataError, PageHeader } from '../../../../components';

export default function EditPlayerImage() {
  const { teamId, playerId } = useCustomParams();
  const {
    data,
    error,
    loading: loadingTeam,
    refetch,
  } = useQuery(FETCH_PLAYER, {
    variables: { playerId: playerId },
    notifyOnNetworkStatusChange: true,
  });
  const [editPlayerPhoto, { loading: editLoading, error: editError }] = useMutation(
    EDIT_PLAYER_PHOTO,
    { variables: { teamId, playerId } }
  );
  const { loading, onSubmit, removeImage, imageUrl, setImageUrl } = useUpload({
    uploadFunc: uploadPlayerPhoto,
    removeFunc: removePlayerPhoto,
    graphqlFunc: editPlayerPhoto,
    refetchFunc: refetch,
    url: data?.player?.image.url,
    public_id: data?.player?.image?.public_id,
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
    <RouteGuard authorization={AUTH_ROLES.TEAM_ADMIN}>
      <PageHeader title={PAGES.EDIT_PLAYER_PHOTO}>
        {error || editError ? (
          <DataError error={(error || editError) as ApolloError} />
        ) : (
          renderContent()
        )}
      </PageHeader>
    </RouteGuard>
  );
}
