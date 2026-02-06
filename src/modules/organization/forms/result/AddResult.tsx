import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_RESULT, FETCH_RESULTS } from '../../graphql';
import { PAGES } from '../../constants';
import { useCustomParams } from '../../../../hooks';
import { AppDispatch, showAlert } from '../../../../store';
import Spinner from '../../../../components/loaders/Spinner';
import { PageHeader } from '../../../../components';
import { useTeamOptions, useCompetitionOptions, useOrgSeasonOptions } from '../../hooks';
import { initialResultState } from './state';
import type { ResultFormData } from './validation';
import ResultForm from './ResultForm';

export default function AddResult() {
  const { orgId, orgSeasonId } = useCustomParams();

  const { teamOptions, loading: teamsLoading } = useTeamOptions();
  const { competitionOptions, loading: competitionsLoading } = useCompetitionOptions();
  const { orgSeasonOptions, loading: orgSeasonsLoading } = useOrgSeasonOptions();

  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [defaultValues, setDefaultValues] = useState<ResultFormData | null>(null);

  const [addResult, { error, loading }] = useMutation(ADD_RESULT, {
    refetchQueries: [
      { query: FETCH_RESULTS, variables: { orgId, orgSeasonId: orgSeasonId || 'default' } },
    ],
  });

  useEffect(() => {
    setDefaultValues({ ...initialResultState });
  }, []);

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

  const renderContent = () => {
    return defaultValues ? (
      <ResultForm
        competitionOptions={competitionOptions}
        teamOptions={teamOptions}
        orgSeasonOptions={orgSeasonOptions}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        loading={isLoading}
        error={error}
      />
    ) : (
      <Spinner />
    );
  };

  return <PageHeader title={PAGES.ADD_RESULT}>{renderContent()}</PageHeader>;
}
