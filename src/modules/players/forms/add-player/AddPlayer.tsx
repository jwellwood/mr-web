import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { FETCH_SQUAD_LIST_BY_SEASON } from '../../../squad/graphql';
import { PAGES } from '../../constants';
import { ADD_PLAYER } from '../../graphql';
import { useCustomParams, useNationality, useSeasons } from '../../../../hooks';
import { AppDispatch, showAlert } from '../../../../store';
import RouteGuard from '../../../../router/RouteGuard';
import { AUTH_ROLES } from '../../../../constants';
import { Spinner } from '../../../../components/loaders';
import { mapPlayerForm } from '../../helpers/mapPlayerForm';
import { PageHeader } from '../../../../components';
import { initialPlayerState } from './state';
import type { PlayerFormData } from './validation';
import PlayerForm from './PlayerForm';

export default function AddPlayer() {
  const { teamId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { nationalityOptions } = useNationality();
  const { seasonOptions, seasonId, loading } = useSeasons();

  const [defaultValues, setDefaultValues] = useState<PlayerFormData | null>(null);

  const [addPlayer, { error, loading: addLoading }] = useMutation(ADD_PLAYER, {
    refetchQueries: [{ query: FETCH_SQUAD_LIST_BY_SEASON, variables: { teamId, seasonId } }],
  });

  useEffect(() => {
    setDefaultValues({ ...initialPlayerState });
  }, []);

  const onSubmit = async (formData: PlayerFormData) => {
    try {
      return addPlayer({ variables: { teamId: teamId!, ...mapPlayerForm(formData) } }).then(() => {
        dispatch(showAlert({ text: 'Player added successfully!', type: 'success' }));
        navigate(-1);
      });
    } catch (error) {
      console.error("Couldn't add player: ", error);
      dispatch(showAlert({ text: 'Something went wrong', type: 'error' }));
    }
  };
  const isLoading = loading || addLoading;
  const renderContent = () => {
    return defaultValues ? (
      <PlayerForm
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        countryOptions={nationalityOptions}
        seasonOptions={seasonOptions}
        loading={isLoading}
        error={error}
      />
    ) : (
      <Spinner />
    );
  };

  return (
    <RouteGuard authorization={AUTH_ROLES.TEAM_ADMIN}>
      <PageHeader title={PAGES.ADD_PLAYER}>{renderContent()}</PageHeader>
    </RouteGuard>
  );
}
