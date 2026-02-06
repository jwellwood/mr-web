import { TPlayerOpponentFilters, usePlayerOpponentFilters } from '../../context';
import OpponentsFiltersForm from './OpponentsFiltersForm';

export default function OpponentsFilters() {
  const { setFilters } = usePlayerOpponentFilters();

  const onSubmit = (values: TPlayerOpponentFilters) => setFilters(values);

  const onReset = () => setFilters({ showAllOpponents: false, showAverages: false });
  return (
    <OpponentsFiltersForm
      onSubmit={onSubmit}
      onReset={onReset}
      defaultValues={{
        showAllOpponents: false,
        showAverages: false,
      }}
    />
  );
}
