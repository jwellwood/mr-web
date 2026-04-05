import { useMutation, useQuery } from '@apollo/client/react';
import { useUpload } from '../../../hooks';
import { removeUserImage, uploadUserImage } from '../../../services/images';
import { EDIT_PROFILE_IMAGE, FETCH_USER } from '../graphql';
import EditProfileImagePage from '../pages/EditProfileImagePage';

export default function EditProfileImage() {
  const { data, error, loading: loadingUser, refetch } = useQuery(FETCH_USER);
  const [editProfileImage, { loading: editLoading, error: editError }] =
    useMutation(EDIT_PROFILE_IMAGE);

  const { loading, onSubmit, removeImage, imageUrl, setImageUrl } = useUpload({
    uploadFunc: uploadUserImage,
    removeFunc: removeUserImage,
    graphQLMutation: editProfileImage,
    refetchFunc: refetch,
    url: data?.user?.image.url,
    public_id: data?.user?.image?.public_id,
  });

  const loadingState = loading || loadingUser || editLoading;

  return (
    <EditProfileImagePage
      imageUrl={imageUrl}
      setImageUrl={setImageUrl}
      onSubmit={onSubmit}
      currentUrl={data?.user?.image?.url}
      removeImage={removeImage}
      error={error || editError}
      loading={loadingState}
    />
  );
}
