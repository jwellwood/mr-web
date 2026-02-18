import { useMutation, useQuery } from '@apollo/client/react';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../../../components';
import { Spinner } from '../../../../components/loaders';
import { useCustomParams } from '../../../../hooks';
import { AppDispatch, showAlert } from '../../../../store';
import { PAGES } from '../../constants';
import { useCompetitionOptions } from '../../hooks/useCompetitionOptions';
import { useOrgSeasonOptions } from '../../hooks/useOrgSeasonOptions';
import { useTeamOptions } from '../../hooks/useTeamOptions';
import { EDIT_RESULT, FETCH_LEAGUE_TABLES, FETCH_RESULT, FETCH_RESULTS } from '../graphql';
import { mapResultToForm, mapFormToEditResult } from '../helpers/mapResultForm';
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
  const { loading, error, data } = useQuery(FETCH_RESULT, {
    variables: { resultId: resultId! },
  });

  const defaultValues: ResultFormData | null = useMemo(() => {
    if (!data?.result) return null;
    return mapResultToForm(data.result);
  }, [data]);

  const [editResult, { error: editError, loading: editLoading }] = useMutation(EDIT_RESULT, {
    refetchQueries: [
      { query: FETCH_RESULT, variables: { resultId: resultId! } },
      { query: FETCH_RESULTS, variables: { orgId: orgId!, orgSeasonId: orgSeasonId! } },
      { query: FETCH_LEAGUE_TABLES, variables: { orgId: orgId!, orgSeasonId: orgSeasonId! } },
    ],
  });

  const onSubmit = async (formData: ResultFormData) => {
    try {
      const variables = mapFormToEditResult(formData, orgId!, resultId!);

      return editResult({ variables }).then(() => {
        dispatch(showAlert({ text: 'Result updated successfully', type: 'success' }));
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
