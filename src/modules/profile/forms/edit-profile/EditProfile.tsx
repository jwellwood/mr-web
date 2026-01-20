import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { EDIT_PROFILE, FETCH_USER } from '../../graphql';
import { PAGES } from '../../constants';
import { showAlert } from '../../../../store';
import { AUTH_ROLES } from '../../../../constants';
import { PageContainer } from '../../../../components';
import { PROFILE_PATHS } from '../../router/paths';
import type { EditProfileFormData } from './validation';
import EditProfileView from './EditProfileView';

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
      setDefaultValues({ ...user } as EditProfileFormData);
    }
  }, [data]);

  const onSubmit = async (formData: EditProfileFormData) => {
    return await editUser({
      variables: { ...formData },
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
      <EditProfileView
        loading={loading || editLoading}
        error={error || editError}
        onSubmit={onSubmit}
        defaultValues={defaultValues}
      />
    </PageContainer>
  );
}
