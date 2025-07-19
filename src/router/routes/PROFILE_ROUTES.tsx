import { Route } from 'react-router-dom';
import { ORG, PROFILE } from '../paths';

import {
  DeleteAccount,
  EditPassword,
  EditProfile,
  EditUserImage,
  Profile,
} from '../../modules/profile/routes.ts';
import { AddOrg } from '../../modules/organization/routes.ts';

export const PROFILE_ROUTES = () => (
  <Route path={PROFILE.PROFILE}>
    <Route index={true} element={<Profile />} />
    <Route path={PROFILE.EDIT} element={<EditProfile />} />
    <Route path={PROFILE.EDIT_IMAGE} element={<EditUserImage />} />
    <Route path={PROFILE.CHANGE_PASSWORD} element={<EditPassword />} />
    <Route path={PROFILE.DELETE} element={<DeleteAccount />} />
    <Route path={ORG.ADD} element={<AddOrg />} />
  </Route>
);
