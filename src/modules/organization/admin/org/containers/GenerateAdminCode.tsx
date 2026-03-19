import { useMutation } from '@apollo/client/react';
import { useDispatch } from 'react-redux';
import { CustomButton, DataError } from '../../../../../components';
import { CustomSkeleton } from '../../../../../components/loaders';
import { useCustomParams } from '../../../../../hooks';
import { AppDispatch, showAlert } from '../../../../../store';
import { FETCH_ORG_ADMIN_VIEW, SET_ORG_ADMIN_ACCESS_CODE } from '../graphql';

export default function GenerateAdminCode() {
  const { orgId } = useCustomParams();
  const dispatch: AppDispatch = useDispatch();

  const [setAdminAccessCode, { loading, error }] = useMutation(SET_ORG_ADMIN_ACCESS_CODE, {
    refetchQueries: [{ query: FETCH_ORG_ADMIN_VIEW, variables: { orgId: orgId! } }],
  });

  const onSubmit = async () => {
    try {
      await setAdminAccessCode({ variables: { orgId: orgId! } });
      dispatch(
        showAlert({
          text: 'Admin access code generated successfully',
          type: 'success',
        })
      );
    } catch (error) {
      console.error(error);
      dispatch(
        showAlert({
          text: 'Failed to generate admin access code',
          type: 'error',
        })
      );
    }
  };

  const renderContent = () => {
    if (error) {
      return <DataError error={error} />;
    }
    return (
      <CustomButton onClick={onSubmit} color="tertiary" variant="contained">
        Generate Admin Code
      </CustomButton>
    );
  };

  return loading ? <CustomSkeleton width="175px" height="36px" /> : renderContent();
}
