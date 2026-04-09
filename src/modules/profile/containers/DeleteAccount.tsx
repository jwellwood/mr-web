import { useMutation } from '@apollo/client/react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DeleteModal } from '../../../components/modals';
import { apolloClient } from '../../../services/graphql/apolloClient';
import { showAlert, resetAuth } from '../../../store';
import { AUTH_PATHS } from '../../auth/router';
import { DELETE_USER } from '../graphql';

export default function DeleteAccount() {
  const { t } = useTranslation('profile');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [deleteUser, { loading, error }] = useMutation(DELETE_USER, {
    onError: () => dispatch(showAlert({ text: t('ALERTS.DELETE_ACCOUNT.ERROR'), type: 'error' })),
  });

  const onDelete = async () => {
    return deleteUser()
      .then(async () => {
        dispatch(showAlert({ text: t('ALERTS.DELETE_ACCOUNT.SUCCESS'), type: 'success' }));
        await apolloClient.resetStore();
        dispatch(resetAuth());
        navigate(AUTH_PATHS.SIGN_IN);
      })
      .catch(err => {
        dispatch(showAlert({ text: t('ALERTS.DELETE_ACCOUNT.ERROR'), type: 'error' }));
        console.error(err);
      });
  };

  return (
    <DeleteModal
      title={t('ALERTS.DELETE_ACCOUNT.TITLE')}
      onDelete={onDelete}
      loading={loading}
      error={error}
    />
  );
}
