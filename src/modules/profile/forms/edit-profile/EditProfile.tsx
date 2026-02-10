import { useMutation, useQuery } from '@apollo/client/react';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MutationError, PageContainer } from '../../../../components';
import { Spinner } from '../../../../components/loaders';
import { showAlert } from '../../../../store';
import { PAGES } from '../../constants';
import { EDIT_PROFILE, FETCH_USER } from '../../graphql';
import { PROFILE_PATHS } from '../../router/paths';
import DeleteAccount from '../delete-account/DeleteAccount';
import EditProfileForm from './EditProfileForm';
import { backendToFrontend, frontendToBackend } from './mappers';
import type { EditProfileFormData } from './validation';

export default function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(FETCH_USER);

  const defaultValues: EditProfileFormData | null = useMemo(
    () => (data?.user ? backendToFrontend(data.user) : null),
    [data]
  );
  const [editUser, { loading: editLoading, error: editError }] = useMutation(EDIT_PROFILE, {
    refetchQueries: [{ query: FETCH_USER }],
  });

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
    <PageContainer title={PAGES.EDIT_PROFILE_PAGE}>
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
