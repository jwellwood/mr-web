import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_SEASON, FETCH_SEASONS_POSITION } from '../../graphql';
import { PAGES } from '../../constants';
import { useSeasonInput } from '../../hooks/useSeasonInput';
import { useCustomParams } from '../../../../hooks';
import { AppDispatch, showAlert } from '../../../../store';
import RouteGuard from '../../../../router/RouteGuard';
import { AUTH_ROLES } from '../../../../constants';
import { Spinner } from '../../../../components/loaders/';
import { PageHeader } from '../../../../components';
import type { SeasonFormData } from './validation';
import { initialTeamSeasonState } from './state';
import SeasonForm from './SeasonForm';
import { mapSeasonForm } from '../../helpers/mapSeasonForm';

export default function AddTeamSeason() {
  const { orgId, teamId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [defaultValues, setDefaultValues] = useState<SeasonFormData | null>(null);

  const { competitionOptions, orgError, orgLoading } = useSeasonInput(orgId);

  const [addTeamSeason, { error, loading }] = useMutation(ADD_SEASON, {
    refetchQueries: [{ query: FETCH_SEASONS_POSITION, variables: { teamId } }],
  });

  useEffect(() => {
    setDefaultValues({ ...initialTeamSeasonState });
  }, []);

  const onSubmit = async (formData: SeasonFormData) => {
    try {
      return addTeamSeason({
        variables: {
          teamId: teamId!,
          ...mapSeasonForm.toVariables(formData),
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
    return defaultValues ? (
      <SeasonForm
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        competitionOptions={competitionOptions}
        loading={loading || orgLoading}
        error={error || orgError}
      />
    ) : (
      <Spinner />
    );
  };

  return (
    <RouteGuard authorization={AUTH_ROLES.TEAM_ADMIN}>
      <PageHeader title={PAGES.ADD_SEASON}>{renderContent()}</PageHeader>
    </RouteGuard>
  );
}
