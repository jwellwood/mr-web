import { CustomTable } from '../../../../components';
import { useCustomParams } from '../../../../hooks';
import { T_FETCH_RESULTS } from '../../graphql';
import { columns } from './result-table/columns';
import { rows } from './result-table/rows';

interface Props {
  results: T_FETCH_RESULTS['results'];
}

export default function ResultTable({ results }: Props) {
  const { orgId } = useCustomParams();
  return (
    <CustomTable
      columns={columns}
      rows={rows(results, orgId!)}
      loadingRowCount={10}
      isSortable={false}
    />
  );
}
