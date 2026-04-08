import { useMutation } from '@apollo/client/react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DeleteModal } from '../../../components/modals';
import { useCustomParams } from '../../../hooks';
import { AppDispatch, showAlert } from '../../../store';
import { DELETE_TROPHY, FETCH_TROPHIES } from '../graphql';

export default function DeleteTrophy() {
  const { t } = useTranslation('trophies');
  const { teamId, trophyId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [deleteTrophy, { error, loading }] = useMutation(DELETE_TROPHY, {
    refetchQueries: [{ query: FETCH_TROPHIES, variables: { teamId: teamId! } }],
  });

  const onDelete = async () => {
    try {
      return deleteTrophy({ variables: { teamId: teamId!, trophyId: trophyId! } }).then(() => {
        dispatch(showAlert({ text: t('ALERTS.DELETE_TROPHY.SUCCESS'), type: 'success' }));
        navigate(-2);
      });
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: t('ALERTS.DELETE_TROPHY.ERROR'), type: 'error' }));
    }
  };

  return (
    <DeleteModal title={t('PAGES.TROPHY')} error={error} onDelete={onDelete} loading={loading} />
  );
}
