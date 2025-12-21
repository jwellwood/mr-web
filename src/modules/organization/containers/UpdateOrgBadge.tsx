import { useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { EDIT_ORG_BADGE, FETCH_ORG } from '../graphql';

import { AUTH_ROLES } from '../../../constants';
import ImageForm from '../../../components/forms/ImageForm.tsx';
import { Spinner } from '../../../components/loaders';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { PAGES } from '../constants';
import { removeOrgBadge, uploadOrgBadge } from '../../../services/images';

import RouteGuard from '../../../router/RouteGuard.tsx';
import { useUpload } from '../../../hooks/useUpload.ts';
import { PageHeader } from '../../../components';

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

  if (error || editError) {
    return <ErrorGraphql error={(error || editError) as Error} />;
  }

  const renderContent = () => {
    return !loadingState && imageUrl ? (
      <ImageForm
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
        onSubmit={onSubmit}
        currentUrl={data?.org?.badge?.url}
        removeImage={removeImage}
      />
    ) : (
      <Spinner />
    );
  };

  return (
    <RouteGuard authorization={AUTH_ROLES.ORG_ADMIN}>
      <PageHeader title={PAGES.EDIT_BADGE}>
        {error || editError ? (
          <ErrorGraphql error={(error || editError) as unknown as Error} />
        ) : (
          renderContent()
        )}
      </PageHeader>
    </RouteGuard>
  );
}
