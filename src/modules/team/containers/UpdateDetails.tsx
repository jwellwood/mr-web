import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { PAGES, TeamError, TeamSuccess } from '../constants';
import UpdateTeamDetailsForm from '../forms/UpdateTeamDetailsForm.form';
import { GET_TEAM, UPDATE_TEAM_DETAILS } from '../graphql';
import { ITeamDetailsInput } from '../types';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { useNationality } from '../../../hooks';
import { AppDispatch } from '../../../store/store';
import { showAlert } from '../../../store/features/alerts/alertsSlice';
import ErrorGraphql from "../../../errors/ErrorGraphql.tsx";
import RouteGuard from '../../../router/RouteGuard.tsx';
import {AuthRoles} from "../../../constants.ts";
import {PageHeader} from "../../../components/typography";
import {Spinner} from "../../../components/loaders";

const UpdateDetailsContainer: React.FC = () => {
  const { teamId } = useCustomParams();
  const navigate = useNavigate();
  const { loading, error, data, refetch } = useQuery(GET_TEAM, {
    variables: { teamId },
    notifyOnNetworkStatusChange: true,
  });
  const [updateTeamDetails, { loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_TEAM_DETAILS);
  const { nationalityOptions } = useNationality();
  const dispatch: AppDispatch = useDispatch();
  const [defaultValues, setDefaultValues] = useState<ITeamDetailsInput | null>(null);

  useEffect(() => {
    if (data) {
      const { team } = data;
      setDefaultValues({
        ...(team as ITeamDetailsInput),
      });
    }
  }, [data]);

  const onSubmit = (formData: Partial<ITeamDetailsInput>) => {
    try {
      updateTeamDetails({ variables: { teamId, ...formData } }).then(() => {
        refetch({ teamId });
        dispatch(showAlert({
          text: TeamSuccess.edit,
          type: 'success'
        }));
        navigate(-1);
      });
    } catch (error) {
      console.error(error)
      dispatch(showAlert({text: TeamError.edit, type: 'error'}));
    }
  };

  if (error || updateError)
    return <ErrorGraphql error={[error, updateError]} />;
  return (
    <RouteGuard authorization={AuthRoles.TEAM_ADMIN} >
      <PageHeader title={PAGES.EDIT_TEAM} />
      {!loading && !updateLoading && defaultValues ? (
        <UpdateTeamDetailsForm
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          countryOptions={nationalityOptions}
        />
      ) : (
        <Spinner />
      )}
    </RouteGuard>
  );
};

export default UpdateDetailsContainer;
