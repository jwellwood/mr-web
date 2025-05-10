import React, { useEffect } from 'react';
import {ApolloError, useMutation, useQuery} from '@apollo/client';

import { PAGES } from '../constants';
import { GET_TEAM, EDIT_TEAM_BADGE } from '../graphql';
import {useCustomParams} from "../../../hooks/useCustomParams";
import {useUpload} from "../../../modules/images/hooks";
import {removeTeamBadge, uploadTeamBadge} from "../../../modules/images/services";
import ErrorGraphql from "../../../errors/ErrorGraphql";
import RouteGuard from "../../../router/RouteGuard";
import {AUTH_ROLES} from "../../../app/constants";
import {PageHeader} from "../../../components/typography";
import ImageForm from "../../../components/common/ImageForm";
import {Spinner} from "../../../components/loaders";

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
    url: data?.team?.teamBadge?.url as string,
    public_id: data?.team?.teamBadge?.public_id as string,
  });

  useEffect(() => {
    if (data) {
      setImageUrl(data.team.teamBadge?.url as string);
    }
  }, [data, setImageUrl]);

  const loadingState = loading || loadingTeam || editLoading;

  if (error || editError) {
    return <ErrorGraphql error={(error || editError) as ApolloError} />;
  }

  return (
    <RouteGuard authorization={AUTH_ROLES.TEAM_ADMIN} >
      <PageHeader title={PAGES.EDIT_BADGE} />
      {!loadingState && imageUrl ? (
        <ImageForm
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          onSubmit={onSubmit}
          currentUrl={data?.team.teamBadge?.url as string}
          removeImage={removeImage}
        />
      ) : (
        <Spinner />
      )}
    </RouteGuard>
  );
};

export default UpdateTeamBadge;
