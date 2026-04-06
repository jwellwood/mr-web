import { useQuery } from '@apollo/client/react';
import { useTranslation } from 'react-i18next';
import { useCustomParams } from '../../../hooks/useCustomParams';
import SquadRecordsInMatchesView from '../components/squad-records/squad-most-in-match-records/SquadRecordsInMatchesView';
import { FETCH_SQUAD_RECORD_GOALS_IN_MATCH } from '../graphql';

export default function SquadMostGoalsInMatch() {
  const { t } = useTranslation('squad');
  const { teamId } = useCustomParams();
  const { data, loading, error } = useQuery(FETCH_SQUAD_RECORD_GOALS_IN_MATCH, {
    variables: { teamId: teamId! },
  });

  return (
    <SquadRecordsInMatchesView
      title={t('HEADERS.GOALS')}
      loading={loading}
      error={error}
      data={data}
    />
  );
}
