import { SectionContainer } from '../../../../../components';
import CustomTable from '../../../../../components/tables/custom-table/CustomTable';
import { TApolloError } from '../../../../../types/apollo';
import { rows, columns } from '../../../tables/match-form';
import { ITempMatchPlayers } from '../../../types';

interface Props {
  currentPlayers: ITempMatchPlayers[];
  error?: TApolloError;
}

export default function MatchPlayersTable({ currentPlayers, error }: Props) {
  return (
    <SectionContainer>
      <CustomTable
        rows={rows(currentPlayers, error)}
        columns={columns}
        isSortable={false}
        loading={false}
        loadingRowCount={0}
      />
    </SectionContainer>
  );
}
