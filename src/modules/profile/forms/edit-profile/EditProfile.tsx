import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { EDIT_PROFILE, FETCH_USER } from '../../graphql';
import { backendToFrontend, frontendToBackend } from './mappers';
import { PAGES } from '../../constants';
import { showAlert } from '../../../../store';
import { AUTH_ROLES } from '../../../../constants';
import { MutationError, PageContainer } from '../../../../components';
import { PROFILE_PATHS } from '../../router/paths';
import type { EditProfileFormData } from './validation';
import { Spinner } from '../../../../components/loaders';
import DeleteAccount from '../delete-account/DeleteAccount';
import EditProfileForm from './EditProfileForm';

export default function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [defaultValues, setDefaultValues] = useState<EditProfileFormData | null>(null);
  const { loading, error, data } = useQuery(FETCH_USER);
  const [editUser, { loading: editLoading, error: editError }] = useMutation(EDIT_PROFILE, {
    refetchQueries: [{ query: FETCH_USER }],
  });

  useEffect(() => {
    if (data) {
      const { user } = data;
      setDefaultValues(backendToFrontend(user));
    }
  }, [data]);

  const onSubmit = async (formData: EditProfileFormData) => {
    const variables = frontendToBackend(formData);
    return await editUser({
      variables,
    })
      .then(() => {
        dispatch(showAlert({ text: 'Profile updated!', type: 'success' }));
        navigate(PROFILE_PATHS.PROFILE);
      })
      .catch(err => {
        console.error('Edit user failed', err);
        dispatch(showAlert({ text: 'Something went wrong', type: 'error' }));
      });
  };

  return (
    <PageContainer auth={AUTH_ROLES.USER} title={PAGES.EDIT_PROFILE_PAGE}>
      {defaultValues ? (
        <>
          <EditProfileForm
            onSubmit={onSubmit}
            defaultValues={defaultValues}
            loading={loading || editLoading}
          />
          {error && <MutationError error={error || editError} />}
          <DeleteAccount />
        </>
      ) : (
        <Spinner />
      )}
    </PageContainer>
  );
}
