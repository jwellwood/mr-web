import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { AUTH_ROLES } from 'app/constants';
import ImageForm from 'components/common/ImageForm';
import { Spinner } from 'components/loaders';
import { PageHeader } from 'components/typography';
import ErrorGraphql from 'errors/ErrorGraphql';
import { useUpload } from 'modules/images/hooks';
import { removeUserImage, uploadUserImage } from 'modules/images/services';
import RouteGuard from 'router/RouteGuard';
import { pages } from '../constants';
import { EDIT_PROFILE_IMAGE, GET_USER } from '../graphql';

const EditUserImage: React.FC = () => {
  const { data, error, loading: loadingUser, refetch } = useQuery(GET_USER);
  const [editProfileImage, { loading: editLoading, error: editError }] =
    useMutation(EDIT_PROFILE_IMAGE);
  const { loading, onSubmit, removeImage, imageUrl, setImageUrl } = useUpload({
    uploadFunc: uploadUserImage,
    removeFunc: removeUserImage,
    graphqlFunc: editProfileImage,
    refetchFunc: refetch,
    url: data?.user?.image.url,
    public_id: data?.user?.image?.public_id,
  });

  const loadingState = loading || loadingUser || editLoading;

  if (error || editError) {
    return <ErrorGraphql error={[error, editError]} />;
  }

  return (
    <RouteGuard authorization={AUTH_ROLES.USER}>
      <PageHeader title={pages.EDIT_USER_IMAGE_PAGE} />
      {!loadingState && imageUrl ? (
        <ImageForm
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          onSubmit={onSubmit}
          currentUrl={data.user.image.url}
          removeImage={removeImage}
        />
      ) : (
        <Spinner />
      )}
    </RouteGuard>
  );
};

export default EditUserImage;
