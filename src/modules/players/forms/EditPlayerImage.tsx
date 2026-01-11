import { useEffect } from 'react';
import { ApolloError, useMutation, useQuery } from '@apollo/client';
import { AUTH_ROLES } from '../../../constants';
import ImageForm from '../../../components/forms/ImageForm.tsx';
import { Spinner } from '../../../components/loaders';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { PAGES } from '../constants';
import { EDIT_PLAYER_PHOTO, FETCH_PLAYER } from '../graphql';

import RouteGuard from '../../../router/RouteGuard.tsx';
import { removePlayerPhoto, uploadPlayerPhoto } from '../../../services/images/player-images.ts';
import { useUpload } from '../../../hooks/useUpload.ts';
import { DataError, PageHeader } from '../../../components';

export default function EditPlayerPhoto() {
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
    return !loadingState && imageUrl ? (
      <ImageForm
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
        currentUrl={data?.player.image.url}
        onSubmit={onSubmit}
        removeImage={removeImage}
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
