import { Route } from 'react-router-dom';
import { AWARD } from '../paths';

import { AddAward, Award, EditAward } from '../../modules/history/routes.ts';

export const AWARD_ROUTES = () => (
  <>
    <Route path={AWARD.AWARD} element={<Award />} />
    <Route path={AWARD.ADD_AWARD} element={<AddAward />} />
    <Route path={AWARD.EDIT_AWARD} element={<EditAward />} />
  </>
);
