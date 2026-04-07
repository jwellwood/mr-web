import { useMutation, useQuery } from '@apollo/client/react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { IMAGE_TYPE } from '../../../constants';
import { useCustomParams, useUpload } from '../../../hooks';
import { removeOrgBadge, uploadOrgBadge } from '../../../services/images';
import { AppDispatch, showAlert } from '../../../store';
import { EDIT_ORG_BADGE, FETCH_ORG } from '../graphql';
import UpdateOrgBadgePage from '../pages/UpdateOrgBadgePage';

export default function UpdateOrgBadge() {
  const { t } = useTranslation('organization');
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
      dispatch(showAlert({ text: t('ALERTS.EDIT_BADGE.ERROR'), type: 'error' }));
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

  return (
    <UpdateOrgBadgePage
      loading={loading || loadingOrg || editLoading}
      imageUrl={imageUrl}
      setImageUrl={setImageUrl}
      onSubmit={onSubmit}
      currentUrl={data?.org?.badge?.url as string}
      removeImage={removeImage}
      error={error}
      fallbackIcon={IMAGE_TYPE.BADGE}
    />
  );
}
