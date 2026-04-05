import { useMutation, useQuery } from '@apollo/client/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showAlert } from '../../../store';
import { backendToFrontend, frontendToBackend } from '../forms/edit-profile/mappers';
import { EditProfileFormData } from '../forms/edit-profile/schema';
import { EDIT_PROFILE, FETCH_USER } from '../graphql';
import EditProfilePage from '../pages/EditProfilePage';
import { PROFILE_PATHS } from '../router';

export default function EditProfile() {
  const { t } = useTranslation('profile');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, data, error } = useQuery(FETCH_USER);

  const defaultValues: EditProfileFormData | null = useMemo(
    () => (data?.user ? backendToFrontend(data.user) : null),
    [data]
  );
  const [editUser, { loading: editLoading }] = useMutation(EDIT_PROFILE, {
    refetchQueries: [{ query: FETCH_USER }],
    onError: () => dispatch(showAlert({ text: t('ALERTS.PROFILE_UPDATED.ERROR'), type: 'error' })),
  });

  const onSubmit = async (formData: EditProfileFormData) => {
    const variables = frontendToBackend(formData);
    return await editUser({
      variables,
    })
      .then(() => {
        dispatch(showAlert({ text: t('ALERTS.PROFILE_UPDATED.SUCCESS'), type: 'success' }));
        navigate(PROFILE_PATHS.PROFILE);
      })
      .catch(() => {
        dispatch(showAlert({ text: t('ALERTS.PROFILE_UPDATED.ERROR'), type: 'error' }));
      });
  };

  return (
    <EditProfilePage
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      loading={loading || editLoading}
      error={error}
    />
  );
}
