import { DataError } from '../../../components';
import { Spinner } from '../../../components/loaders';
import CustomTabs from '../../../components/tabs/custom-tabs/CustomTabs';
import { TabIndex } from '../../../store';
import { T_FETCH_FIXTURES, T_FETCH_RESULTS } from '../graphql';
import useCompetitionConfig from '../hooks/useCompetitionConfig';
import ResultsAccordion from './ResultsAccordion';

interface Props {
  matches: T_FETCH_RESULTS['results'] | T_FETCH_FIXTURES['fixtures'];
  type: TabIndex;
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
    component: <ResultsAccordion results={comp.results} />,
  }));

  return (
    <>
      {error && <DataError error={error} />}
      {loading ? <Spinner /> : <CustomTabs type={type} tabs={tabs} level="secondary" />}
    </>
  );
}
