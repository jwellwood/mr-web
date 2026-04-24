import { DataError } from '../../../components';
import { CustomSkeleton } from '../../../components/loaders';
import CustomTabs from '../../../components/tabs/custom-tabs/CustomTabs';
import { TAB_TYPES, TTabType } from '../../../constants';
import { T_FETCH_FIXTURES, T_FETCH_RESULTS } from '../graphql';
import useCompetitionConfig from '../hooks/useCompetitionConfig';
import ResultsAccordion from './results-list/ResultsAccordion';

interface Props {
  matches: T_FETCH_RESULTS['results'] | T_FETCH_FIXTURES['fixtures'];
  type: TTabType;
}

export default function CompetitionTabs({ matches, type }: Props) {
  const { competitionConfig, loading, error } = useCompetitionConfig();
  const getCompetitionId = (
    item: T_FETCH_RESULTS['results'][number] | T_FETCH_FIXTURES['fixtures'][number]
  ) => item.competitionId?._id ?? item.competitionId?.name ?? 'other';
  const getCompetitionName = (
    item: T_FETCH_RESULTS['results'][number] | T_FETCH_FIXTURES['fixtures'][number]
  ) => item.competitionId?.name ?? 'Other';

  // group by competition id
  const competitions = matches.reduce<
    Record<
      string,
      {
        name: string;
        results: (T_FETCH_RESULTS['results'][number] | T_FETCH_FIXTURES['fixtures'][number])[];
      }
    >
  >(
    (acc, item) => {
      const id = getCompetitionId(item);
      const name = getCompetitionName(item);
      if (!acc[id]) acc[id] = { name, results: [] };
      acc[id].results.push(item);
      return acc;
    },
    {} as Record<
      string,
      {
        name: string;
        results: (T_FETCH_RESULTS['results'][number] | T_FETCH_FIXTURES['fixtures'][number])[];
      }
    >
  );

  const comps = Object.entries(competitions).map(([id, { name, results }]) => {
    const config = competitionConfig?.find(c => c.id === id || c.name === name);
    const priority = config?.priority ?? Number.MAX_SAFE_INTEGER;
    return { id, name, results, priority };
  });

  comps.sort((a, b) => a.priority - b.priority || a.name.localeCompare(b.name));

  const tabs = comps.map(comp => ({
    label: comp.name,
    component: (
      <ResultsAccordion
        results={comp.results}
        isFixture={type === TAB_TYPES.FIXTURES_COMPETITIONS}
      />
    ),
  }));

  return (
    <>
      {error && <DataError error={error} />}
      {loading ? (
        <CustomSkeleton width="100%" height="48px" />
      ) : (
        <CustomTabs type={type} tabs={tabs} level="secondary" />
      )}
    </>
  );
}
