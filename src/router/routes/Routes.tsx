import { Route, Routes } from 'react-router-dom';

import * as AUTH from '../../modules/auth/router';
import * as HOME from '../../modules/home/router';
import * as HISTORY from '../../modules/history/router';
import * as MATCH from '../../modules/matches/router';
import * as ORG from '../../modules/organization/router';
import * as PLAYER from '../../modules/players/router';
import * as PROFILE from '../../modules/profile/router';
import * as TEAM from '../../modules/team/router';
import NotFound from '../NotFound';
import { PLAYER_ROUTES, MATCH_ROUTES } from './';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={HOME.HOME_PATHS.HOME} element={<HOME.HomePage />} />
      <Route path="*" element={<NotFound />} />
      <Route path={AUTH.AUTH_PATHS.SIGN_IN} element={<AUTH.SignIn />} />
      <Route path={AUTH.AUTH_PATHS.SIGN_UP} element={<AUTH.SignUp />} />
      <Route path={AUTH.AUTH_PATHS.FORGOT} element={<AUTH.ForgotPassword />} />
      <Route path={AUTH.AUTH_PATHS.RESET} element={<AUTH.ResetPassword />} />
      <Route path={AUTH.AUTH_PATHS.VERIFY} element={<AUTH.ValidatedEmail />} />
      <Route path={ORG.ORG_PATHS.ADD} element={<ORG.AddOrg />} />
      <Route path={PROFILE.PROFILE_PATHS.PROFILE}>
        <Route index={true} element={<PROFILE.Profile />} />
        <Route path={PROFILE.PROFILE_PATHS.EDIT} element={<PROFILE.EditProfile />} />
        <Route path={PROFILE.PROFILE_PATHS.EDIT_IMAGE} element={<PROFILE.EditUserImage />} />
        <Route path={PROFILE.PROFILE_PATHS.CHANGE_PASSWORD} element={<PROFILE.EditPassword />} />
        <Route path={PROFILE.PROFILE_PATHS.DELETE} element={<PROFILE.DeleteAccount />} />
      </Route>
      <Route path={ORG.ORG_PATHS.ORG}>
        <Route index={true} element={<ORG.Org />} />
        <Route path={ORG.ORG_PATHS.EDIT} element={<ORG.EditOrg />} />
        <Route path={ORG.ORG_PATHS.ADD_TEAM} element={<TEAM.AddTeam />} />
        <Route path={ORG.ORG_PATHS.ADD_COMPETITION} element={<ORG.AddCompetition />} />
        <Route path={ORG.ORG_PATHS.ADD_ORG_SEASON} element={<ORG.AddOrgSeason />} />
        <Route path={ORG.ORG_PATHS.ORG_SEASON}>
          <Route index={true} element={<ORG.OrgSeason />} />
          <Route path={ORG.ORG_PATHS.EDIT_ORG_SEASON} element={<ORG.EditOrgSeason />} />
        </Route>
        <Route path={ORG.ORG_PATHS.COMPETITION}>
          <Route index={true} element={<ORG.Competition />} />
          <Route path={ORG.ORG_PATHS.EDIT_COMPETITION} element={<ORG.EditCompetition />} />
        </Route>
        <Route path={ORG.ORG_PATHS.EDIT_BADGE} element={<ORG.EditOrgBadge />} />
        <Route path={TEAM.TEAM_PATHS.TEAM}>
          <Route index={true} element={<TEAM.Team />} />
          <Route path={TEAM.TEAM_PATHS.ADD_PLAYER} element={<PLAYER.AddPlayer />} />
          <Route path={TEAM.TEAM_PATHS.SEASON}>
            <Route index={true} element={<HISTORY.Season />} />
            <Route path={HISTORY.AWARD_PATHS.AWARD} element={<HISTORY.Award />} />
            <Route path={HISTORY.AWARD_PATHS.ADD_AWARD} element={<HISTORY.AddAward />} />
            <Route path={HISTORY.AWARD_PATHS.EDIT_AWARD} element={<HISTORY.EditAward />} />
            {PLAYER_ROUTES()}
            {MATCH_ROUTES()}
          </Route>
          <Route path={TEAM.TEAM_PATHS.ADD_SEASON} element={<HISTORY.AddTeamSeason />} />
          <Route path={TEAM.TEAM_PATHS.EDIT_SEASON} element={<HISTORY.EditTeamSeason />} />
          <Route path={TEAM.TEAM_PATHS.TROPHY} element={<HISTORY.Trophy />} />
          <Route path={TEAM.TEAM_PATHS.ADD_TROPHY} element={<HISTORY.AddTrophy />} />
          <Route path={TEAM.TEAM_PATHS.EDIT_TROPHY} element={<HISTORY.EditTrophy />} />
          <Route path={MATCH.MATCH_PATHS.ADD_MATCH} element={<MATCH.AddMatch />} />
          <Route path={TEAM.TEAM_PATHS.EDIT_BADGE} element={<TEAM.EditBadge />} />
          <Route path={TEAM.TEAM_PATHS.EDIT} element={<TEAM.EditTeam />} />
          <Route path={TEAM.TEAM_PATHS.DELETE_TEAM} element={<TEAM.DeleteTeam />} />
          {PLAYER_ROUTES()}
          {MATCH_ROUTES()}
        </Route>
      </Route>
    </Routes>
  );
}
