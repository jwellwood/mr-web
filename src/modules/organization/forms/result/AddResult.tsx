import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../../../components';
import Spinner from '../../../../components/loaders/Spinner';
import { useCustomParams } from '../../../../hooks';
import { AppDispatch, showAlert } from '../../../../store';
import { PAGES } from '../../constants';
import { ADD_RESULT, FETCH_RESULTS } from '../../graphql';
import { useTeamOptions, useCompetitionOptions, useOrgSeasonOptions } from '../../hooks';
import ResultForm from './ResultForm';
import { initialResultState } from './state';
import type { ResultFormData } from './validation';

export default function AddResult() {
  const { orgId, orgSeasonId } = useCustomParams();

  const { teamOptions, loading: teamsLoading } = useTeamOptions();
  const { competitionOptions, loading: competitionsLoading } = useCompetitionOptions();
  const { orgSeasonOptions, loading: orgSeasonsLoading } = useOrgSeasonOptions();

  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [defaultValues] = useState<ResultFormData>(initialResultState);

  const [addResult, { error, loading }] = useMutation(ADD_RESULT, {
    refetchQueries: [
      { query: FETCH_RESULTS, variables: { orgId, orgSeasonId: orgSeasonId || 'default' } },
    ],
  });

  const onSubmit = async (formData: ResultFormData) => {
    try {
      return addResult({
        variables: { orgId, ...formData },
      }).then(() => {
        dispatch(showAlert({ text: 'Result added successfully!', type: 'success' }));
        navigate(-1);
      });
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: 'Something went wrong', type: 'error' }));
    }
  };

  const isLoading = loading || teamsLoading || orgSeasonsLoading || competitionsLoading;

  if (isLoading) {
    return (
      <PageHeader title={PAGES.ADD_RESULT}>
        <Spinner />
      </PageHeader>
    );
  }

  return (
    <PageHeader title={PAGES.ADD_RESULT}>
      <ResultForm
        competitionOptions={competitionOptions}
        teamOptions={teamOptions}
        orgSeasonOptions={orgSeasonOptions}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        loading={isLoading}
        error={error}
      />
    </PageHeader>
  );
}
