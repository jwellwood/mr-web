import { useQuery } from '@apollo/client/react';
import { useTranslation } from 'react-i18next';
import { DataError } from '../../../components';
import { Spinner } from '../../../components/loaders';
import { CustomTabs } from '../../../components/tabs';
import { TAB_TYPES } from '../../../constants';
import { useCustomParams } from '../../../hooks';
import LeagueTable from '../components/league-table/LeagueTable';
import { FETCH_LEAGUE_TABLES } from '../graphql';
import useCompetitionConfig from '../hooks/useCompetitionConfig';

export default function LeagueTables() {
  const { t } = useTranslation('results');
  const { orgId, orgSeasonId } = useCustomParams();
  const { data, error, loading } = useQuery(FETCH_LEAGUE_TABLES, {
    variables: { orgId: orgId!, orgSeasonId: orgSeasonId || 'default' },
  });

  const { competitionConfig, loading: configLoading, error: configError } = useCompetitionConfig();

  const comps =
    data?.data?.map(comp => {
      const id = comp.competition?._id ?? comp.competition?.name ?? 'other';
      const name = comp.competition?.name ?? t('OTHER_COMPETITION');
      const config = competitionConfig?.find(c => c.id === id || c.name === name);
      const priority = config?.priority ?? comp.priority ?? Number.MAX_SAFE_INTEGER;
      return { id, name, comp, priority };
    }) || [];

  comps.sort((a, b) => a.priority - b.priority || a.name.localeCompare(b.name));

  const tabs = comps.map(c => ({
    label: c.name,
    component: <LeagueTable key={c.id} name={c.name} data={c.comp} loading={loading} />,
  }));
  const hasError = error || configError;
  return (
    <>
      {loading || configLoading ? <Spinner /> : hasError ? <DataError error={hasError} /> : null}
      <CustomTabs type={TAB_TYPES.LEAGUE_TABLES} tabs={tabs} level="secondary" />
    </>
  );
}
