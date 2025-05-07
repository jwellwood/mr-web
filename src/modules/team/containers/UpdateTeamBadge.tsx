import React, { useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { AUTH_ROLES } from 'app/constants';
import ImageForm from 'components/common/ImageForm';
import { Spinner } from 'components/loaders';
import { PageHeader } from 'components/typography';
import ErrorGraphql from 'errors/ErrorGraphql';
import { useCustomParams } from 'hooks/useCustomParams';
import { useUpload } from 'modules/images/hooks';
import { uploadTeamBadge, removeTeamBadge } from 'modules/images/services';
import RouteGuard from 'router/RouteGuard';
import { PAGES } from '../constants';
import { GET_TEAM, EDIT_TEAM_BADGE } from '../graphql';

const UpdateTeamBadge: React.FC = () => {
  const { teamId } = useCustomParams();
  const {
    data,
    error,
    loading: loadingTeam,
    refetch,
  } = useQuery(GET_TEAM, {
    variables: { teamId },
    notifyOnNetworkStatusChange: true,
  });
  const [editTeamBadge, { loading: editLoading, error: editError }] =
    useMutation(EDIT_TEAM_BADGE, { variables: { teamId } });
  const { loading, onSubmit, removeImage, imageUrl, setImageUrl } = useUpload({
    uploadFunc: uploadTeamBadge,
    removeFunc: removeTeamBadge,
    graphqlFunc: editTeamBadge,
    refetchFunc: refetch,
    url: data?.team?.teamBadge.url,
    public_id: data?.team?.teamBadge?.public_id,
  });

  useEffect(() => {
    if (data) {
      setImageUrl(data.team.teamBadge.url);
    }
  }, [data, setImageUrl]);

  const loadingState = loading || loadingTeam || editLoading;

  if (error || editError) {
    return <ErrorGraphql error={[error, editError]} />;
  }

  return (
    <RouteGuard authorization={AUTH_ROLES.TEAM_ADMIN} teamId={teamId}>
      <PageHeader title={PAGES.EDIT_BADGE} />
      {!loadingState && imageUrl ? (
        <ImageForm
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          onSubmit={onSubmit}
          currentUrl={data.team.teamBadge.url}
          removeImage={removeImage}
        />
      ) : (
        <Spinner />
      )}
    </RouteGuard>
  );
};

export default UpdateTeamBadge;
