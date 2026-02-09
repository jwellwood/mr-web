import { ApolloError, useMutation, useQuery } from '@apollo/client';
import { DataError, PageContainer } from '../../../../components';
import ImageForm from '../../../../components/forms/ImageForm';
import { Spinner } from '../../../../components/loaders';
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
    graphqlFunc: editProfileImage,
    refetchFunc: refetch,
    url: data?.user?.image.url,
    public_id: data?.user?.image?.public_id,
  });

  const loadingState = loading || loadingUser || editLoading;

  const renderContent = () =>
    imageUrl ? (
      <ImageForm
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
        onSubmit={onSubmit}
        currentUrl={data?.user?.image?.url}
        removeImage={removeImage}
        loading={loadingState}
      />
    ) : (
      <Spinner />
    );

  return (
    <PageContainer title={PAGES.EDIT_USER_IMAGE_PAGE}>
      {error || editError ? (
        <DataError error={(error || editError) as ApolloError} />
      ) : (
        renderContent()
      )}
    </PageContainer>
  );
}
