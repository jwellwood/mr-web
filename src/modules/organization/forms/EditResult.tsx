import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { EDIT_RESULT, FETCH_LEAGUE_TABLES, FETCH_RESULT, FETCH_RESULTS } from '../graphql/index.ts';

import { PAGES } from '../constants';
import { useCustomParams } from '../../../hooks/useCustomParams.tsx';
import { AppDispatch } from '../../../store/store.ts';
import { showAlert } from '../../../store/features/alerts/alertsSlice.ts';
import ErrorGraphql from '../../../errors/ErrorGraphql.tsx';
import RouteGuard from '../../../router/RouteGuard.tsx';
import { AUTH_ROLES } from '../../../constants';
import { Spinner } from '../../../components/loaders/index.ts';
import { PageHeader } from '../../../components/index.ts';
import { IResultInput } from '../types.ts';
import { useTeamOptions } from '../hooks/useTeamOptions.tsx';
import { useCompetitionOptions } from '../hooks/useCompetitionOptions.tsx';
import { useOrgSeasonOptions } from '../hooks/useOrgSeasonOptions.tsx';
import ResultForm from './components/ResultForm.tsx';
import DeleteResult from '../containers/DeleteResult.tsx';

export default function EditResult() {
  const { orgId, orgSeasonId, resultId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [defaultValues, setDefaultValues] = useState<IResultInput | null>(null);

  const { teamOptions, loading: teamsLoading } = useTeamOptions();
  const { competitionOptions, loading: competitionsLoading } = useCompetitionOptions();
  const { orgSeasonOptions, loading: orgSeasonsLoading } = useOrgSeasonOptions();

  const { loading, error, data, refetch } = useQuery(FETCH_RESULT, {
    variables: { resultId },
    notifyOnNetworkStatusChange: true,
  });

  const [editResult, { error: editError, loading: editLoading }] = useMutation(EDIT_RESULT, {
    variables: { orgId, orgSeasonId, resultId },
    refetchQueries: [
      { query: FETCH_RESULTS, variables: { orgId, orgSeasonId } },
      { query: FETCH_LEAGUE_TABLES, variables: { orgId, orgSeasonId } },
    ],
  });

  useEffect(() => {
    if (data?.result) {
      const result = data.result;
      const { homeTeam, awayTeam, competitionId, orgSeasonId } = result;
      // const selectedComp = competitionOptions.find(comp => comp.value === result.competitionId._id);
      setDefaultValues({
        ...result,
        competitionId: competitionId._id,
        orgSeasonId: orgSeasonId._id,
        homeTeam: homeTeam._id,
        awayTeam: awayTeam._id,
      });
    }
  }, [data]);

  const onSubmit = async (formData: IResultInput) => {
    try {
      return editResult({
        variables: { orgId, resultId, ...formData },
      }).then(() => {
        refetch();
        dispatch(showAlert({ text: 'Season updated successfully', type: 'success' }));
        navigate(-1);
      });
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: 'There was a problem', type: 'error' }));
    }
  };

  const hasError = error || editError;
  const isLoading =
    loading || editLoading || teamsLoading || competitionsLoading || orgSeasonsLoading;

  const renderContent = () => {
    return !isLoading && defaultValues ? (
      <>
        <ResultForm
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          teamOptions={teamOptions}
          competitionOptions={competitionOptions}
          orgSeasonOptions={orgSeasonOptions}
        />
        <DeleteResult />
      </>
    ) : (
      <Spinner />
    );
  };

  return (
    <RouteGuard authorization={AUTH_ROLES.ORG_ADMIN}>
      <PageHeader title={PAGES.EDIT_RESULT}>
        {hasError ? <ErrorGraphql error={(error || editError) as Error} /> : renderContent()}
      </PageHeader>
    </RouteGuard>
  );
}
