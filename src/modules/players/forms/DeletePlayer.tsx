import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { DELETE_PLAYER, FETCH_PLAYER } from '../graphql';
import { FETCH_SQUAD_BY_SEASON } from '../../squad/graphql';
import { PAGES } from '../constants';
import DeletePlayerForm from './components/DeletePlayerForm';
import { useCustomParams } from '../../../hooks/useCustomParams.tsx';
import { showAlert } from '../../../store/features/alerts/alertsSlice.ts';
import ErrorGraphql from '../../../errors/ErrorGraphql.tsx';
import RouteGuard from '../../../router/RouteGuard.tsx';
import { AuthRoles } from '../../../constants.ts';
import { PageHeader } from '../../../components/typography';
import { Spinner } from '../../../components/loaders';

const DeletePlayer: React.FC = () => {
  const { teamId, playerId } = useCustomParams();
  const { data, loading, error } = useQuery(FETCH_PLAYER, {
    variables: { playerId: playerId },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deletePlayer, { loading: deleteLoading }] = useMutation(DELETE_PLAYER, {
    refetchQueries: [
      {
        query: FETCH_SQUAD_BY_SEASON,
        variables: { teamId, seasonId: 'all' },
      },
    ],
  });

  const onDelete = async () => {
    return await deletePlayer({ variables: { teamId, playerId } })
      .then(() => {
        dispatch(showAlert({ text: 'Player deleted', type: 'success' }));
        navigate(-2);
      })
      .catch(() => {
        dispatch(showAlert({ text: 'Something went wrong', type: 'error' }));
      });
  };

  if (error) return <ErrorGraphql error={error} />;

  return (
    <RouteGuard authorization={AuthRoles.TEAM_ADMIN}>
      <PageHeader title={PAGES.DELETE_PLAYER} />
      {!loading && !deleteLoading ? (
        <DeletePlayerForm
          onSubmit={onDelete}
          defaultValues={{}}
          playerName={data?.player?.name || ''}
        />
      ) : (
        <Spinner />
      )}
    </RouteGuard>
  );
};

export default DeletePlayer;
