import { Route } from 'react-router-dom';
import { AUTH_ROLES } from '../../constants';
import * as PLAYER from '../../modules/players/router';
import RouteGuard from '../RouteGuard';

export const PLAYER_ROUTES = () => (
  <>
    <Route path={PLAYER.PLAYER_PATHS.PLAYER}>
      <Route
        index={true}
        element={
          <RouteGuard authorization={AUTH_ROLES.PUBLIC}>
            <PLAYER.Player />
          </RouteGuard>
        }
      />
      <Route
        path={PLAYER.PLAYER_PATHS.EDIT}
        element={
          <RouteGuard authorization={AUTH_ROLES.TEAM_ADMIN}>
            <PLAYER.EditPlayer />
          </RouteGuard>
        }
      />
      <Route
        path={PLAYER.PLAYER_PATHS.EDIT_PHOTO}
        element={
          <RouteGuard authorization={AUTH_ROLES.TEAM_ADMIN}>
            <PLAYER.EditPlayerPhoto />
          </RouteGuard>
        }
      />
    </Route>
  </>
);
