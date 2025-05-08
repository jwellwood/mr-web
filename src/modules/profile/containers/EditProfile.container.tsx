import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { pages } from '../constants';
import EditProfileForm from '../forms/EditProfile.form';
import { EDIT_PROFILE, GET_USER } from '../graphql';
import { IEditProfileForm } from '../types';
import {showAlert} from "../../../store/features/alerts/alertsSlice.ts";
import { PROFILE } from '../../../router/paths.ts';
import ErrorGraphql from '../../../errors/ErrorGraphql.tsx';
import RouteGuard from "../../../router/RouteGuard.tsx";
import {AuthRoles} from "../../../constants.ts";
import PageHeader from '../../../components/typography/PageHeader.tsx';
import {Spinner} from "../../../components/loaders";

const EditProfileContainer: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [defaultValues, setDefaultValues] = useState<IEditProfileForm | null>(null);
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
        dispatch(showAlert({text: 'Profile updated!', type: 'success'}))
        navigate(PROFILE);
      })
      .catch((err) => {

        console.log(err);
        dispatch(showAlert({text: 'Something went wrong', type: 'error'}))
      });
  };

  if (error || editError) {
    return <ErrorGraphql error={[error, editError]} />;
  }

  return (
    <RouteGuard authorization={AuthRoles.USER}>
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
