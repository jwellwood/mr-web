import { Route } from 'react-router-dom';

import * as MATCH from '../../modules/matches/router';

export const MATCH_ROUTES = () => (
  <>
    <Route path={MATCH.MATCH_PATHS.MATCH}>
      <Route index={true} element={<MATCH.Match />} />
      <Route path={MATCH.MATCH_PATHS.ADD_MATCH} element={<MATCH.AddMatch />} />
      <Route path={MATCH.MATCH_PATHS.EDIT_MATCH} element={<MATCH.EditMatch />} />
    </Route>
  </>
);
