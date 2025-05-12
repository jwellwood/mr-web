import React from 'react';
import { SectionContainer } from '../../../components/containers';
import CustomTable from '../../../components/tables/CustomTable';
import { IMatchResponse, IPlayer } from '../../../types';
import { match_players_table, match_players_table_styles } from '../configs';
import { statsData } from '../helpers';
import { POSITIONS } from '../../players/constants.ts';

type Props = {
  match?: IMatchResponse;
};

const MatchPlayersTable: React.FC<Props> = ({ match = {} }) => {
  const { matchPlayers = [] } = match || {};
  const mappedPlayers = matchPlayers.map(player => {
    return {
      ...player,
      name: (player.playerId as IPlayer).name,
      position: POSITIONS[player.matchPosition || (player.playerId as IPlayer).position],
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
