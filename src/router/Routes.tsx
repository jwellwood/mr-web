import { Route, Routes } from 'react-router-dom';
import { AUTH, AWARD, MATCH, ORG, PROFILE, TEAM } from './paths';
import { HOME } from './paths';
import { NotFound } from '../components/navigation';
import { AddTeam, DeleteTeam, EditBadge, EditTeam, Team } from '../modules/team/routes.ts';
import {
  AddAward,
  AddTeamSeason,
  AddTrophy,
  Award,
  EditAward,
  EditTeamSeason,
  EditTrophy,
  Season,
  Trophy,
} from '../modules/history/routes.ts';
import { AddMatch } from '../modules/matches/routes.ts';
import { PLAYER_ROUTES } from './routes/PLAYER_ROUTES.tsx';
import { MATCH_ROUTES } from './routes/MATCH_ROUTES.tsx';
import { AddPlayer } from '../modules/players/routes.ts';
import {
  ForgotPassword,
  ResetPassword,
  SignIn,
  SignUp,
  ValidatedEmail,
} from '../modules/auth/routes.tsx';
import {
  AddCompetition,
  AddOrg,
  Competition,
  EditCompetition,
  EditOrg,
  EditOrgBadge,
  Org,
} from '../modules/organization/routes.ts';
import {
  DeleteAccount,
  EditPassword,
  EditProfile,
  EditUserImage,
  Profile,
} from '../modules/profile/routes.ts';
import Home from '../modules/home/containers/Home.tsx';

function AppRoutes() {
  return (
    <Routes>
      <Route path={HOME.HOME} element={<Home />} />
      <Route path="*" element={<NotFound />} />
      <Route path={AUTH.SIGN_IN} element={<SignIn />} />
      <Route path={AUTH.SIGN_UP} element={<SignUp />} />
      <Route path={AUTH.FORGOT} element={<ForgotPassword />} />
      <Route path={AUTH.RESET} element={<ResetPassword />} />
      <Route path={AUTH.VERIFY} element={<ValidatedEmail />} />
      <Route path={ORG.ADD} element={<AddOrg />} />
      <Route path={PROFILE.PROFILE}>
        <Route index={true} element={<Profile />} />
        <Route path={PROFILE.EDIT} element={<EditProfile />} />
        <Route path={PROFILE.EDIT_IMAGE} element={<EditUserImage />} />
        <Route path={PROFILE.CHANGE_PASSWORD} element={<EditPassword />} />
        <Route path={PROFILE.DELETE} element={<DeleteAccount />} />
      </Route>
      <Route path={ORG.ORG}>
        <Route index={true} element={<Org />} />
        <Route path={ORG.EDIT} element={<EditOrg />} />
        <Route path={ORG.ADD_TEAM} element={<AddTeam />} />
        <Route path={ORG.ADD_COMPETITION} element={<AddCompetition />} />
        <Route path={ORG.COMPETITION}>
          <Route index={true} element={<Competition />} />
          <Route path={ORG.EDIT_COMPETITION} element={<EditCompetition />} />
        </Route>
        <Route path={ORG.EDIT_BADGE} element={<EditOrgBadge />} />
        <Route path={TEAM.TEAM}>
          <Route index={true} element={<Team />} />
          <Route path={TEAM.ADD_PLAYER} element={<AddPlayer />} />
          <Route path={TEAM.SEASON}>
            <Route index={true} element={<Season />} />
            <Route path={AWARD.AWARD} element={<Award />} />
            <Route path={AWARD.ADD_AWARD} element={<AddAward />} />
            <Route path={AWARD.EDIT_AWARD} element={<EditAward />} />
            {PLAYER_ROUTES()}
            {MATCH_ROUTES()}
          </Route>
          <Route path={TEAM.ADD_SEASON} element={<AddTeamSeason />} />
          <Route path={TEAM.EDIT_SEASON} element={<EditTeamSeason />} />
          <Route path={TEAM.TROPHY} element={<Trophy />} />
          <Route path={TEAM.ADD_TROPHY} element={<AddTrophy />} />
          <Route path={TEAM.EDIT_TROPHY} element={<EditTrophy />} />
          <Route path={MATCH.ADD_MATCH} element={<AddMatch />} />
          <Route path={TEAM.EDIT_BADGE} element={<EditBadge />} />
          <Route path={TEAM.EDIT} element={<EditTeam />} />
          <Route path={TEAM.DELETE_TEAM} element={<DeleteTeam />} />
          {PLAYER_ROUTES()}
          {MATCH_ROUTES()}
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
