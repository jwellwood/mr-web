import { TMatchOpponentFilters, useMatchOpponentFilters } from '../../../context';
import OpponentsFiltersForm from './OpponentsFiltersForm';

export default function MatchOpponentsFilters() {
  const { setFilters } = useMatchOpponentFilters();

  const onSubmit = (values: TMatchOpponentFilters) => setFilters(values);

  const onReset = () => setFilters({ showAllTeams: false, includeForfeits: true });
  return (
    <OpponentsFiltersForm
      onSubmit={onSubmit}
      onReset={onReset}
      defaultValues={{
        showAllTeams: false,
        includeForfeits: true,
      }}
    />
  );
}
