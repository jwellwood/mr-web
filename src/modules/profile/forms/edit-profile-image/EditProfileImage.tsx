import { useMutation, useQuery } from '@apollo/client/react';
import { PageContainer } from '../../../../components';
import ImageForm from '../../../../components/forms/image-form/ImageForm';
import { IMAGE_TYPE } from '../../../../constants';
import { useUpload } from '../../../../hooks';
import { removeUserImage, uploadUserImage } from '../../../../services/images';
import { PAGES } from '../../constants';
import { EDIT_PROFILE_IMAGE, FETCH_USER } from '../../graphql';

export default function EditUserImage() {
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
    <PageContainer title={PAGES.EDIT_USER_IMAGE_PAGE}>
      <ImageForm
        imageUrl={imageUrl || 'default'}
        setImageUrl={setImageUrl}
        onSubmit={onSubmit}
        currentUrl={data?.user?.image?.url}
        removeImage={removeImage}
        error={error || editError}
        loading={loadingState}
        fallbackIcon={IMAGE_TYPE.USER}
      />
    </PageContainer>
  );
}
