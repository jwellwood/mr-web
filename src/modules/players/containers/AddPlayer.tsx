import { useMutation } from '@apollo/client/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { CustomButton, NoDataText } from '../../../components';
import { Spinner } from '../../../components/loaders';
import { FormModal } from '../../../components/modals';
import { useCustomParams, useNationality, useSeasons } from '../../../hooks';
import { AppDispatch, showAlert } from '../../../store';
import { FETCH_SQUAD_LIST_BY_SEASON } from '../../squad/graphql';
import PlayerForm from '../forms/player-form/PlayerForm';
import { initialPlayerState, type PlayerFormData } from '../forms/player-form/schema';
import { ADD_PLAYER } from '../graphql';
import { mapFormToPlayer } from '../helpers/mapPlayerForm';

export default function AddPlayer() {
  const { t } = useTranslation('players');
  const { teamId } = useCustomParams();
  const dispatch: AppDispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { seasonId, seasonOptions, loading } = useSeasons();
  const { nationalityOptions } = useNationality();

  const [addPlayer, { loading: addLoading }] = useMutation(ADD_PLAYER, {
    refetchQueries: [{ query: FETCH_SQUAD_LIST_BY_SEASON, variables: { teamId, seasonId } }],
    onError: () => dispatch(showAlert({ text: t('ALERTS.ADD_PLAYER.ERROR'), type: 'error' })),
  });

  const onSubmit = async (formData: PlayerFormData) => {
    try {
      await addPlayer({ variables: { teamId: teamId!, ...mapFormToPlayer(formData) } });
      dispatch(showAlert({ text: t('ALERTS.ADD_PLAYER.SUCCESS'), type: 'success' }));
      setOpen(false);
    } catch (error) {
      console.error("Couldn't add player: ", error);
      dispatch(showAlert({ text: t('ALERTS.ADD_PLAYER.ERROR'), type: 'error' }));
    }
  };
  const isLoading = loading || addLoading;

  const renderContent = () => {
    if (loading) return <Spinner />;
    if (!seasonOptions.length)
      return <NoDataText>{t('MESSAGES.ADD_SEASON_BEFORE_PLAYERS')}</NoDataText>;
    return (
      <PlayerForm
        defaultValues={initialPlayerState}
        onSubmit={onSubmit}
        countryOptions={nationalityOptions}
        seasonOptions={seasonOptions}
        loading={isLoading}
      />
    );
  };

  return (
    <>
      <CustomButton onClick={() => setOpen(true)}>{t('LINKS.ADD_PLAYER')}</CustomButton>
      <FormModal open={open} onClose={() => setOpen(false)} title={t('PAGES.ADD_PLAYER')}>
        {renderContent()}
      </FormModal>
    </>
  );
}
