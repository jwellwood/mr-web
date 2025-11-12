import { Route, Routes } from 'react-router-dom';

import { AUTH, AWARD, MATCH, ORG, PROFILE, TEAM, HOME } from './paths.ts';
import * as AUTH_ROUTES from '../../modules/auth/routes.tsx';
import * as PROFILE_ROUTES from '../../modules/profile/routes.tsx';
import * as ORG_ROUTES from '../../modules/organization/routes.tsx';
import * as TEAM_ROUTES from '../../modules/team/routes.tsx';
import * as HISTORY_ROUTES from '../../modules/history/routes.tsx';
import { AddMatch } from '../../modules/matches/routes.tsx';
import { AddPlayer } from '../../modules/players/routes.tsx';
import Home from '../../modules/home/containers/Home.tsx';
import { NotFound } from '../../components/navigation/index.ts';
import { PLAYER_ROUTES } from './PLAYER_ROUTES.tsx';
import { MATCH_ROUTES } from './MATCH_ROUTES.tsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={HOME.HOME} element={<Home />} />
      <Route path="*" element={<NotFound />} />
      <Route path={AUTH.SIGN_IN} element={<AUTH_ROUTES.SignIn />} />
      <Route path={AUTH.SIGN_UP} element={<AUTH_ROUTES.SignUp />} />
      <Route path={AUTH.FORGOT} element={<AUTH_ROUTES.ForgotPassword />} />
      <Route path={AUTH.RESET} element={<AUTH_ROUTES.ResetPassword />} />
      <Route path={AUTH.VERIFY} element={<AUTH_ROUTES.ValidatedEmail />} />
      <Route path={ORG.ADD} element={<ORG_ROUTES.AddOrg />} />
      <Route path={PROFILE.PROFILE}>
        <Route index={true} element={<PROFILE_ROUTES.Profile />} />
        <Route path={PROFILE.EDIT} element={<PROFILE_ROUTES.EditProfile />} />
        <Route path={PROFILE.EDIT_IMAGE} element={<PROFILE_ROUTES.EditUserImage />} />
        <Route path={PROFILE.CHANGE_PASSWORD} element={<PROFILE_ROUTES.EditPassword />} />
        <Route path={PROFILE.DELETE} element={<PROFILE_ROUTES.DeleteAccount />} />
      </Route>
      <Route path={ORG.ORG}>
        <Route index={true} element={<ORG_ROUTES.Org />} />
        <Route path={ORG.EDIT} element={<ORG_ROUTES.EditOrg />} />
        <Route path={ORG.ADD_TEAM} element={<TEAM_ROUTES.AddTeam />} />
        <Route path={ORG.ADD_COMPETITION} element={<ORG_ROUTES.AddCompetition />} />
        <Route path={ORG.COMPETITION}>
          <Route index={true} element={<ORG_ROUTES.Competition />} />
          <Route path={ORG.EDIT_COMPETITION} element={<ORG_ROUTES.EditCompetition />} />
        </Route>
        <Route path={ORG.EDIT_BADGE} element={<ORG_ROUTES.EditOrgBadge />} />
        <Route path={TEAM.TEAM}>
          <Route index={true} element={<TEAM_ROUTES.Team />} />
          <Route path={TEAM.ADD_PLAYER} element={<AddPlayer />} />
          <Route path={TEAM.SEASON}>
            <Route index={true} element={<HISTORY_ROUTES.Season />} />
            <Route path={AWARD.AWARD} element={<HISTORY_ROUTES.Award />} />
            <Route path={AWARD.ADD_AWARD} element={<HISTORY_ROUTES.AddAward />} />
            <Route path={AWARD.EDIT_AWARD} element={<HISTORY_ROUTES.EditAward />} />
            {PLAYER_ROUTES()}
            {MATCH_ROUTES()}
          </Route>
          <Route path={TEAM.ADD_SEASON} element={<HISTORY_ROUTES.AddTeamSeason />} />
          <Route path={TEAM.EDIT_SEASON} element={<HISTORY_ROUTES.EditTeamSeason />} />
          <Route path={TEAM.TROPHY} element={<HISTORY_ROUTES.Trophy />} />
          <Route path={TEAM.ADD_TROPHY} element={<HISTORY_ROUTES.AddTrophy />} />
          <Route path={TEAM.EDIT_TROPHY} element={<HISTORY_ROUTES.EditTrophy />} />
          <Route path={MATCH.ADD_MATCH} element={<AddMatch />} />
          <Route path={TEAM.EDIT_BADGE} element={<TEAM_ROUTES.EditBadge />} />
          <Route path={TEAM.EDIT} element={<TEAM_ROUTES.EditTeam />} />
          <Route path={TEAM.DELETE_TEAM} element={<TEAM_ROUTES.DeleteTeam />} />
          {PLAYER_ROUTES()}
          {MATCH_ROUTES()}
        </Route>
      </Route>
    </Routes>
  );
}
