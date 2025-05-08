import {getAvg} from "../../../utils/helpers";

export const mapAverages = (player: {
  apps: number;
  wins: number;
  draws: number;
  defeats: number;
  goalsFor: number;
  goalsAgainst: number;
}) => ({
  total: player.apps,
  wins: player.wins,
  draws: player.draws,
  defeats: player.defeats,
  teamAvg: +getAvg(player.goalsFor, player.apps, 2),
  oppAvg: +getAvg(player.goalsAgainst, player.apps, 2),
  scored: player.goalsFor || 0,
  conceded: player.goalsAgainst || 0,
  difference: player.goalsFor - player.goalsAgainst,
});
