import { useMutation } from '@apollo/client/react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DeleteModal } from '../../../components/modals';
import { useCustomParams } from '../../../hooks';
import { showAlert } from '../../../store';
import { PROFILE_PATHS } from '../../profile/router/paths';
import { DELETE_ORG } from '../graphql';

export default function DeleteOrg() {
  const { t } = useTranslation('organization');
  const { orgId } = useCustomParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [deleteOrg, { loading, error }] = useMutation(DELETE_ORG, {
    onError: err => {
      console.error(err);
      dispatch(showAlert({ text: t('ALERTS.DELETE.ERROR'), type: 'error' }));
    },
  });

  const onDelete = async () => {
    return deleteOrg({ variables: { orgId: orgId! } })
      .then(() => {
        navigate(PROFILE_PATHS.PROFILE);
        dispatch(showAlert({ text: t('ALERTS.DELETE.SUCCESS'), type: 'success' }));
      })
      .catch(() => {
        dispatch(showAlert({ text: t('ALERTS.DELETE.ERROR'), type: 'error' }));
      });
  };

  return <DeleteModal title={t('PAGES.ORG')} onDelete={onDelete} error={error} loading={loading} />;
}
