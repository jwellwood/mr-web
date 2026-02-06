import { Suspense } from 'react';
import { Route } from 'react-router-dom';

import * as MATCH from '../../modules/matches/router';
import { Spinner } from '../../components/loaders';

export const MATCH_ROUTES = () => (
  <>
    <Route path={MATCH.MATCH_PATHS.MATCH}>
      <Route
        index={true}
        element={
          <Suspense fallback={<Spinner />}>
            <MATCH.Match />
          </Suspense>
        }
      />
      <Route
        path={MATCH.MATCH_PATHS.ADD_MATCH}
        element={
          <Suspense fallback={<Spinner />}>
            <MATCH.AddMatch />
          </Suspense>
        }
      />
      <Route
        path={MATCH.MATCH_PATHS.EDIT_MATCH}
        element={
          <Suspense fallback={<Spinner />}>
            <MATCH.EditMatch />
          </Suspense>
        }
      />
    </Route>
  </>
);
