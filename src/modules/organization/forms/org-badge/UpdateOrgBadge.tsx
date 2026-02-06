import { useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { EDIT_ORG_BADGE, FETCH_ORG } from '../../graphql';
import ImageForm from '../../../../components/forms/ImageForm';
import { Spinner } from '../../../../components/loaders';
import { useCustomParams, useUpload } from '../../../../hooks';
import { PAGES } from '../../constants';
import { removeOrgBadge, uploadOrgBadge } from '../../../../services/images';
import { PageHeader } from '../../../../components';

export default function UpdateOrgBadge() {
  const { orgId } = useCustomParams();
  const {
    data,
    error,
    loading: loadingOrg,
    refetch,
  } = useQuery(FETCH_ORG, {
    variables: { orgId },
    notifyOnNetworkStatusChange: true,
  });
  const [editOrgBadge, { loading: editLoading, error: editError }] = useMutation(EDIT_ORG_BADGE, {
    variables: { orgId: orgId },
  });
  const { loading, onSubmit, removeImage, imageUrl, setImageUrl } = useUpload({
    uploadFunc: uploadOrgBadge,
    removeFunc: removeOrgBadge,
    graphqlFunc: editOrgBadge,
    refetchFunc: refetch,
    url: data?.org?.badge.url,
    public_id: data?.org?.badge?.public_id,
  });

  useEffect(() => {
    if (data) {
      setImageUrl(data.org.badge.url);
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
        currentUrl={data?.org?.badge?.url}
        removeImage={removeImage}
        error={error || editError}
      />
    ) : (
      <Spinner />
    );
  };

  return <PageHeader title={PAGES.EDIT_BADGE}>{renderContent()}</PageHeader>;
}
