import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { AUTH_ROLES } from 'app/constants';
import { Spinner } from 'components/loaders';
import { PageHeader } from 'components/typography';
import ErrorGraphql from 'errors/ErrorGraphql';
import { useNationality } from 'hooks';
import { useCustomParams } from 'hooks/useCustomParams';
import { showAlert } from 'modules/alerts';
import { GET_TEAMS_BY_ORG } from 'modules/organization/graphql';
import { GET_TEAMS_BY_USER_ID } from 'modules/profile/graphql';
import { AppDispatch } from 'reduxStore/rootReducer';
import RouteGuard from 'router/RouteGuard';
import {
  PAGES,
  initialTeamDetailsState,
  TeamError,
  TeamSuccess,
} from '../constants';
import AddTeamForm from '../forms/AddTeamForm';
import { ADD_TEAM } from '../graphql';
import { ITeamDetailsInput } from '../types';

const AddTeamContainer: React.FC = () => {
  const { orgId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { nationalityOptions } = useNationality();

  const [defaultValues, setDefaultValues] =
    useState<Partial<ITeamDetailsInput>>(null);

  const [addTeam, { error, loading }] = useMutation(ADD_TEAM, {
    refetchQueries: [
      {
        query: GET_TEAMS_BY_ORG,
        variables: { orgId },
      },
      { query: GET_TEAMS_BY_USER_ID },
    ],
  });

  useEffect(() => {
    setDefaultValues({ ...initialTeamDetailsState });
  }, []);

  const onSubmit = async (data: Partial<ITeamDetailsInput>) => {
    try {
      return addTeam({ variables: { orgId, ...data } }).then((res) => {
        dispatch(showAlert(TeamSuccess.edit, 'success'));
        navigate(-1);
      });
    } catch (error) {
      dispatch(showAlert(TeamError.edit, 'error'));
    }
  };

  if (error) return <ErrorGraphql error={[error.message]} />;

  return (
    <RouteGuard authorization={AUTH_ROLES.USER}>
      <PageHeader title={PAGES.ADD_TEAM} />
      {!loading && defaultValues ? (
        <AddTeamForm
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

export default AddTeamContainer;
