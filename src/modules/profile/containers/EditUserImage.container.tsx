import { useMutation, useQuery } from '@apollo/client';

import { EDIT_PROFILE_IMAGE, FETCH_USER } from '../graphql';

import { AUTH_ROLES } from '../../../app/constants';
import ImageForm from '../../../components/common/ImageForm';
import { Spinner } from '../../../components/loaders';
import ErrorGraphql from '../../../errors/ErrorGraphql';

import RouteGuard from '../../../router/RouteGuard';
import { pages } from '../constants';
import { CustomAppBar } from '../../../components/navigation';
import { removeUserImage, uploadUserImage } from '../../../services/images';
import { useUpload } from '../../../hooks';

export default function EditUserImage() {
  const { data, error, loading: loadingUser, refetch } = useQuery(FETCH_USER);
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

  const renderContent = () =>
    !loadingState && imageUrl ? (
      <ImageForm
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
        onSubmit={onSubmit}
        currentUrl={data?.user?.image?.url}
        removeImage={removeImage}
      />
    ) : (
      <Spinner />
    );

  return (
    <RouteGuard authorization={AUTH_ROLES.USER}>
      <CustomAppBar title={pages.EDIT_USER_IMAGE_PAGE}>
        {error || editError ? (
          <ErrorGraphql error={(error || editError) as Error} />
        ) : (
          renderContent()
        )}
      </CustomAppBar>
    </RouteGuard>
  );
}
