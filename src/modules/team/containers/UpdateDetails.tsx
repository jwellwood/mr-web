import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { AUTH_ROLES } from 'app/constants';
import { Spinner } from 'components/loaders';
import { PageHeader } from 'components/typography';
import ErrorGraphql from 'errors/ErrorGraphql';
import { useNationality } from 'hooks';
import { useCustomParams } from 'hooks/useCustomParams';
import { showAlert } from 'modules/alerts';
import { AppDispatch } from 'reduxStore/rootReducer';
import RouteGuard from 'router/RouteGuard';
import { PAGES, TeamError, TeamSuccess } from '../constants';
import UpdateTeamDetailsForm from '../forms/UpdateTeamDetailsForm.form';
import { GET_TEAM, UPDATE_TEAM_DETAILS } from '../graphql';
import { ITeamDetailsInput } from '../types';

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
  const [defaultValues, setDefaultValues] = useState<ITeamDetailsInput>(null);

  useEffect(() => {
    if (data) {
      const { team } = data;
      setDefaultValues({
        ...(team as ITeamDetailsInput),
      });
    }
  }, [data]);

  const onSubmit = (formData: ITeamDetailsInput) => {
    try {
      updateTeamDetails({ variables: { teamId, ...formData } }).then(() => {
        refetch({ teamId });
        dispatch(showAlert(TeamSuccess.edit, 'success'));
        navigate(-1);
      });
    } catch (error) {
      dispatch(showAlert(TeamError.edit, 'error'));
    }
  };

  if (error || updateError)
    return <ErrorGraphql error={[error, updateError]} />;
  return (
    <RouteGuard authorization={AUTH_ROLES.TEAM_ADMIN} teamId={teamId}>
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
