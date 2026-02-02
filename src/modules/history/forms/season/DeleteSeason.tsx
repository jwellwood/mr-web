import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import {
  DELETE_SEASON,
  FETCH_SEASONS,
  FETCH_SEASONS_POSITION,
  FETCH_TROPHIES,
} from '../../graphql';
import { useCustomParams } from '../../../../hooks';
import { AppDispatch, showAlert } from '../../../../store';
import { DeleteModal } from '../../../../components/modals';

export default function DeleteSeason() {
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
        dispatch(showAlert({ text: 'Season deleted successfully', type: 'success' }));
        navigate(-2);
      });
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: 'There was a problem', type: 'error' }));
    }
  };

  return <DeleteModal title="Season" error={error} onDelete={onDelete} loading={loading} />;
}
