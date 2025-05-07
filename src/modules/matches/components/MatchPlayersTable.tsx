import React from 'react';
import { SectionContainer } from 'components/containers';
import CustomTable from 'components/tables/CustomTable';
import { POSITIONS } from 'modules/players/constants';
import { IMatchResponse, IPlayer, IPlayerInMatch } from 'types';
import { match_players_table, match_players_table_styles } from '../configs';
import { statsData } from '../helpers';

type Props = {
  match: IMatchResponse;
};

const MatchPlayersTable: React.FC<Props> = ({ match }) => {
  const { matchPlayers } = match;
  const mappedPlayers = matchPlayers.map((player: IPlayerInMatch) => {
    return {
      name: (player.playerId as IPlayer).name,
      position:
        POSITIONS[player.matchPosition] ||
        POSITIONS[(player.playerId as IPlayer).position],
      ...player,
    };
  });

  const playersData = statsData(mappedPlayers, false);

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
};

export default MatchPlayersTable;
