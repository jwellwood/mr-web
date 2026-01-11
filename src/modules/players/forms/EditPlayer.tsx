import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ApolloError, useMutation, useQuery } from '@apollo/client';

import { PAGES } from '../constants';
import { FETCH_PLAYER, EDIT_PLAYER } from '../graphql';
import PlayerForm from './components/PlayerForm';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { useSeasons } from '../../../hooks/useSeasons';
import { useNationality } from '../../../hooks';
import { AppDispatch } from '../../../store/store';
import { showAlert } from '../../../store/features/alerts/alertsSlice.ts';
import RouteGuard from '../../../router/RouteGuard.tsx';
import { AUTH_ROLES } from '../../../constants';
import { Spinner } from '../../../components/loaders';
import { mapPlayerForm } from '../helpers/mapPlayerForm.ts';
import { IPlayer, ISeasonID } from '../types.ts';
import { DataError, PageHeader } from '../../../components';

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

  const renderContent = () => {
    return !loading && !seasonLoading && !updateLoading && defaultValues ? (
      <PlayerForm
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        countryOptions={nationalityOptions}
        seasonOptions={seasonOptions}
      />
    ) : (
      <Spinner />
    );
  };

  return (
    <RouteGuard authorization={AUTH_ROLES.TEAM_ADMIN}>
      <PageHeader title={PAGES.EDIT_PLAYER}>
        {error || updateError ? (
          <DataError error={(error || updateError) as ApolloError} />
        ) : (
          renderContent()
        )}
      </PageHeader>
    </RouteGuard>
  );
}
