import React, { useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { AUTH_ROLES } from 'app/constants';
import ImageForm from 'components/common/ImageForm';
import { Spinner } from 'components/loaders';
import { PageHeader } from 'components/typography';
import ErrorGraphql from 'errors/ErrorGraphql';
import { useCustomParams } from 'hooks/useCustomParams';
import { useUpload } from 'modules/images/hooks';
import { uploadOrgBadge, removeOrgBadge } from 'modules/images/services';
import RouteGuard from 'router/RouteGuard';
import { PAGES } from '../constants';
import { EDIT_ORG_BADGE, GET_ORG } from '../graphql';

const UpdateOrgBadge: React.FC = () => {
  const { orgId } = useCustomParams();
  const {
    data,
    error,
    loading: loadingOrg,
    refetch,
  } = useQuery(GET_ORG, {
    variables: { orgId },
    notifyOnNetworkStatusChange: true,
  });
  const [editOrgBadge, { loading: editLoading, error: editError }] =
    useMutation(EDIT_ORG_BADGE, { variables: { orgId: orgId } });
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

  if (error || editError) {
    return <ErrorGraphql error={[error, editError]} />;
  }

  return (
    <RouteGuard authorization={AUTH_ROLES.ORG_ADMIN} orgId={orgId}>
      <PageHeader title={PAGES.EDIT_BADGE} />
      {!loadingState && imageUrl ? (
        <ImageForm
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          onSubmit={onSubmit}
          currentUrl={data.org.badge.url}
          removeImage={removeImage}
        />
      ) : (
        <Spinner />
      )}
    </RouteGuard>
  );
};

export default UpdateOrgBadge;
