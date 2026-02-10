import { useMutation, useQuery } from '@apollo/client/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../../../components';
import { Spinner } from '../../../../components/loaders';
import { useCustomParams, useSeasons, useNationality } from '../../../../hooks';
import { AppDispatch, showAlert } from '../../../../store';
import { PAGES } from '../../constants';
import { FETCH_PLAYER, EDIT_PLAYER } from '../../graphql';
import { mapFormToPlayer, mapPlayerToForm } from '../../helpers/mapPlayerForm';
import DeletePlayer from './DeletePlayer';
import PlayerForm from './PlayerForm';
import type { PlayerFormData } from './validation';

export default function EditPlayer() {
  const { teamId, playerId } = useCustomParams();
  const { seasonOptions, loading: seasonLoading } = useSeasons();

  const navigate = useNavigate();
  const { loading, error, data, refetch } = useQuery(FETCH_PLAYER, {
    variables: { playerId: playerId! },
  });
  const [updatePlayer, { loading: updateLoading, error: updateError }] = useMutation(EDIT_PLAYER);
  const { nationalityOptions } = useNationality();
  const dispatch: AppDispatch = useDispatch();

  // Derive form values directly from query data
  const defaultValues = data?.player ? mapPlayerToForm(data.player) : null;

  const onSubmit = (formData: PlayerFormData) => {
    try {
      updatePlayer({
        variables: {
          teamId: teamId!,
          playerId: playerId!,
          ...mapFormToPlayer(formData),
        },
      }).then(() => {
        refetch({ playerId: playerId! });
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

  return (
    <PageHeader title={PAGES.EDIT_PLAYER}>
      {isLoading || !defaultValues ? (
        <Spinner />
      ) : (
        <>
          <PlayerForm
            defaultValues={defaultValues}
            onSubmit={onSubmit}
            countryOptions={nationalityOptions}
            seasonOptions={seasonOptions}
            loading={isLoading}
            error={error || updateError}
          />
          <DeletePlayer />
        </>
      )}
    </PageHeader>
  );
}
