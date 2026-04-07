import { useMutation } from '@apollo/client/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCustomParams } from '../../../hooks';
import { AppDispatch, showAlert } from '../../../store';
import { useCompetitionOptions } from '../../competitions/hooks/useCompetitionOptions';
import { useOrgSeasonOptions } from '../../seasons/hooks/useOrgSeasonOptions';
import { MatchRow } from '../forms/batch-result/BatchResultForm';
import { initialBatchResultState, type BatchResultFormData } from '../forms/batch-result/schema';
import { ResultFormData } from '../forms/result/schema';
import { ADD_RESULT, FETCH_FIXTURES, FETCH_RESULTS } from '../graphql';
import { mapFormToAddResult } from '../helpers/mapResultForm';
import { useTeamOptions } from '../hooks/useResultInput';
import AddGameweekPage from '../pages/AddGameweekPage';

export default function AddGameweekResults() {
  const { t } = useTranslation('results');
  const { orgId, orgSeasonId } = useCustomParams();
  const { teamOptions, loading: teamsLoading } = useTeamOptions();
  const { competitionOptions, loading: competitionsLoading } = useCompetitionOptions();
  const { orgSeasonOptions, loading: orgSeasonsLoading } = useOrgSeasonOptions();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [defaultValues] = useState<BatchResultFormData>({
    ...initialBatchResultState(orgSeasonId),
    orgSeasonId: orgSeasonId || initialBatchResultState().orgSeasonId,
  });

  const [addResult, { loading }] = useMutation(ADD_RESULT, {
    refetchQueries: [
      { query: FETCH_RESULTS, variables: { orgId, orgSeasonId: orgSeasonId || 'default' } },
      { query: FETCH_FIXTURES, variables: { orgId, orgSeasonId: orgSeasonId || 'default' } },
    ],
    onError: err => dispatch(showAlert({ text: err.message, type: 'error' })),
  });

  const onSubmit = async (formData: BatchResultFormData) => {
    try {
      const matchesToCreate = formData.matches.filter((m: MatchRow) => m.homeTeam && m.awayTeam);
      const promises = matchesToCreate.map((match: MatchRow) => {
        const single = {
          date: typeof formData.date === 'string' ? new Date(formData.date) : formData.date,
          kickoffTime: match.kickoffTime || formData.kickoffTime,
          gameWeek: formData.gameWeek,
          competitionId: formData.competitionId,
          orgSeasonId: formData.orgSeasonId,
          homeTeam: match.homeTeam,
          awayTeam: match.awayTeam,
          homeGoals: match.homeGoals,
          awayGoals: match.awayGoals,
          isForfeit: match.isForfeit,
          isComplete: match.isComplete,
        };
        const variables = mapFormToAddResult(single as ResultFormData, orgId!, orgSeasonId);
        return addResult({ variables });
      });

      await Promise.all(promises);

      dispatch(
        showAlert({
          text: t('ALERTS.ADD_GAMEWEEK.ADDED', { count: matchesToCreate.length }),
          type: 'success',
        })
      );
      navigate(-1);
    } catch (err) {
      console.error(err);
      dispatch(showAlert({ text: t('ALERTS.ADD_GAMEWEEK.ERROR'), type: 'error' }));
    }
  };

  const isLoading = loading || teamsLoading || orgSeasonsLoading || competitionsLoading;

  return (
    <AddGameweekPage
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      loading={isLoading}
      teamOptions={teamOptions}
      competitionOptions={competitionOptions}
      orgSeasonOptions={orgSeasonOptions}
    />
  );
}
