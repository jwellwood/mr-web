import { useMutation, useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../../../components';
import { Spinner } from '../../../../components/loaders';
import { useCustomParams } from '../../../../hooks';
import { AppDispatch, showAlert } from '../../../../store';
import { PAGES } from '../../constants';
import { EDIT_RESULT, FETCH_LEAGUE_TABLES, FETCH_RESULT, FETCH_RESULTS } from '../../graphql';
import { useCompetitionOptions } from '../../hooks/useCompetitionOptions';
import { useOrgSeasonOptions } from '../../hooks/useOrgSeasonOptions';
import { useTeamOptions } from '../../hooks/useTeamOptions';
import DeleteResult from './DeleteResult';
import ResultForm from './ResultForm';
import type { ResultFormData } from './validation';

export default function EditResult() {
  const { orgId, orgSeasonId, resultId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const { teamOptions, loading: teamsLoading } = useTeamOptions();
  const { competitionOptions, loading: competitionsLoading } = useCompetitionOptions();
  const { orgSeasonOptions, loading: orgSeasonsLoading } = useOrgSeasonOptions();
  const { loading, error, data, refetch } = useQuery(FETCH_RESULT, {
    variables: { resultId },
    notifyOnNetworkStatusChange: true,
  });

  const defaultValues: ResultFormData | null = useMemo(() => {
    if (!data?.result) return null;
    const result = data.result;
    const { homeTeam, awayTeam, competitionId, orgSeasonId } = result;
    return {
      ...result,
      date: new Date(result.date),
      competitionId: competitionId._id,
      orgSeasonId: orgSeasonId._id,
      homeTeam: homeTeam._id,
      awayTeam: awayTeam._id,
    } as ResultFormData;
  }, [data]);

  const [editResult, { error: editError, loading: editLoading }] = useMutation(EDIT_RESULT, {
    variables: { orgId, orgSeasonId, resultId },
    refetchQueries: [
      { query: FETCH_RESULTS, variables: { orgId, orgSeasonId } },
      { query: FETCH_LEAGUE_TABLES, variables: { orgId, orgSeasonId } },
    ],
  });

  const onSubmit = async (formData: ResultFormData) => {
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

  const isLoading =
    loading || editLoading || teamsLoading || competitionsLoading || orgSeasonsLoading;

  const renderContent = () => {
    return defaultValues ? (
      <>
        <ResultForm
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          teamOptions={teamOptions}
          competitionOptions={competitionOptions}
          orgSeasonOptions={orgSeasonOptions}
          loading={isLoading}
          error={error || editError}
        />
        <DeleteResult />
      </>
    ) : (
      <Spinner />
    );
  };

  return <PageHeader title={PAGES.EDIT_RESULT}>{renderContent()}</PageHeader>;
}
