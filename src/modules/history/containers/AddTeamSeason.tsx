import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { PAGES, initialTeamSeasonState } from '../constants';
import SeasonForm from '../forms/SeasonForm';
import { ADD_TEAM_SEASON } from '../graphql/addTeamSeason.graphql';
import { GET_TEAM_SEASONS } from '../graphql/getTeamSeasons.graphql';
import { useSeasonInput } from '../hooks/useSeasonInput';
import { ITeamSeason } from '../types';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { AppDispatch } from '../../../store/store';
import { showAlert } from '../../../store/features/alerts/alertsSlice';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import RouteGuard from "../../../router/RouteGuard.tsx";
import {AuthRoles} from "../../../constants.ts";
import {PageHeader} from "../../../components/typography";
import {Spinner} from "../../../components/loaders";

const AddTeamSeason: React.FC = () => {
  const { orgId, teamId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [defaultValues, setDefaultValues] =
    useState<Partial<ITeamSeason>>({});

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
          leaguePosition: +(formData.leaguePosition || 0),
        },
      }).then(() => {
        dispatch(showAlert({text: 'Season added successfully', type: 'success'}));
        navigate(-1);
      });
    } catch (error) {
      console.error(error);
      dispatch(showAlert({text: 'There was a problem', type: 'error'}));
    }
  };

  if (error || orgError) return <ErrorGraphql error={(error || orgError) as Error} />;

  return (
    <RouteGuard authorization={AuthRoles.TEAM_ADMIN}>
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
