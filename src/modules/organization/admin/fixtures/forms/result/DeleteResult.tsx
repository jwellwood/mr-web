import { useMutation } from '@apollo/client/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DeleteModal } from '../../../../../../components/modals';
import { useCustomParams } from '../../../../../../hooks';
import { showAlert } from '../../../../../../store';
import {
  FETCH_ORG_SEASONS,
  FETCH_RESULTS,
  FETCH_FIXTURES,
  FETCH_LEAGUE_TABLES,
} from '../../../../graphql';
import { DELETE_RESULT } from '../../graphql';

export default function DeleteResult() {
  const { orgId, orgSeasonId, resultId } = useCustomParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [deleteResult, { loading, error }] = useMutation(DELETE_RESULT, {
    refetchQueries: [
      { query: FETCH_ORG_SEASONS, variables: { orgId } },
      { query: FETCH_RESULTS, variables: { orgId, orgSeasonId } },
      { query: FETCH_FIXTURES, variables: { orgId, orgSeasonId } },
      { query: FETCH_LEAGUE_TABLES, variables: { orgId, orgSeasonId } },
    ],
    awaitRefetchQueries: true,
  });

  const onDelete = async () => {
    return deleteResult({ variables: { orgId: orgId!, resultId: resultId! } })
      .then(() => {
        navigate(-2);
        dispatch(showAlert({ text: 'Result deleted', type: 'success' }));
      })
      .catch(() => {
        dispatch(showAlert({ text: 'Something went wrong', type: 'error' }));
      });
  };

  return <DeleteModal title="Result" onDelete={onDelete} error={error} loading={loading} />;
}
