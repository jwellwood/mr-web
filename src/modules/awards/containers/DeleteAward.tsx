import { useMutation } from '@apollo/client/react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DeleteModal } from '../../../components/modals';
import { useCustomParams } from '../../../hooks';
import { AppDispatch, showAlert } from '../../../store';
import { FETCH_AWARDS, DELETE_AWARD } from '../graphql';

export default function DeleteAward() {
  const { t } = useTranslation('awards');
  const { awardId, teamId, seasonId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [deleteAward, { error, loading }] = useMutation(DELETE_AWARD, {
    refetchQueries: [{ query: FETCH_AWARDS, variables: { seasonId: seasonId! } }],
    onError: () => dispatch(showAlert({ text: t('ALERTS.DELETE_AWARD.ERROR'), type: 'error' })),
  });

  const onDelete = async () => {
    try {
      return deleteAward({ variables: { teamId: teamId!, awardId: awardId! } }).then(() => {
        dispatch(showAlert({ text: t('ALERTS.DELETE_AWARD.SUCCESS'), type: 'success' }));
        navigate(-2);
      });
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: t('ALERTS.DELETE_AWARD.ERROR'), type: 'error' }));
    }
  };

  return (
    <DeleteModal title={t('PAGES.AWARD')} error={error} onDelete={onDelete} loading={loading} />
  );
}
