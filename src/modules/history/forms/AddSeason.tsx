import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ApolloError, useMutation } from '@apollo/client';

import { ADD_SEASON, FETCH_SEASONS_POSITION, FETCH_SEASONS } from '../graphql';

import { initialTeamSeasonState } from './state.ts';
import { PAGES } from '../constants';
import { useSeasonInput } from '../hooks/useSeasonInput.ts';
import { ITeamSeasonInput } from '../types';
import { useCustomParams } from '../../../hooks/useCustomParams.tsx';
import { AppDispatch } from '../../../store/store.ts';
import { showAlert } from '../../../store/features/alerts/alertsSlice.ts';
import RouteGuard from '../../../router/RouteGuard.tsx';
import { AUTH_ROLES } from '../../../constants';
import { Spinner } from '../../../components/loaders/';
import { mapFormDataToSeason } from './seasons.mapper.ts';
import SeasonForm from './components/SeasonForm.tsx';
import { DataError, PageHeader } from '../../../components';

export default function AddTeamSeason() {
  const { orgId, teamId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [defaultValues, setDefaultValues] = useState<ITeamSeasonInput | null>(null);

  const { competitionOptions, orgError, orgLoading } = useSeasonInput(orgId);

  const [addTeamSeason, { error, loading }] = useMutation(ADD_SEASON, {
    refetchQueries: [
      { query: FETCH_SEASONS, variables: { teamId } },
      { query: FETCH_SEASONS_POSITION, variables: { teamId } },
    ],
  });

  useEffect(() => {
    setDefaultValues({ ...initialTeamSeasonState });
  }, []);

  const onSubmit = async (formData: ITeamSeasonInput) => {
    try {
      return addTeamSeason({
        variables: {
          teamId,
          ...mapFormDataToSeason(formData),
        },
      }).then(() => {
        dispatch(showAlert({ text: 'Season added successfully', type: 'success' }));
        navigate(-1);
      });
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: 'There was a problem', type: 'error' }));
    }
  };

  const renderContent = () => {
    return !loading && !orgLoading && defaultValues ? (
      <SeasonForm
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        competitionOptions={competitionOptions}
      />
    ) : (
      <Spinner />
    );
  };

  return (
    <RouteGuard authorization={AUTH_ROLES.TEAM_ADMIN}>
      <PageHeader title={PAGES.ADD_SEASON}>
        {error || orgError ? (
          <DataError error={(error || orgError) as ApolloError} />
        ) : (
          renderContent()
        )}
      </PageHeader>
    </RouteGuard>
  );
}
