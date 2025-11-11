import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_SEASON, FETCH_SEASONS_POSITION, FETCH_SEASONS } from '../graphql';

import { initialTeamSeasonState } from './state.ts';
import { PAGES } from '../constants.ts';
import { useSeasonInput } from '../hooks/useSeasonInput.ts';
import { ITeamSeasonInput } from '../types/index.ts';
import { useCustomParams } from '../../../hooks/useCustomParams.tsx';
import { AppDispatch } from '../../../store/store.ts';
import { showAlert } from '../../../store/features/alerts/alertsSlice.ts';
import ErrorGraphql from '../../../errors/ErrorGraphql.tsx';
import RouteGuard from '../../../router/RouteGuard.tsx';
import { AuthRoles } from '../../../constants.ts';
import { PageHeader } from '../../../components/typography/';
import { Spinner } from '../../../components/loaders/';
import { mapFormDataToSeason } from './seasons.mapper.ts';
import SeasonForm from './components/SeasonForm.tsx';

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
    <RouteGuard authorization={AuthRoles.TEAM_ADMIN}>
      <PageHeader title={PAGES.ADD_SEASON} />
      {error || orgError ? <ErrorGraphql error={(error || orgError) as Error} /> : renderContent()}
    </RouteGuard>
  );
}
