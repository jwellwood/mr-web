import { useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { FETCH_TEAM, EDIT_TEAM_BADGE } from '../graphql';
import { PAGES } from '../constants';
import { useCustomParams } from '../../../hooks/useCustomParams';

import ErrorGraphql from '../../../errors/ErrorGraphql';
import RouteGuard from '../../../router/RouteGuard';
import { AUTH_ROLES } from '../../../app/constants';
import { PageHeader } from '../../../components/typography';
import ImageForm from '../../../components/common/ImageForm';
import { Spinner } from '../../../components/loaders';
import { removeTeamBadge, uploadTeamBadge } from '../../../services/images';
import { useUpload } from '../../../hooks';

export default function EditTeamBadge() {
  const { teamId } = useCustomParams();
  const {
    data,
    error,
    loading: loadingTeam,
    refetch,
  } = useQuery(FETCH_TEAM, {
    variables: { teamId },
    notifyOnNetworkStatusChange: true,
  });
  const [editTeamBadge, { loading: editLoading, error: editError }] = useMutation(EDIT_TEAM_BADGE, {
    variables: { teamId },
  });
  const { loading, onSubmit, removeImage, imageUrl, setImageUrl } = useUpload({
    uploadFunc: uploadTeamBadge,
    removeFunc: removeTeamBadge,
    graphqlFunc: editTeamBadge,
    refetchFunc: refetch,
    url: data?.team?.teamBadge?.url as string,
    public_id: data?.team?.teamBadge?.public_id as string,
  });

  useEffect(() => {
    if (data) {
      setImageUrl(data.team.teamBadge?.url as string);
    }
  }, [data, setImageUrl]);

  const loadingState = loading || loadingTeam || editLoading;

  const renderContent = () => {
    return !loadingState && imageUrl ? (
      <ImageForm
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
        onSubmit={onSubmit}
        currentUrl={data?.team.teamBadge?.url as string}
        removeImage={removeImage}
      />
    ) : (
      <Spinner />
    );
  };

  return (
    <RouteGuard authorization={AUTH_ROLES.TEAM_ADMIN}>
      <PageHeader title={PAGES.EDIT_BADGE} />
      {error || editError ? (
        <ErrorGraphql error={(error || editError) as Error} />
      ) : (
        renderContent()
      )}
    </RouteGuard>
  );
}
