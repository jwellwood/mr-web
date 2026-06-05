import { useQuery } from '@apollo/client/react';
import { useTranslation } from 'react-i18next';
import { DataError, NoDataText } from '../../../components';
import { Spinner } from '../../../components/loaders';
import { CustomTabs } from '../../../components/tabs';
import { TAB_TYPES } from '../../../constants';
import { useCustomParams } from '../../../hooks';
import LeagueTable from '../components/league-table/LeagueTable';
import ResultsAccordion from '../components/results-list/ResultsAccordion';
import {
  FETCH_LEAGUE_TABLES,
  FETCH_RESULTS,
  T_FETCH_LEAGUE_TABLES,
  T_FETCH_RESULTS,
} from '../graphql';
import useCompetitionConfig from '../hooks/useCompetitionConfig';

type TResultsItem = T_FETCH_RESULTS['results'][number];
type TLeagueTableItem = T_FETCH_LEAGUE_TABLES['data'][number];

interface CompetitionView {
  id: string;
  name: string;
  priority: number;
  results: TResultsItem[];
  table?: TLeagueTableItem;
}

export default function Competitions() {
  const { t } = useTranslation(['results', 'organization']);
  const { orgId, orgSeasonId } = useCustomParams();
  const variables = { orgId: orgId!, orgSeasonId: orgSeasonId || 'default' };

  const {
    data: resultsData,
    error: resultsError,
    loading: resultsLoading,
  } = useQuery(FETCH_RESULTS, { variables });
  const {
    data: tablesData,
    error: tablesError,
    loading: tablesLoading,
  } = useQuery(FETCH_LEAGUE_TABLES, { variables });
  const { competitionConfig, loading: configLoading, error: configError } = useCompetitionConfig();

  const resultsByCompetition = (resultsData?.results || []).reduce<Record<string, CompetitionView>>(
    (acc, result) => {
      const id = result.competitionId?._id ?? result.competitionId?.name ?? 'other';
      const name = result.competitionId?.name ?? t('OTHER_COMPETITION');
      if (!acc[id]) {
        acc[id] = {
          id,
          name,
          priority: Number.MAX_SAFE_INTEGER,
          results: [],
        };
      }
      acc[id].results.push(result);
      return acc;
    },
    {}
  );

  const tableByCompetition = (tablesData?.data || []).reduce<Record<string, TLeagueTableItem>>(
    (acc, table) => {
      const id = table.competition?._id ?? table.competition?.name ?? 'other';
      acc[id] = table;
      return acc;
    },
    {}
  );

  const competitionIds = new Set([
    ...Object.keys(resultsByCompetition),
    ...Object.keys(tableByCompetition),
  ]);
  const competitions: CompetitionView[] = Array.from(competitionIds).map(id => {
    const resultCompetition = resultsByCompetition[id];
    const tableCompetition = tableByCompetition[id];
    const name =
      resultCompetition?.name ?? tableCompetition?.competition?.name ?? t('OTHER_COMPETITION');
    const config = competitionConfig?.find(c => c.id === id || c.name === name);
    const priority = config?.priority ?? tableCompetition?.priority ?? Number.MAX_SAFE_INTEGER;

    return {
      id,
      name,
      priority,
      results: resultCompetition?.results ?? [],
      table: tableCompetition,
    };
  });

  competitions.sort((a, b) => a.priority - b.priority || a.name.localeCompare(b.name));

  if (resultsLoading || tablesLoading || configLoading) return <Spinner />;

  const hasError = resultsError || tablesError || configError;
  if (hasError) return <DataError error={hasError} />;

  if (!competitions.length) return <NoDataText>{t('NO_DATA.RESULTS')}</NoDataText>;

  const competitionTabs = competitions.map(competition => ({
    label: competition.name,
    component: (
      <CustomTabs
        type={TAB_TYPES.COMPETITION_VIEW}
        level="secondary"
        tabs={[
          {
            label: t('organization:TABS.TABLES'),
            component: competition.table ? (
              <LeagueTable data={competition.table} />
            ) : (
              <NoDataText>{t('NO_DATA.TABLE')}</NoDataText>
            ),
          },
          {
            label: t('organization:TABS.MATCHES'),
            component: competition.results.length ? (
              <ResultsAccordion results={competition.results} />
            ) : (
              <NoDataText>{t('NO_DATA.RESULTS')}</NoDataText>
            ),
          },
        ]}
      />
    ),
  }));

  return (
    <CustomTabs type={TAB_TYPES.RESULTS_COMPETITIONS} tabs={competitionTabs} level="buttons" />
  );
}
