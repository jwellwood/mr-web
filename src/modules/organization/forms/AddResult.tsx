import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_RESULT, FETCH_RESULTS } from '../graphql/index.ts';
import { AuthRoles } from '../../../constants.ts';
import { PAGES } from '../constants.ts';
import { initialResultState } from './state.ts';
import { useCustomParams } from '../../../hooks/useCustomParams.tsx';
import { showAlert } from '../../../store/features/alerts/alertsSlice.ts';
import { AppDispatch } from '../../../store/store.ts';
import ErrorGraphql from '../../../errors/ErrorGraphql.tsx';
import RouteGuard from '../../../router/RouteGuard.tsx';
import Spinner from '../../../components/loaders/Spinner.tsx';
import { IResultInput } from '../types.ts';
import { PageHeader } from '../../../components/index.ts';
import ResultForm from './components/ResultForm.tsx';
import { useTeamOptions, useCompetitionOptions, useOrgSeasonOptions } from '../hooks';

export default function AddResult() {
  const { orgId, orgSeasonId } = useCustomParams();

  const { teamOptions, loading: teamsLoading } = useTeamOptions();
  const { competitionOptions, loading: competitionsLoading } = useCompetitionOptions();
  const { orgSeasonOptions, loading: orgSeasonsLoading } = useOrgSeasonOptions();

  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [defaultValues, setDefaultValues] = useState<IResultInput | null>(null);

  const [addResult, { error, loading }] = useMutation(ADD_RESULT, {
    refetchQueries: [
      { query: FETCH_RESULTS, variables: { orgId, orgSeasonId: orgSeasonId || 'default' } },
    ],
  });

  useEffect(() => {
    setDefaultValues({ ...initialResultState });
  }, []);

  const onSubmit = async (formData: IResultInput) => {
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
    return !isLoading && defaultValues ? (
      <ResultForm
        competitionOptions={competitionOptions}
        teamOptions={teamOptions}
        orgSeasonOptions={orgSeasonOptions}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
      />
    ) : (
      <Spinner />
    );
  };

  return (
    <RouteGuard authorization={AuthRoles.ORG_ADMIN}>
      <PageHeader title={PAGES.ADD_RESULT}>
        {error ? <ErrorGraphql error={error} /> : renderContent()}
      </PageHeader>
    </RouteGuard>
  );
}
