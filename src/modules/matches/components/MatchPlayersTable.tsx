import { SectionContainer } from '../../../components';
import CustomTable from '../../../components/tables/CustomTable';
import { match_players_table, match_players_table_styles } from '../configs';
import { statsData } from '../helpers';
import { IMatchResponse, IPlayerInMatch } from '../types.ts';
import { IPlayer } from '../../players/types.ts';
import { POSITIONS } from '../../../constants';

type Props = {
  match?: IMatchResponse;
};

export default function MatchPlayersTable({ match }: Props) {
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playersData = statsData(mappedPlayers as any, false);
  return (
    <SectionContainer>
      <CustomTable
        columns={match_players_table}
        rows={playersData}
        isSortable
        sortByString="position"
        cellIndexStyles={match_players_table_styles}
      />
    </SectionContainer>
  );
}
