import { useMutation } from '@apollo/client/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  CustomButton,
  CustomTypography,
  MutationError,
  SectionContainer,
} from '../../../../components';
import { CustomGridContainer, CustomGridItem } from '../../../../components/grids';
import { Spinner } from '../../../../components/loaders';
import { FormModal } from '../../../../components/modals';
import ConfirmationModal from '../../../../components/modals/confirmation-modal/ConfirmationModal';
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
          <CustomButton>Confirm Result</CustomButton>
        </span>
      )}
      <FormModal open={open} onClose={() => setOpen(false)} title={'Confirm Result'}>
        <SectionContainer>
          <CustomGridContainer direction="row" spacing={3}>
            <CustomGridItem size={12}>
              <CustomButton onClick={onConfirm} variant="contained" color="primary" fullWidth>
                Confirm Result
              </CustomButton>
            </CustomGridItem>
            <ConfirmationModal
              title="Dispute Result"
              loading={loading}
              onConfirm={onDispute}
              btn={
                <CustomTypography color="error" bold>
                  Dispute Result
                </CustomTypography>
              }
            >
              Are you sure you want to dispute this result? This will mark the result as disputed
              and it will need to be reviewed by an admin.
            </ConfirmationModal>
          </CustomGridContainer>
        </SectionContainer>
      </FormModal>
    </>
  );
}
