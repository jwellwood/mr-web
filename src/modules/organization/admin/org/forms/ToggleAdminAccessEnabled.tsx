import { useMutation } from '@apollo/client/react';
import { useDispatch } from 'react-redux';
import { CustomSwitch } from '../../../../../components';
import { useCustomParams } from '../../../../../hooks';
import { AppDispatch, showAlert } from '../../../../../store';
import { FETCH_ORG_ADMIN_VIEW, TOGGLE_ORG_ADMIN_ACCESS } from '../graphql';

interface Props {
  data: { enabled: boolean } | undefined;
}

export default function ToggleAdminAccessEnabled({ data }: Props) {
  const { orgId } = useCustomParams();
  const dispatch: AppDispatch = useDispatch();

  const [toggleAdminAccess, { loading }] = useMutation(TOGGLE_ORG_ADMIN_ACCESS, {
    refetchQueries: [{ query: FETCH_ORG_ADMIN_VIEW, variables: { orgId: orgId! } }],
  });

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      await toggleAdminAccess({ variables: { orgId: orgId!, enabled: e.target.checked } });
      dispatch(showAlert({ text: 'Admin access updated successfully!', type: 'success' }));
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: 'Something went wrong', type: 'error' }));
    }
  };

  return (
    <CustomSwitch
      label="Admin Access Enabled"
      checked={data?.enabled ?? false}
      onCheck={onChange}
      disabled={loading}
      errors={[]}
    />
  );
}
