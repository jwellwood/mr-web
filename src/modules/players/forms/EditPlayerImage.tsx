import React, { useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { AUTH_ROLES } from '../../../app/constants';
import ImageForm from '../../../components/forms/ImageForm.tsx';
import { Spinner } from '../../../components/loaders';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { PAGES } from '../constants';
import { EDIT_PLAYER_PHOTO, FETCH_PLAYER } from '../graphql';

import RouteGuard from '../../../router/RouteGuard.tsx';
import { removePlayerPhoto, uploadPlayerPhoto } from '../../../services/images/player-images.ts';
import { useUpload } from '../../../hooks/useUpload.ts';
import { PageHeader } from '../../../components';

const EditPlayerPhoto: React.FC = () => {
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

  if (error || editError) {
    return <ErrorGraphql error={(error || editError) as Error} />;
  }

  return (
    <RouteGuard authorization={AUTH_ROLES.TEAM_ADMIN}>
      <PageHeader title={PAGES.EDIT_PLAYER_PHOTO}>
        {!loadingState && imageUrl ? (
          <ImageForm
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            currentUrl={data?.player.image.url}
            onSubmit={onSubmit}
            removeImage={removeImage}
          />
        ) : (
          <Spinner />
        )}
      </PageHeader>
    </RouteGuard>
  );
};

export default EditPlayerPhoto;
