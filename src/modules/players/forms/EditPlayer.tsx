import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { AUTH_ROLES } from 'app/constants';
import { Spinner } from 'components/loaders';
import { PageHeader } from 'components/typography';
import ErrorGraphql from 'errors/ErrorGraphql';
import { useNationality } from 'hooks';
import { useCustomParams } from 'hooks/useCustomParams';
import { useSeasons } from 'hooks/useSeasons';
import { showAlert } from 'modules/alerts';
import { AppDispatch } from 'reduxStore/rootReducer';
import RouteGuard from 'router/RouteGuard';
import { IPlayer } from 'types';
import { PAGES } from '../constants';
import { GET_PLAYER_BY_ID, UPDATE_PLAYER } from '../graphql';
import PlayerForm from './components/PlayerForm';

const EditPlayer: React.FC = () => {
  const { teamId, playerId } = useCustomParams();

  const { seasonOptions, loading: seasonLoading } = useSeasons();

  const navigate = useNavigate();
  const { loading, error, data, refetch } = useQuery(GET_PLAYER_BY_ID, {
    variables: { playerId },
    notifyOnNetworkStatusChange: true,
  });
  const [updatePlayer, { loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_PLAYER);
  const { nationalityOptions } = useNationality();
  const dispatch: AppDispatch = useDispatch();
  const [defaultValues, setDefaultValues] = useState<Partial<IPlayer>>(null);

  useEffect(() => {
    if (data) {
      const { player } = data;
      setDefaultValues({
        ...(player as Partial<IPlayer>),
        seasonIds: player.seasonIds.map((season) => String(season._id)),
      });
    }
  }, [data]);

  const onSubmit = (formData: Partial<IPlayer>) => {
    try {
      updatePlayer({
        variables: {
          teamId,
          playerId,
          ...formData,
          dateOfBirth: formData.dateOfBirth,
        },
      }).then(() => {
        refetch({ playerId });
        dispatch(showAlert('Player successfully updated', 'success'));
        navigate(-1);
      });
    } catch (error) {
      dispatch(showAlert('Something went wrong', 'error'));
    }
  };

  if (error || updateError)
    return <ErrorGraphql error={[error, updateError]} />;

  return (
    <RouteGuard authorization={AUTH_ROLES.TEAM_ADMIN} teamId={teamId}>
      <PageHeader title={PAGES.EDIT_PLAYER} />
      {!loading && !seasonLoading && !updateLoading && defaultValues ? (
        <PlayerForm
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          countryOptions={nationalityOptions}
          seasonOptions={seasonOptions}
        />
      ) : (
        <Spinner />
      )}
    </RouteGuard>
  );
};

export default EditPlayer;
