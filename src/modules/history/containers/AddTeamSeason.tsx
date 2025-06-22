import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { initialTeamSeasonState } from '../mappers/season-initial-state.ts';
import { PAGES } from '../constants.ts';
import SeasonForm from '../forms/SeasonForm';
import { ADD_TEAM_SEASON, GET_POSITION_FINISHES, GET_TEAM_SEASONS } from '../graphql/season';
import { useSeasonInput } from '../hooks/useSeasonInput';
import { ITeamSeasonInput } from '../types';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { AppDispatch } from '../../../store/store';
import { showAlert } from '../../../store/features/alerts/alertsSlice';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import RouteGuard from '../../../router/RouteGuard.tsx';
import { AuthRoles } from '../../../constants.ts';
import { PageHeader } from '../../../components/typography';
import { Spinner } from '../../../components/loaders';
import { mapFormDataToSeason } from '../mappers/seasons.mapper.ts';

const AddTeamSeason: React.FC = () => {
  const { orgId, teamId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [defaultValues, setDefaultValues] = useState<ITeamSeasonInput | null>(null);

  const { competitionOptions, orgError, orgLoading } = useSeasonInput(orgId);

  const [addTeamSeason, { error, loading }] = useMutation(ADD_TEAM_SEASON, {
    refetchQueries: [
      { query: GET_TEAM_SEASONS, variables: { teamId } },
      { query: GET_POSITION_FINISHES, variables: { teamId } },
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

  const children =
    error || orgError ? (
      <ErrorGraphql error={(error || orgError) as Error} />
    ) : !loading && !orgLoading && defaultValues ? (
      <SeasonForm
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        competitionOptions={competitionOptions}
      />
    ) : (
      <Spinner />
    );

  return (
    <RouteGuard authorization={AuthRoles.TEAM_ADMIN}>
      <PageHeader title={PAGES.ADD_SEASON} />
      {children}
    </RouteGuard>
  );
};

export default AddTeamSeason;
