import { useMutation } from '@apollo/client';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../../../components';
import { Spinner } from '../../../../components/loaders/';
import { useCustomParams } from '../../../../hooks';
import { AppDispatch, showAlert } from '../../../../store';
import { PAGES } from '../../constants';
import { ADD_SEASON, FETCH_SEASONS, FETCH_SEASONS_POSITION } from '../../graphql';
import { mapSeasonForm } from '../../helpers/mapSeasonForm';
import { useSeasonInput } from '../../hooks/useSeasonInput';
import SeasonForm from './SeasonForm';
import { initialTeamSeasonState } from './state';
import type { SeasonFormData } from './validation';

export default function AddTeamSeason() {
  const { orgId, teamId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const defaultValues: SeasonFormData = useMemo(() => ({ ...initialTeamSeasonState }), []);

  const { competitionOptions, orgError, orgLoading } = useSeasonInput(orgId);

  const [addTeamSeason, { error, loading }] = useMutation(ADD_SEASON, {
    refetchQueries: [
      { query: FETCH_SEASONS_POSITION, variables: { teamId } },
      { query: FETCH_SEASONS, variables: { teamId } },
    ],
  });

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

  return (
    <PageHeader title={PAGES.ADD_SEASON}>
      {competitionOptions ? (
        <SeasonForm
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          competitionOptions={competitionOptions}
          loading={loading || orgLoading}
          error={error || orgError}
        />
      ) : (
        <Spinner />
      )}
    </PageHeader>
  );
}
