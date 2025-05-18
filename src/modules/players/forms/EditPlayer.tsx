import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ApolloError, useMutation, useQuery } from '@apollo/client';
import { PAGES } from '../constants';
import { GET_PLAYER_BY_ID, UPDATE_PLAYER } from '../graphql';
import PlayerForm from './components/PlayerForm';
import { IPlayer, ISeasonID } from '../../../types';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { useSeasons } from '../../../hooks/useSeasons';
import { useNationality } from '../../../hooks';
import { AppDispatch } from '../../../store/store';
import { showAlert } from '../../../store/features/alerts/alertsSlice.ts';
import RouteGuard from '../../../router/RouteGuard.tsx';
import { AuthRoles } from '../../../constants.ts';
import ErrorGraphql from '../../../errors/ErrorGraphql.tsx';
import { PageHeader } from '../../../components/typography';
import { Spinner } from '../../../components/loaders';
import { mapPlayerForm } from '../helpers/mapPlayerForm.ts';

const EditPlayer: React.FC = () => {
  const { teamId, playerId } = useCustomParams();

  const { seasonOptions, loading: seasonLoading } = useSeasons();

  const navigate = useNavigate();
  const { loading, error, data, refetch } = useQuery(GET_PLAYER_BY_ID, {
    variables: { playerId },
    notifyOnNetworkStatusChange: true,
  });
  const [updatePlayer, { loading: updateLoading, error: updateError }] = useMutation(UPDATE_PLAYER);
  const { nationalityOptions } = useNationality();
  const dispatch: AppDispatch = useDispatch();
  const [defaultValues, setDefaultValues] = useState<Partial<IPlayer | null>>(null);

  useEffect(() => {
    if (data) {
      const { player } = data;
      const mapSeasonIds = player?.seasonIds?.map(season => season._id);
      setDefaultValues({ ...player, seasonIds: mapSeasonIds as unknown as ISeasonID[] });
    }
  }, [data]);

  const onSubmit = (formData: Partial<IPlayer>) => {
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

  if (error || updateError) {
    return <ErrorGraphql error={(error || updateError) as ApolloError} />;
  }
  return (
    <RouteGuard authorization={AuthRoles.TEAM_ADMIN}>
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
