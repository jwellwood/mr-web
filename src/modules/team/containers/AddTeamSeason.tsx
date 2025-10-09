import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { PAGES, initialTeamDetailsState, TeamError, TeamSuccess } from '../constants';
import AddTeamForm from '../forms/AddTeamForm';
import { ADD_TEAM } from '../graphql';
import { ITeamDetailsInput } from '../types';
import { useCustomParams } from '../../../hooks/useCustomParams.tsx';
import { AppDispatch } from '../../../store/store.ts';
import { useNationality } from '../../../hooks';
import { FETCH_ORG_TEAMS } from '../../organization/graphql';
import { FETCH_TEAMS_BY_USER } from '../../profile/graphql';
import { showAlert } from '../../../store/features/alerts/alertsSlice.ts';
import ErrorGraphql from '../../../errors/ErrorGraphql.tsx';
import RouteGuard from '../../../router/RouteGuard.tsx';
import { AUTH_ROLES } from '../../../app/constants.ts';
import { PageHeader } from '../../../components/typography';
import { Spinner } from '../../../components/loaders';

const AddTeamSeason: React.FC = () => {
  const { teamId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { nationalityOptions } = useNationality();

  const [defaultValues, setDefaultValues] = useState<Partial<ITeamDetailsInput>>({});

  const [addTeam, { error, loading }] = useMutation(ADD_TEAM, {
    refetchQueries: [
      {
        query: FETCH_ORG_TEAMS,
        variables: { teamId },
      },
      { query: FETCH_TEAMS_BY_USER },
    ],
  });

  useEffect(() => {
    setDefaultValues({ ...initialTeamDetailsState });
  }, []);

  const onSubmit = async (data: Partial<ITeamDetailsInput>) => {
    try {
      return addTeam({ variables: { teamId, ...data } }).then(res => {
        dispatch(
          showAlert({
            text: TeamSuccess.edit,
            type: 'success',
          })
        );
        if (res.data) {
          navigate(`team/${res.data.team._id}`);
        }
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

  if (error) return <ErrorGraphql error={error} />;

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

export default AddTeamSeason;
