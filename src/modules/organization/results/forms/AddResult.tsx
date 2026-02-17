import { useMutation } from '@apollo/client/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../../../components';
import Spinner from '../../../../components/loaders/spinner/Spinner';
import { useCustomParams } from '../../../../hooks';
import { AppDispatch, showAlert } from '../../../../store';
import { PAGES } from '../../constants';
import { useCompetitionOptions, useOrgSeasonOptions, useTeamOptions } from '../../hooks';
import { ADD_RESULT, FETCH_RESULTS } from '../graphql';
import { mapFormToAddResult } from '../helpers/mapResultForm';
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
      const variables = mapFormToAddResult(formData, orgId!, orgSeasonId);
      return addResult({
        variables,
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
