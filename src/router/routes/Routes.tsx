import { Suspense } from 'react';
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
import { Spinner } from '../../components/loaders';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={HOME.HOME_PATHS.HOME} element={<HOME.HomePage />} />
      <Route path="*" element={<NotFound />} />

      {/* Auth Routes */}
      <Route path={AUTH.AUTH_PATHS.SIGN_IN} element={<AUTH.SignIn />} />
      <Route path={AUTH.AUTH_PATHS.SIGN_UP} element={<AUTH.SignUp />} />
      <Route path={AUTH.AUTH_PATHS.FORGOT} element={<AUTH.ForgotPassword />} />
      <Route path={AUTH.AUTH_PATHS.RESET} element={<AUTH.ResetPassword />} />
      <Route path={AUTH.AUTH_PATHS.VERIFY} element={<AUTH.ValidatedEmail />} />

      {/* Organization Routes */}
      <Route path={ORG.ORG_PATHS.ADD} element={<ORG.AddOrg />} />

      {/* Profile Routes */}
      <Route path={PROFILE.PROFILE_PATHS.PROFILE}>
        <Route
          index={true}
          element={
            <Suspense fallback={<Spinner />}>
              <PROFILE.Profile />
            </Suspense>
          }
        />
        <Route
          path={PROFILE.PROFILE_PATHS.EDIT}
          element={
            <Suspense fallback={<Spinner />}>
              <PROFILE.EditProfile />
            </Suspense>
          }
        />
        <Route
          path={PROFILE.PROFILE_PATHS.EDIT_IMAGE}
          element={
            <Suspense fallback={<Spinner />}>
              <PROFILE.EditUserImage />
            </Suspense>
          }
        />
        <Route
          path={PROFILE.PROFILE_PATHS.CHANGE_PASSWORD}
          element={
            <Suspense fallback={<Spinner />}>
              <PROFILE.EditPassword />
            </Suspense>
          }
        />
      </Route>

      {/* Organization Routes */}
      <Route path={ORG.ORG_PATHS.ORG}>
        <Route
          index={true}
          element={
            <Suspense fallback={<Spinner />}>
              <ORG.Org />
            </Suspense>
          }
        />
        <Route
          path={ORG.ORG_PATHS.EDIT}
          element={
            <Suspense fallback={<Spinner />}>
              <ORG.EditOrg />
            </Suspense>
          }
        />
        <Route
          path={ORG.ORG_PATHS.ADD_TEAM}
          element={
            <Suspense fallback={<Spinner />}>
              <TEAM.AddTeam />
            </Suspense>
          }
        />
        <Route
          path={ORG.ORG_PATHS.ADD_COMPETITION}
          element={
            <Suspense fallback={<Spinner />}>
              <ORG.AddCompetition />
            </Suspense>
          }
        />
        <Route
          path={ORG.ORG_PATHS.ADD_ORG_SEASON}
          element={
            <Suspense fallback={<Spinner />}>
              <ORG.AddOrgSeason />
            </Suspense>
          }
        />
        <Route
          path={ORG.ORG_PATHS.ADD_RESULT}
          element={
            <Suspense fallback={<Spinner />}>
              <ORG.AddResult />
            </Suspense>
          }
        />
        <Route path={ORG.ORG_PATHS.ORG_SEASON}>
          <Route
            index={true}
            element={
              <Suspense fallback={<Spinner />}>
                <ORG.OrgSeason />
              </Suspense>
            }
          />
          <Route
            path={ORG.ORG_PATHS.EDIT_ORG_SEASON}
            element={
              <Suspense fallback={<Spinner />}>
                <ORG.EditOrgSeason />
              </Suspense>
            }
          />
          <Route path={ORG.ORG_PATHS.RESULT}>
            <Route
              index={true}
              element={
                <Suspense fallback={<Spinner />}>
                  <ORG.Result />
                </Suspense>
              }
            />
            <Route
              path={ORG.ORG_PATHS.EDIT_RESULT}
              element={
                <Suspense fallback={<Spinner />}>
                  <ORG.EditResult />
                </Suspense>
              }
            />
          </Route>
        </Route>
        <Route path={ORG.ORG_PATHS.COMPETITION}>
          <Route
            index={true}
            element={
              <Suspense fallback={<Spinner />}>
                <ORG.Competition />
              </Suspense>
            }
          />
          <Route
            path={ORG.ORG_PATHS.EDIT_COMPETITION}
            element={
              <Suspense fallback={<Spinner />}>
                <ORG.EditCompetition />
              </Suspense>
            }
          />
        </Route>
        <Route
          path={ORG.ORG_PATHS.EDIT_BADGE}
          element={
            <Suspense fallback={<Spinner />}>
              <ORG.EditOrgBadge />
            </Suspense>
          }
        />
        <Route path={TEAM.TEAM_PATHS.TEAM}>
          <Route
            index={true}
            element={
              <Suspense fallback={<Spinner />}>
                <TEAM.Team />
              </Suspense>
            }
          />
          <Route
            path={TEAM.TEAM_PATHS.ADD_PLAYER}
            element={
              <Suspense fallback={<Spinner />}>
                <PLAYER.AddPlayer />
              </Suspense>
            }
          />
          <Route path={TEAM.TEAM_PATHS.SEASON}>
            <Route
              index={true}
              element={
                <Suspense fallback={<Spinner />}>
                  <HISTORY.Season />
                </Suspense>
              }
            />
            <Route
              path={HISTORY.AWARD_PATHS.AWARD}
              element={
                <Suspense fallback={<Spinner />}>
                  <HISTORY.Award />
                </Suspense>
              }
            />
            <Route
              path={HISTORY.AWARD_PATHS.ADD_AWARD}
              element={
                <Suspense fallback={<Spinner />}>
                  <HISTORY.AddAward />
                </Suspense>
              }
            />
            <Route
              path={HISTORY.AWARD_PATHS.EDIT_AWARD}
              element={
                <Suspense fallback={<Spinner />}>
                  <HISTORY.EditAward />
                </Suspense>
              }
            />
            {PLAYER_ROUTES()}
            {MATCH_ROUTES()}
          </Route>
          <Route
            path={TEAM.TEAM_PATHS.ADD_SEASON}
            element={
              <Suspense fallback={<Spinner />}>
                <HISTORY.AddTeamSeason />
              </Suspense>
            }
          />
          <Route
            path={TEAM.TEAM_PATHS.EDIT_SEASON}
            element={
              <Suspense fallback={<Spinner />}>
                <HISTORY.EditTeamSeason />
              </Suspense>
            }
          />
          <Route
            path={TEAM.TEAM_PATHS.TROPHY}
            element={
              <Suspense fallback={<Spinner />}>
                <HISTORY.Trophy />
              </Suspense>
            }
          />
          <Route
            path={TEAM.TEAM_PATHS.ADD_TROPHY}
            element={
              <Suspense fallback={<Spinner />}>
                <HISTORY.AddTrophy />
              </Suspense>
            }
          />
          <Route
            path={TEAM.TEAM_PATHS.EDIT_TROPHY}
            element={
              <Suspense fallback={<Spinner />}>
                <HISTORY.EditTrophy />
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
            path={TEAM.TEAM_PATHS.EDIT_BADGE}
            element={
              <Suspense fallback={<Spinner />}>
                <TEAM.EditBadge />
              </Suspense>
            }
          />
          <Route
            path={TEAM.TEAM_PATHS.EDIT}
            element={
              <Suspense fallback={<Spinner />}>
                <TEAM.EditTeam />
              </Suspense>
            }
          />
          {PLAYER_ROUTES()}
          {MATCH_ROUTES()}
        </Route>
      </Route>
    </Routes>
  );
}
