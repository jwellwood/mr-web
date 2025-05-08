import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import {
  PAGES,
  initialTeamDetailsState,
  TeamError,
  TeamSuccess,
} from '../constants';
import AddTeamForm from '../forms/AddTeamForm';
import { ADD_TEAM } from '../graphql';
import { ITeamDetailsInput } from '../types';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { AppDispatch } from '../../../store/store';
import { useNationality } from '../../../hooks';
import { GET_TEAMS_BY_ORG } from '../../organization/graphql';
import { GET_TEAMS_BY_USER_ID } from '../../profile/graphql';
import {showAlert} from "../../../store/features/alerts/alertsSlice.ts";
import RouteGuard from "../../../router/RouteGuard.tsx";
import PageHeader from '../../../components/typography/PageHeader.tsx';
import {AUTH_ROLES} from "../../../app/constants.ts";
import {Spinner} from "../../../components/loaders";

function ErrorGraphql() {
  return null;
}

const AddTeamContainer: React.FC = () => {
  const { orgId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { nationalityOptions } = useNationality();

  const [defaultValues] =
    useState<Partial<ITeamDetailsInput>>({ ...initialTeamDetailsState});

  const [addTeam, { error, loading }] = useMutation(ADD_TEAM, {
    refetchQueries: [
      {
        query: GET_TEAMS_BY_ORG,
        variables: { orgId },
      },
      { query: GET_TEAMS_BY_USER_ID },
    ],
  });

  const onSubmit = async (data: Partial<ITeamDetailsInput>) => {
    try {
      return addTeam({ variables: { orgId, ...data } }).then(() => {
        dispatch(showAlert({
          text: TeamSuccess.edit,
          type: 'success'
        }));
        navigate(-1);
      });
    } catch (error) {
      console.error(error)
      dispatch(showAlert({
        text: TeamError.edit,
          type: 'error'
      },
      ));
    }
  };

  if (error) return <ErrorGraphql />;

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
