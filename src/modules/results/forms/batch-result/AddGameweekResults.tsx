import { useMutation } from '@apollo/client/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../../../components';
import Spinner from '../../../../components/loaders/spinner/Spinner';
import { useCustomParams } from '../../../../hooks';
import { AppDispatch, showAlert } from '../../../../store';
import {
  useCompetitionOptions,
  useOrgSeasonOptions,
  useTeamOptions,
} from '../../../organization/admin/hooks';
import { PAGES } from '../../../organization/constants';
import { ADD_RESULT, FETCH_FIXTURES, FETCH_RESULTS } from '../../graphql';
import { mapFormToAddResult } from '../../helpers/mapResultForm';
import { ResultFormData } from '../result/validation';
import BatchResultForm, { MatchRow } from './BatchResultForm';
import { initialBatchResultState } from './state';
import type { BatchResultFormData } from './validation';

export default function AddGameweekResults() {
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

  const [addResult, { error, loading }] = useMutation(ADD_RESULT, {
    refetchQueries: [
      { query: FETCH_RESULTS, variables: { orgId, orgSeasonId: orgSeasonId || 'default' } },
      { query: FETCH_FIXTURES, variables: { orgId, orgSeasonId: orgSeasonId || 'default' } },
    ],
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

      dispatch(showAlert({ text: `Added ${matchesToCreate.length} results`, type: 'success' }));
      navigate(-1);
    } catch (err) {
      console.error(err);
      dispatch(showAlert({ text: 'Something went wrong', type: 'error' }));
    }
  };

  const isLoading = loading || teamsLoading || orgSeasonsLoading || competitionsLoading;

  return (
    <PageHeader title={PAGES.ADD_GAME_WEEK}>
      {isLoading ? (
        <Spinner />
      ) : (
        <BatchResultForm
          competitionOptions={competitionOptions}
          teamOptions={teamOptions}
          orgSeasonOptions={orgSeasonOptions}
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          loading={isLoading}
          error={error}
        />
      )}
    </PageHeader>
  );
}
