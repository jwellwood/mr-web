import { useMutation, useQuery } from '@apollo/client/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { CustomButton } from '../../../components';
import { Spinner } from '../../../components/loaders';
import { FormModal } from '../../../components/modals';
import { useCustomParams, useNationality, useSeasons } from '../../../hooks';
import { AppDispatch, showAlert } from '../../../store';
import PlayerForm from '../forms/player-form/PlayerForm';
import type { PlayerFormData } from '../forms/player-form/schema';
import { FETCH_PLAYER, EDIT_PLAYER } from '../graphql';
import { mapFormToPlayer, mapPlayerToForm } from '../helpers/mapPlayerForm';
import DeletePlayer from './DeletePlayer';

interface Props {
  playerId: string;
}

export default function EditPlayer({ playerId }: Props) {
  const { t } = useTranslation('players');
  const { teamId } = useCustomParams();
  const { seasonOptions, loading: seasonLoading } = useSeasons();
  const { nationalityOptions } = useNationality();
  const [open, setOpen] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const { loading, error, data, refetch } = useQuery(FETCH_PLAYER, {
    variables: { playerId },
    skip: !open,
  });
  const [updatePlayer, { loading: updateLoading }] = useMutation(EDIT_PLAYER, {
    onError: () => dispatch(showAlert({ text: t('ALERTS.EDIT_PLAYER.ERROR'), type: 'error' })),
  });

  const defaultValues = data?.player ? mapPlayerToForm(data.player) : null;

  const onSubmit = async (formData: PlayerFormData) => {
    try {
      await updatePlayer({
        variables: { teamId: teamId!, playerId, ...mapFormToPlayer(formData) },
      });
      refetch({ playerId });
      dispatch(showAlert({ text: t('ALERTS.EDIT_PLAYER.SUCCESS'), type: 'success' }));
      setOpen(false);
    } catch (error) {
      console.error("Couldn't update player: ", error);
      dispatch(showAlert({ text: t('ALERTS.EDIT_PLAYER.ERROR'), type: 'error' }));
    }
  };

  const isLoading = loading || seasonLoading || updateLoading;

  return (
    <>
      <CustomButton onClick={() => setOpen(true)}>{t('LINKS.EDIT_PLAYER')}</CustomButton>
      <FormModal open={open} onClose={() => setOpen(false)} title={t('PAGES.EDIT_PLAYER')}>
        {loading || seasonLoading || !defaultValues ? (
          <Spinner />
        ) : (
          <>
            <PlayerForm
              defaultValues={defaultValues}
              onSubmit={onSubmit}
              countryOptions={nationalityOptions}
              seasonOptions={seasonOptions}
              loading={isLoading}
              error={error}
            />
            <DeletePlayer />
          </>
        )}
      </FormModal>
    </>
  );
}
