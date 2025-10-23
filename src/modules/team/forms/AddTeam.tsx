import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_TEAM } from '../graphql';
import { FETCH_ORG_TEAMS } from '../../organization/graphql';
import { FETCH_TEAMS_BY_USER } from '../../profile/graphql';
import { PAGES, TeamError, TeamSuccess } from '../constants';
import AddTeamForm from './components/AddTeamForm';
import { ITeamDetailsInput } from '../types';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { AppDispatch } from '../../../store/store';
import { useNationality } from '../../../hooks';
import { showAlert } from '../../../store/features/alerts/alertsSlice.ts';
import RouteGuard from '../../../router/RouteGuard.tsx';
import PageHeader from '../../../components/typography/PageHeader.tsx';
import { AUTH_ROLES } from '../../../app/constants.ts';
import { Spinner } from '../../../components/loaders';
import ErrorGraphql from '../../../errors/ErrorGraphql.tsx';
import { initialTeamDetailsState } from './state.ts';

export default function AddTeam() {
  const { orgId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { nationalityOptions } = useNationality();

  const [defaultValues] = useState<Partial<ITeamDetailsInput>>({ ...initialTeamDetailsState });

  const [addTeam, { error, loading }] = useMutation(ADD_TEAM, {
    refetchQueries: [
      {
        query: FETCH_ORG_TEAMS,
        variables: { orgId },
      },
      { query: FETCH_TEAMS_BY_USER },
    ],
  });

  const onSubmit = async (data: Partial<ITeamDetailsInput>) => {
    try {
      return addTeam({ variables: { orgId, ...data } }).then(() => {
        dispatch(
          showAlert({
            text: TeamSuccess.edit,
            type: 'success',
          })
        );
        navigate(-1);
      });
    } catch (error) {
      console.error(error);
      dispatch(
        showAlert({
          text: TeamError.edit,
          type: 'error',
        })
      );
    }
  };

  const renderContent = () => {
    return !loading && defaultValues ? (
      <AddTeamForm
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        countryOptions={nationalityOptions}
      />
    ) : (
      <Spinner />
    );
  };

  return (
    <RouteGuard authorization={AUTH_ROLES.USER}>
      <PageHeader title={PAGES.ADD_TEAM} />
      {error ? <ErrorGraphql error={error} /> : renderContent()}
    </RouteGuard>
  );
}
