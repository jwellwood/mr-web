import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { FETCH_SQUAD_LIST_BY_SEASON } from '../../squad/graphql';
import { PAGES } from '../constants';
import { ADD_PLAYER } from '../graphql';
import PlayerForm from './components/PlayerForm';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { AppDispatch } from '../../../store/store';
import { useNationality } from '../../../hooks';
import { useSeasons } from '../../../hooks/useSeasons';
import { showAlert } from '../../../store/features/alerts/alertsSlice';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import RouteGuard from '../../../router/RouteGuard';
import { AUTH_ROLES } from '../../../constants';
import { Spinner } from '../../../components/loaders';
import { mapPlayerForm } from '../helpers/mapPlayerForm.ts';
import { initialPlayerState } from './state.ts';
import { IPlayer } from '../types.ts';
import { PageHeader } from '../../../components';

const AddPlayer: React.FC = () => {
  const { teamId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { nationalityOptions } = useNationality();
  const { seasonOptions, seasonId, loading } = useSeasons();

  const [defaultValues, setDefaultValues] = useState<Partial<IPlayer | null>>(null);

  const [addPlayer, { error, loading: addLoading }] = useMutation(ADD_PLAYER, {
    refetchQueries: [{ query: FETCH_SQUAD_LIST_BY_SEASON, variables: { teamId, seasonId } }],
  });

  useEffect(() => {
    setDefaultValues({ ...initialPlayerState });
  }, []);
  const onSubmit = async (formData: Partial<IPlayer>) => {
    try {
      return addPlayer({ variables: { teamId: teamId, ...mapPlayerForm(formData) } }).then(() => {
        dispatch(showAlert({ text: 'Player added successfully!', type: 'success' }));
        navigate(-1);
      });
    } catch (error) {
      console.error("Couldn't add player: ", error);
      dispatch(showAlert({ text: 'Something went wrong', type: 'error' }));
    }
  };

  if (error) return <ErrorGraphql error={error} />;

  return (
    <RouteGuard authorization={AUTH_ROLES.TEAM_ADMIN}>
      <PageHeader title={PAGES.ADD_PLAYER}>
        {!loading && !addLoading && defaultValues ? (
          <PlayerForm
            defaultValues={defaultValues}
            onSubmit={onSubmit}
            countryOptions={nationalityOptions}
            seasonOptions={seasonOptions}
          />
        ) : (
          <Spinner />
        )}
      </PageHeader>
    </RouteGuard>
  );
};

export default AddPlayer;
