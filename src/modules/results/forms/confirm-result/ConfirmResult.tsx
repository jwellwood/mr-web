import { useMutation } from '@apollo/client/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CustomButton, MutationError } from '../../../../components';
import { Spinner } from '../../../../components/loaders';
import { FormModal } from '../../../../components/modals';
import { useCustomParams } from '../../../../hooks';
import { AppDispatch, showAlert } from '../../../../store';
import { FETCH_RESULT } from '../../graphql';
import { CONFIRM_RESULT } from '../../graphql/CONFIRM_RESULT';

export default function ConfirmResult() {
  const [open, setOpen] = useState(false);
  const { resultId } = useCustomParams();
  const dispatch: AppDispatch = useDispatch();
  const [confirmResult, { loading, error }] = useMutation(CONFIRM_RESULT);

  const onConfirm = () => {
    confirmResult({
      variables: { resultId, isConfirmed: true },
      refetchQueries: [{ query: FETCH_RESULT, variables: { resultId } }],
    }).then(() => {
      dispatch(showAlert({ text: 'Result confirmed!', type: 'success' }));
    });
  };
  const onDispute = () => {
    confirmResult({
      variables: { resultId, isConfirmed: false },
      refetchQueries: [{ query: FETCH_RESULT, variables: { resultId } }],
    }).then(() => {
      dispatch(showAlert({ text: 'Result disputed.', type: 'success' }));
    });
  };

  return (
    <>
      {error ? (
        <MutationError error={error} />
      ) : loading ? (
        <Spinner />
      ) : (
        <span onClick={() => setOpen(true)} style={{ cursor: 'pointer' }}>
          <CustomButton>Con firm Result</CustomButton>
        </span>
      )}
      <FormModal open={open} onClose={() => setOpen(false)}>
        <>
          <CustomButton onClick={onConfirm} variant="contained" color="success">
            Confirm Result
          </CustomButton>
          <CustomButton onClick={onDispute} variant="outlined" color="error">
            Dispute Result
          </CustomButton>
        </>
      </FormModal>
    </>
  );
}
