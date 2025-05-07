import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { AUTH_ROLES } from 'app/constants';
import { Spinner } from 'components/loaders';
import { PageHeader } from 'components/typography';
import ErrorGraphql from 'errors/ErrorGraphql';
import { useCustomParams } from 'hooks/useCustomParams';
import { showAlert } from 'modules/alerts';
import { AppDispatch } from 'reduxStore/rootReducer';
import RouteGuard from 'router/RouteGuard';
import { PAGES, initialTeamSeasonState } from '../constants';
import SeasonForm from '../forms/SeasonForm';
import { ADD_TEAM_SEASON } from '../graphql/addTeamSeason.graphql';
import { GET_TEAM_SEASONS } from '../graphql/getTeamSeasons.graphql';
import { useSeasonInput } from '../hooks/useSeasonInput';
import { ITeamSeason } from '../types';

const AddTeamSeason: React.FC = () => {
  const { orgId, teamId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [defaultValues, setDefaultValues] =
    useState<Partial<ITeamSeason>>(null);

  const { competitionOptions, orgError, orgLoading } = useSeasonInput(orgId);

  const [addTeamSeason, { error, loading }] = useMutation(ADD_TEAM_SEASON, {
    refetchQueries: [{ query: GET_TEAM_SEASONS, variables: { teamId } }],
  });

  useEffect(() => {
    setDefaultValues({ ...initialTeamSeasonState });
  }, []);

  const onSubmit = async (formData: Partial<ITeamSeason>) => {
    try {
      return addTeamSeason({
        variables: {
          teamId,
          ...formData,
          leaguePosition: +formData.leaguePosition,
        },
      }).then((res) => {
        dispatch(showAlert('Season added successfully', 'success'));
        navigate(-1);
      });
    } catch (error) {
      dispatch(showAlert('There was a problem', 'error'));
    }
  };

  if (error || orgError) return <ErrorGraphql error={[error, orgError]} />;

  return (
    <RouteGuard authorization={AUTH_ROLES.TEAM_ADMIN} teamId={teamId}>
      <PageHeader title={PAGES.ADD_SEASON} />
      {!loading && !orgLoading && defaultValues ? (
        <SeasonForm
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          competitionOptions={competitionOptions}
        />
      ) : (
        <Spinner />
      )}
    </RouteGuard>
  );
};

export default AddTeamSeason;
