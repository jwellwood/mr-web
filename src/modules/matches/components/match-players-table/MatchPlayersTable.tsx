import { SectionContainer } from '../../../../components/index.ts';
import CustomTable from '../../../../components/tables/CustomTable.tsx';
import { IMatchResponse, IPlayerInMatch } from '../../types.ts';
import { IPlayer } from '../../../players/types.ts';
import { POSITIONS } from '../../../../constants/index.ts';
import { columns, rows, styles } from './config';

type Props = {
  match?: IMatchResponse;
  loading: boolean;
};

export default function MatchPlayersTable({ match, loading }: Props) {
  const { matchPlayers = [] as IPlayerInMatch[] } = match || {};
  const mappedPlayers = matchPlayers?.map(player => {
    return {
      ...player,
      name: (player.playerId as IPlayer).name,
      position:
        POSITIONS[
          (player.matchPosition || (player.playerId as IPlayer).position) as keyof typeof POSITIONS
        ],
    };
  });

  return (
    <SectionContainer>
      <CustomTable
        columns={columns}
        rows={rows(mappedPlayers, loading)}
        isSortable
        sortByString="position"
        cellIndexStyles={styles}
      />
    </SectionContainer>
  );
}
