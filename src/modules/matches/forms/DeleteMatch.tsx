import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DeleteModal } from '../../../components/modals';
import { useSeasons, useCustomParams } from '../../../hooks';
import { showAlert } from '../../../store';
import { FETCH_SQUAD_LIST_BY_SEASON } from '../../squad/graphql';
import { DELETE_MATCH, FETCH_MATCHES, FETCH_MATCHES_STATS } from '../graphql';

export default function DeleteMatch() {
  const { seasonId } = useSeasons();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { teamId, matchId } = useCustomParams();
  const [deleteMatch, { error, loading }] = useMutation(DELETE_MATCH, {
    variables: { teamId: teamId!, matchId: matchId! },
    refetchQueries: [
      {
        query: FETCH_MATCHES,
        variables: { limit: 5, offset: 0, teamId, seasonId: seasonId },
      },
      {
        query: FETCH_SQUAD_LIST_BY_SEASON,
        variables: { teamId, seasonId: seasonId },
      },
      {
        query: FETCH_MATCHES_STATS,
        variables: { teamId, seasonId: seasonId },
      },
    ],
  });

  const onDeleteMatch = () => {
    deleteMatch()
      .then(() => {
        navigate(-2);
        dispatch(
          showAlert({
            text: 'Match deleted',
            type: 'success',
          })
        );
      })
      .catch(err => {
        dispatch(
          showAlert({
            text: err,
            type: 'error',
          })
        );
      });
  };

  return <DeleteModal title="Match" loading={loading} onDelete={onDeleteMatch} error={error} />;
}
