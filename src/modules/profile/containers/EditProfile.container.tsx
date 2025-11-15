import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { EDIT_PROFILE, FETCH_USER } from '../graphql';
import { pages } from '../constants';
import EditProfileForm from '../forms/EditProfile.form';
import { showAlert } from '../../../store/features/alerts/alertsSlice.ts';
import { PROFILE } from '../../../router/routes/paths.ts';
import ErrorGraphql from '../../../errors/ErrorGraphql.tsx';
import RouteGuard from '../../../router/RouteGuard.tsx';
import { AuthRoles } from '../../../constants.ts';
import { Spinner } from '../../../components/loaders';
import { IEditProfileInput } from '../types.ts';
import { PageHeader } from '../../../components';

export default function EditProfileContainer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [defaultValues, setDefaultValues] = useState<IEditProfileInput | null>(null);
  const { loading, error, data } = useQuery(FETCH_USER);
  const [editUser, { loading: editLoading, error: editError }] = useMutation(EDIT_PROFILE, {
    refetchQueries: [{ query: FETCH_USER }],
  });

  useEffect(() => {
    if (data) {
      const { user } = data;
      setDefaultValues({
        ...(user as IEditProfileInput),
      });
    }
  }, [data]);

  const onSubmit = async (formData: IEditProfileInput) => {
    const dob = new Date(formData.dateOfBirth);
    return await editUser({
      variables: { ...formData, dateOfBirth: dob },
    })
      .then(() => {
        dispatch(showAlert({ text: 'Profile updated!', type: 'success' }));
        navigate(PROFILE.PROFILE);
      })
      .catch(err => {
        console.error('Edit user failed', err);
        dispatch(showAlert({ text: 'Something went wrong', type: 'error' }));
      });
  };

  const renderContent = () =>
    !loading && !editLoading && defaultValues ? (
      <EditProfileForm onSubmit={onSubmit} defaultValues={defaultValues} />
    ) : (
      <Spinner />
    );

  return (
    <RouteGuard authorization={AuthRoles.USER}>
      <PageHeader title={pages.EDIT_PROFILE_PAGE}>
        {error || editError ? (
          <ErrorGraphql error={(error || editError) as Error} />
        ) : (
          renderContent()
        )}
      </PageHeader>
    </RouteGuard>
  );
}
