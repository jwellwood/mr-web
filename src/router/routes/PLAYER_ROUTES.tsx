import { Route } from 'react-router-dom';

import * as PLAYER from '../../modules/players/router';
import * as TEAM from '../../modules/team/router';
import { Trophy } from '../../modules/history/router';

export const PLAYER_ROUTES = () => (
  <>
    <Route path={PLAYER.PLAYER_PATHS.PLAYER}>
      <Route index={true} element={<PLAYER.Player />} />
      <Route path={PLAYER.PLAYER_PATHS.EDIT} element={<PLAYER.EditPlayer />} />
      <Route path={PLAYER.PLAYER_PATHS.EDIT_PHOTO} element={<PLAYER.EditPlayerPhoto />} />
      <Route path={TEAM.TEAM_PATHS.TROPHY} element={<Trophy />} />
    </Route>
  </>
);
