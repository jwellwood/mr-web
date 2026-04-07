import { useMutation } from '@apollo/client/react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DeleteModal } from '../../../components/modals';
import { useCustomParams } from '../../../hooks';
import { AppDispatch, showAlert } from '../../../store';
import { FETCH_TROPHIES } from '../../history/graphql';
import { DELETE_SEASON, FETCH_SEASONS, FETCH_SEASONS_POSITION } from '../graphql';

export default function DeleteSeason() {
  const { t } = useTranslation('teamseasons');
  const { teamId, seasonId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [deleteSeason, { error, loading }] = useMutation(DELETE_SEASON, {
    refetchQueries: [
      { query: FETCH_TROPHIES, variables: { teamId: teamId! } },
      { query: FETCH_SEASONS_POSITION, variables: { teamId: teamId! } },
    ],
  });

  const onDelete = async () => {
    try {
      return deleteSeason({
        variables: { teamId: teamId!, seasonId: seasonId! },
        refetchQueries: [
          { query: FETCH_SEASONS, variables: { teamId: teamId! } },
          { query: FETCH_SEASONS_POSITION, variables: { teamId: teamId! } },
        ],
      }).then(() => {
        dispatch(showAlert({ text: t('ALERTS.DELETE_SEASON.SUCCESS'), type: 'success' }));
        navigate(-2);
      });
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: t('ALERTS.DELETE_SEASON.ERROR'), type: 'error' }));
    }
  };

  return <DeleteModal title="Season" error={error} onDelete={onDelete} loading={loading} />;
}
