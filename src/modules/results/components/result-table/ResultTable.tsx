import { CustomTable } from '../../../../components';
import { useCustomParams } from '../../../../hooks';
import { T_FETCH_RESULTS } from '../../graphql';
import { columns } from './columns';
import { rows } from './rows';

interface Props {
  results: T_FETCH_RESULTS['results'];
}

export default function ResultTable({ results }: Props) {
  const { orgId, orgSeasonId } = useCustomParams();
  return (
    <CustomTable
      columns={columns}
      rows={rows(results, orgId!, orgSeasonId!)}
      loadingRowCount={10}
      isSortable={false}
    />
  );
}
