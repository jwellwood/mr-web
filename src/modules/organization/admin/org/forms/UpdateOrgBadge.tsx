import { useMutation, useQuery } from '@apollo/client/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { PageHeader } from '../../../../../components';
import ImageForm from '../../../../../components/forms/image-form/ImageForm';
import { Spinner } from '../../../../../components/loaders';
import { IMAGE_TYPE } from '../../../../../constants';
import { useCustomParams, useUpload } from '../../../../../hooks';
import { removeOrgBadge, uploadOrgBadge } from '../../../../../services/images';
import { AppDispatch, showAlert } from '../../../../../store';
import { PAGES } from '../../../constants';
import { FETCH_ORG } from '../../../graphql';
import { EDIT_ORG_BADGE } from '../graphql';

export default function UpdateOrgBadge() {
  const { orgId } = useCustomParams();
  const dispatch: AppDispatch = useDispatch();
  const {
    data,
    error,
    loading: loadingOrg,
    refetch,
  } = useQuery(FETCH_ORG, {
    variables: { orgId: orgId! },
  });
  const [editOrgBadge, { loading: editLoading }] = useMutation(EDIT_ORG_BADGE, {
    variables: { orgId: orgId! },
    onError: err => {
      console.error(err);
      dispatch(showAlert({ text: err.message, type: 'error' }));
    },
  });
  const { loading, onSubmit, removeImage, imageUrl, setImageUrl } = useUpload({
    uploadFunc: uploadOrgBadge,
    removeFunc: removeOrgBadge,
    graphQLMutation: editOrgBadge,
    refetchFunc: refetch,
    url: data?.org?.badge?.url as string,
    public_id: data?.org?.badge?.public_id,
  });

  useEffect(() => {
    if (data) {
      setImageUrl(data?.org?.badge?.url as string);
    }
  }, [data, setImageUrl]);

  const loadingState = loading || loadingOrg || editLoading;

  const renderContent = () => {
    return imageUrl ? (
      <ImageForm
        loading={loadingState}
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
        onSubmit={onSubmit}
        currentUrl={data?.org?.badge?.url as string}
        removeImage={removeImage}
        error={error}
        fallbackIcon={IMAGE_TYPE.BADGE}
      />
    ) : (
      <Spinner />
    );
  };

  return <PageHeader title={PAGES.EDIT_BADGE}>{renderContent()}</PageHeader>;
}
