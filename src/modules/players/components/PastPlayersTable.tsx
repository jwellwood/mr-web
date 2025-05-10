import React from 'react';
import CustomAvatar from '../../../components/avatars/CustomAvatar';
import FlagIcon from '../../../components/icons/FlagIcon';
import CustomTable from '../../../components/tables/CustomTable';
import NameCell from '../../../components/tables/NameCell';
import { past_player_styles, squad_past_players } from '../configs';
import {IPastPlayer} from "../../../types/pastPlayer.ts";

type Props = {
  players?: IPastPlayer[];
};

const PastPlayersTable: React.FC<Props> = ({ players }) => {
  const rows = players?.map((player) => ({
    position: player.position,
    nationality: { value: <FlagIcon nationality={player.nationality} /> },
    image: {
      value: (
        <CustomAvatar
          size="30px"
          centered
          imageUrl={player.image}
          alt={`${player.name} profile`}
        />
      ),
    },
    name: { value: <NameCell id={player._id}>{player.name}</NameCell> },
    joined: player.joined,
    left: player.left,
    seasons: player.seasons,
  })) || [];

  return (
    <CustomTable
      columns={squad_past_players}
      rows={rows}
      isSortable
      sortByString="seasons"
      cellIndexStyles={past_player_styles}
    />
  );
};

export default PastPlayersTable;
