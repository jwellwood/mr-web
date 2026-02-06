import { Suspense } from 'react';
import { Route } from 'react-router-dom';

import * as PLAYER from '../../modules/players/router';
import * as TEAM from '../../modules/team/router';
import { Trophy } from '../../modules/history/router';
import { Spinner } from '../../components/loaders';

export const PLAYER_ROUTES = () => (
  <>
    <Route path={PLAYER.PLAYER_PATHS.PLAYER}>
      <Route
        index={true}
        element={
          <Suspense fallback={<Spinner />}>
            <PLAYER.Player />
          </Suspense>
        }
      />
      <Route
        path={PLAYER.PLAYER_PATHS.EDIT}
        element={
          <Suspense fallback={<Spinner />}>
            <PLAYER.EditPlayer />
          </Suspense>
        }
      />
      <Route
        path={PLAYER.PLAYER_PATHS.EDIT_PHOTO}
        element={
          <Suspense fallback={<Spinner />}>
            <PLAYER.EditPlayerPhoto />
          </Suspense>
        }
      />
      <Route
        path={TEAM.TEAM_PATHS.TROPHY}
        element={
          <Suspense fallback={<Spinner />}>
            <Trophy />
          </Suspense>
        }
      />
    </Route>
  </>
);
