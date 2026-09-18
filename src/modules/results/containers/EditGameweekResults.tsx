import { useMutation, useQuery } from '@apollo/client/react';
import { lazy, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCustomParams } from '../../../hooks';
import { AppDispatch, showAlert } from '../../../store';
import { useOrgSeasonOptions } from '../../seasons/hooks/useOrgSeasonOptions';
import { FETCH_LEAGUE_TABLES } from '../../tables/graphql';
import { MatchRow } from '../forms/batch-result/BatchResultForm';
import { type BatchResultFormData } from '../forms/batch-result/schema';
import { ResultFormData } from '../forms/result/schema';
import { ADD_RESULT, DELETE_RESULT, EDIT_RESULT, FETCH_RESULTS } from '../graphql';
import {
  getGameweekChanges,
  mapFormToAddResult,
  mapFormToEditResult,
  mapResultsToBatchForm,
} from '../helpers/mapResultForm';

const EditRoundPage = lazy(() => import('../pages/EditRoundPage'));

export default function EditGameweekResults() {
  const { t } = useTranslation('results');
  const { orgId, orgSeasonId, gameWeek } = useCustomParams();
  const [searchParams] = useSearchParams();
  // competitionId isn't part of the gameweek route path, it's passed as a query param
  const competitionId = searchParams.get('competitionId') || undefined;
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { orgSeasonOptions, loading: orgSeasonsLoading } = useOrgSeasonOptions();

  const { loading, error, data } = useQuery(FETCH_RESULTS, {
    variables: { orgId: orgId!, orgSeasonId: orgSeasonId!, competitionId: competitionId! },
    skip: !orgId || !orgSeasonId || !competitionId,
  });

  const gameweekResults = useMemo(
    () => (data?.results || []).filter(r => String(r.gameWeek) === String(gameWeek)),
    [data, gameWeek]
  );

  const defaultValues: BatchResultFormData | null = useMemo(() => {
    if (!gameweekResults.length) return null;
    return mapResultsToBatchForm(gameweekResults);
  }, [gameweekResults]);

  const refetchQueries = [
    {
      query: FETCH_RESULTS,
      variables: { orgId: orgId!, orgSeasonId: orgSeasonId!, competitionId: competitionId! },
    },
    {
      query: FETCH_LEAGUE_TABLES,
      variables: { orgId: orgId!, orgSeasonId: orgSeasonId!, compId: competitionId! },
    },
  ];

  const [addResult, { loading: addLoading }] = useMutation(ADD_RESULT, {
    onError: err => dispatch(showAlert({ text: err.message, type: 'error' })),
  });
  const [editResult, { loading: editLoading }] = useMutation(EDIT_RESULT, {
    onError: err => dispatch(showAlert({ text: err.message, type: 'error' })),
  });
  const [deleteResult, { loading: deleteLoading }] = useMutation(DELETE_RESULT, {
    refetchQueries,
    awaitRefetchQueries: true,
    onError: err => dispatch(showAlert({ text: err.message, type: 'error' })),
  });

  const onSubmit = async (formData: BatchResultFormData) => {
    try {
      const { toAdd, toUpdate, toDelete } = getGameweekChanges(gameweekResults, formData);

      const addPromises = toAdd.map((match: MatchRow) => {
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
          isBye: match.isBye,
        };
        const variables = mapFormToAddResult(single as ResultFormData, orgId!, orgSeasonId);
        return addResult({ variables });
      });

      const updatePromises = toUpdate.map(({ _id, match }) => {
        const original = gameweekResults.find(r => r._id === _id);
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
          isBye: match.isBye,
          isComplete: original?.isComplete ?? false,
          decision: original?.decision ?? null,
          winnerSide: original?.winnerSide ?? null,
        };
        const variables = mapFormToEditResult(single as ResultFormData, orgId!, _id);
        return editResult({ variables });
      });

      const deletePromises = toDelete.map(id =>
        deleteResult({ variables: { orgId: orgId!, resultId: id } })
      );

      await Promise.all([...addPromises, ...updatePromises, ...deletePromises]);

      dispatch(showAlert({ text: t('ALERTS.EDIT_GAMEWEEK.SUCCESS'), type: 'success' }));
      navigate(-1);
    } catch (err) {
      console.error(err);
      dispatch(showAlert({ text: t('ALERTS.EDIT_GAMEWEEK.ERROR'), type: 'error' }));
    }
  };

  const isLoading = loading || addLoading || editLoading || deleteLoading || orgSeasonsLoading;

  return (
    <EditRoundPage
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      loading={isLoading}
      error={error}
      orgSeasonOptions={orgSeasonOptions}
      originalCount={gameweekResults.length}
    />
  );
}
