import { useMutation } from '@apollo/client/react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { CustomSwitch } from '../../../components';
import { useCustomParams } from '../../../hooks';
import { AppDispatch, showAlert } from '../../../store';
import { FETCH_ORG_ADMIN_VIEW, TOGGLE_ORG_ADMIN_ACCESS } from '../graphql';

interface Props {
  data: { enabled: boolean } | undefined;
}

export default function ToggleAdminAccessEnabled({ data }: Props) {
  const { t } = useTranslation('organization');
  const { orgId } = useCustomParams();
  const dispatch: AppDispatch = useDispatch();

  const [toggleAdminAccess, { loading }] = useMutation(TOGGLE_ORG_ADMIN_ACCESS, {
    refetchQueries: [{ query: FETCH_ORG_ADMIN_VIEW, variables: { orgId: orgId! } }],
  });

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      await toggleAdminAccess({ variables: { orgId: orgId!, enabled: e.target.checked } });
      dispatch(showAlert({ text: t('ALERTS.TOGGLE_ADMIN_ACCESS.SUCCESS'), type: 'success' }));
    } catch (err) {
      console.error(err);
      dispatch(showAlert({ text: t('ALERTS.TOGGLE_ADMIN_ACCESS.ERROR'), type: 'error' }));
    }
  };

  return (
    <CustomSwitch
      label={t('LABELS.ADMIN_ACCESS_ENABLED')}
      checked={data?.enabled ?? false}
      onCheck={onChange}
      disabled={loading}
      errors={[]}
    />
  );
}
