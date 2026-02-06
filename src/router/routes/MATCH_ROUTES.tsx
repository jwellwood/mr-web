import { Route } from 'react-router-dom';

import * as MATCH from '../../modules/matches/router';
import RouteGuard from '../RouteGuard';
import { AUTH_ROLES } from '../../constants';

export const MATCH_ROUTES = () => (
  <>
    <Route path={MATCH.MATCH_PATHS.MATCH}>
      <Route
        index={true}
        element={
          <RouteGuard authorization={AUTH_ROLES.PUBLIC}>
            <MATCH.Match />
          </RouteGuard>
        }
      />
      <Route
        path={MATCH.MATCH_PATHS.ADD_MATCH}
        element={
          <RouteGuard authorization={AUTH_ROLES.TEAM_ADMIN}>
            <MATCH.AddMatch />
          </RouteGuard>
        }
      />
      <Route
        path={MATCH.MATCH_PATHS.EDIT_MATCH}
        element={
          <RouteGuard authorization={AUTH_ROLES.TEAM_ADMIN}>
            <MATCH.EditMatch />
          </RouteGuard>
        }
      />
    </Route>
  </>
);
