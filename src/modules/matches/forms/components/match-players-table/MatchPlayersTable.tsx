import { ApolloError } from '@apollo/client';
import { SectionContainer } from '../../../../../components';
import CustomTable from '../../../../../components/tables/CustomTable';
import { ITempMatchPlayers } from '../../../types';
import { rows, columns, styles } from './config';

interface Props {
  currentPlayers: ITempMatchPlayers[];
  error?: ApolloError;
}

export default function MatchPlayersTable({ currentPlayers, error }: Props) {
  return (
    <SectionContainer>
      <CustomTable
        rows={rows(currentPlayers, error)}
        columns={columns}
        cellIndexStyles={styles}
        isSortable={false}
      />
    </SectionContainer>
  );
}
