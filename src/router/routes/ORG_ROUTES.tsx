import { Route } from 'react-router-dom';
import { ORG } from '../paths';
import {
  AddCompetition,
  Competition,
  EditCompetition,
  EditOrg,
  EditOrgBadge,
  Org,
} from '../../modules/organization/routes';
import { AddTeam } from '../../modules/team/routes';

export const ORG_ROUTES = () => (
  <>
    <Route index={true} element={<Org />} />
    <Route path={ORG.EDIT} element={<EditOrg />} />
    <Route path={ORG.ADD_TEAM} element={<AddTeam />} />
    <Route path={ORG.ADD_COMPETITION} element={<AddCompetition />} />
    <Route path={ORG.COMPETITION}>
      <Route index={true} element={<Competition />} />
      <Route path={ORG.EDIT_COMPETITION} element={<EditCompetition />} />
    </Route>
    <Route path={ORG.EDIT_BADGE} element={<EditOrgBadge />} />
  </>
);
