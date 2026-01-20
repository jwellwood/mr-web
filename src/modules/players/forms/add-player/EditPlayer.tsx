import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { PAGES } from '../../constants';
import { FETCH_PLAYER, EDIT_PLAYER } from '../../graphql';
import { useCustomParams, useSeasons, useNationality } from '../../../../hooks';
import { AppDispatch, showAlert } from '../../../../store';
import RouteGuard from '../../../../router/RouteGuard';
import { AUTH_ROLES } from '../../../../constants';
import { Spinner } from '../../../../components/loaders';
import { mapPlayerForm } from '../../helpers/mapPlayerForm';
import { PageHeader } from '../../../../components';
import { ISeasonID } from '../../types';
import type { PlayerFormData } from './validation';
import PlayerForm from './PlayerForm';

export default function EditPlayer() {
  const { teamId, playerId } = useCustomParams();
  const { seasonOptions, loading: seasonLoading } = useSeasons();

  const navigate = useNavigate();
  const { loading, error, data, refetch } = useQuery(FETCH_PLAYER, {
    variables: { playerId },
    notifyOnNetworkStatusChange: true,
  });
  const [updatePlayer, { loading: updateLoading, error: updateError }] = useMutation(EDIT_PLAYER);
  const { nationalityOptions } = useNationality();
  const dispatch: AppDispatch = useDispatch();
  const [defaultValues, setDefaultValues] = useState<PlayerFormData | null>(null);

  useEffect(() => {
    if (data) {
      const { player } = data;

      setDefaultValues({
        ...player,
        dateOfBirth: new Date(player.dateOfBirth),
        yearJoined: new Date(player.yearJoined),
        seasonIds: player?.seasonIds?.map((season: ISeasonID) => season._id) || [],
      });
    }
  }, [data]);

  const onSubmit = (formData: PlayerFormData) => {
    try {
      updatePlayer({
        variables: {
          teamId,
          playerId,
          ...mapPlayerForm(formData),
        },
      }).then(() => {
        refetch({ playerId });
        dispatch(
          showAlert({
            text: 'Player updated',
            type: 'success',
          })
        );
        navigate(-1);
      });
    } catch (error) {
      console.error("Couldn't update player: ", error);
      dispatch(
        showAlert({
          text: "Couldn't update player",
          type: 'error',
        })
      );
    }
  };
  const isLoading = loading || seasonLoading || updateLoading;
  const renderContent = () => {
    return defaultValues ? (
      <PlayerForm
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        countryOptions={nationalityOptions}
        seasonOptions={seasonOptions}
        loading={isLoading}
        error={error || updateError}
      />
    ) : (
      <Spinner />
    );
  };

  return (
    <RouteGuard authorization={AUTH_ROLES.TEAM_ADMIN}>
      <PageHeader title={PAGES.EDIT_PLAYER}>{renderContent()}</PageHeader>
    </RouteGuard>
  );
}
