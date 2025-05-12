import { Route } from 'react-router-dom';
import { MATCH } from '../paths';

import { AddMatch, DeleteMatch, EditMatch, Match } from '../../modules/matches/routes.ts';

export const MATCH_ROUTES = () => (
  <>
    <Route path={MATCH.MATCH}>
      <Route index={true} element={<Match />} />
      <Route path={MATCH.ADD_MATCH} element={<AddMatch />} />
      <Route path={MATCH.EDIT_MATCH} element={<EditMatch />} />
      <Route path={MATCH.DELETE_MATCH} element={<DeleteMatch />} />
    </Route>
  </>
);
