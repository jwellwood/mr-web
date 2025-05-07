import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { AUTH_ROLES } from 'app/constants';
import { Spinner } from 'components/loaders';
import { PageHeader } from 'components/typography';
import ErrorGraphql from 'errors/ErrorGraphql';
import { showAlert } from 'modules/alerts';
import { PROFILE } from 'router/paths';
import RouteGuard from 'router/RouteGuard';
import { pages } from '../constants';
import EditProfileForm from '../forms/EditProfile.form';
import { EDIT_PROFILE, GET_USER } from '../graphql';
import { IEditProfileForm } from '../types';

const EditProfileContainer: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [defaultValues, setDefaultValues] = useState(null);
  const { loading, error, data } = useQuery(GET_USER);
  const [editUser, { loading: editLoading, error: editError }] = useMutation(
    EDIT_PROFILE,
    {
      refetchQueries: [{ query: GET_USER }],
    }
  );

  useEffect(() => {
    if (data) {
      const { user } = data;
      setDefaultValues({
        ...(user as IEditProfileForm),
      });
    }
  }, [data]);

  const onSubmit = async (formData: IEditProfileForm) => {
    const dob = new Date(formData.dateOfBirth);
    return await editUser({
      variables: { ...formData, dateOfBirth: dob },
    })
      .then(() => {
        dispatch(showAlert('Profile updated!', 'success'));
        navigate(PROFILE.PROFILE);
      })
      .catch((err) => {
        console.log(err);
        dispatch(showAlert('Something went wrong', 'error'));
        return <ErrorGraphql error={[error, editError]} />;
      });
  };

  if (error || editError) {
    return <ErrorGraphql error={[error, editError]} />;
  }

  return (
    <RouteGuard authorization={AUTH_ROLES.USER}>
      <PageHeader title={pages.EDIT_PROFILE_PAGE} />
      {!loading && !editLoading && defaultValues ? (
        <EditProfileForm onSubmit={onSubmit} defaultValues={defaultValues} />
      ) : (
        <Spinner />
      )}
    </RouteGuard>
  );
};

export default EditProfileContainer;
