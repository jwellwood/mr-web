import { Route, Routes } from 'react-router-dom';
import { AUTH_ROLES } from '../../constants';
import * as AUTH from '../../modules/auth/router';
import * as HISTORY from '../../modules/history/router';
import * as HOME from '../../modules/home/router';
import * as MATCH from '../../modules/matches/router';
import * as ORG from '../../modules/organization/router';
import * as PLAYER from '../../modules/players/router';
import * as PROFILE from '../../modules/profile/router';
import * as TEAM from '../../modules/team/router';
import NotFound from '../NotFound';
import RouteGuard from '../RouteGuard';
import { PLAYER_ROUTES, MATCH_ROUTES } from './';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path={HOME.HOME_PATHS.HOME} element={<HOME.HomePage />} />
      <Route path="*" element={<NotFound />} />

      {/* Auth Routes - only accessible when NOT logged in */}
      <Route
        path={AUTH.AUTH_PATHS.SIGN_IN}
        element={
          <RouteGuard authorization="none">
            <AUTH.SignIn />
          </RouteGuard>
        }
      />
      <Route
        path={AUTH.AUTH_PATHS.SIGN_UP}
        element={
          <RouteGuard authorization="none">
            <AUTH.SignUp />
          </RouteGuard>
        }
      />
      <Route
        path={AUTH.AUTH_PATHS.FORGOT}
        element={
          <RouteGuard authorization="none">
            <AUTH.ForgotPassword />
          </RouteGuard>
        }
      />
      <Route
        path={AUTH.AUTH_PATHS.RESET}
        element={
          <RouteGuard authorization="none">
            <AUTH.ResetPassword />
          </RouteGuard>
        }
      />
      <Route path={AUTH.AUTH_PATHS.VERIFY} element={<AUTH.ValidatedEmail />} />

      {/* Protected: Authenticated Users */}
      <Route
        path={ORG.ORG_PATHS.ADD}
        element={
          <RouteGuard authorization={AUTH_ROLES.USER}>
            <ORG.AddOrg />
          </RouteGuard>
        }
      />

      {/* Profile Routes - User only */}
      <Route path={PROFILE.PROFILE_PATHS.PROFILE}>
        <Route
          index={true}
          element={
            <RouteGuard authorization={AUTH_ROLES.USER}>
              <PROFILE.Profile />
            </RouteGuard>
          }
        />
        <Route
          path={PROFILE.PROFILE_PATHS.EDIT}
          element={
            <RouteGuard authorization={AUTH_ROLES.USER}>
              <PROFILE.EditProfile />
            </RouteGuard>
          }
        />
        <Route
          path={PROFILE.PROFILE_PATHS.EDIT_IMAGE}
          element={
            <RouteGuard authorization={AUTH_ROLES.USER}>
              <PROFILE.EditUserImage />
            </RouteGuard>
          }
        />
        <Route
          path={PROFILE.PROFILE_PATHS.CHANGE_PASSWORD}
          element={
            <RouteGuard authorization={AUTH_ROLES.USER}>
              <PROFILE.EditPassword />
            </RouteGuard>
          }
        />
      </Route>

      {/* Organization Routes - ORG_ADMIN only for forms */}
      <Route path={ORG.ORG_PATHS.ORG}>
        <Route
          index={true}
          element={
            <RouteGuard authorization={AUTH_ROLES.PUBLIC}>
              <ORG.Org />
            </RouteGuard>
          }
        />
        <Route
          path={ORG.ORG_PATHS.EDIT}
          element={
            <RouteGuard authorization={AUTH_ROLES.ORG_ADMIN}>
              <ORG.EditOrg />
            </RouteGuard>
          }
        />
        <Route
          path={ORG.ORG_PATHS.ADD_TEAM}
          element={
            <RouteGuard authorization={AUTH_ROLES.ORG_ADMIN}>
              <TEAM.AddTeam />
            </RouteGuard>
          }
        />
        <Route
          path={ORG.ORG_PATHS.ADD_COMPETITION}
          element={
            <RouteGuard authorization={AUTH_ROLES.ORG_ADMIN}>
              <ORG.AddCompetition />
            </RouteGuard>
          }
        />
        <Route
          path={ORG.ORG_PATHS.ADD_ORG_SEASON}
          element={
            <RouteGuard authorization={AUTH_ROLES.ORG_ADMIN}>
              <ORG.AddOrgSeason />
            </RouteGuard>
          }
        />

        <Route path={ORG.ORG_PATHS.ORG_SEASON}>
          <Route
            index={true}
            element={
              <RouteGuard authorization={AUTH_ROLES.PUBLIC}>
                <ORG.OrgSeason />
              </RouteGuard>
            }
          />
          <Route
            path={ORG.ORG_PATHS.ADD_RESULT}
            element={
              <RouteGuard authorization={AUTH_ROLES.ORG_ADMIN}>
                <ORG.AddResult />
              </RouteGuard>
            }
          />

          <Route
            path={ORG.ORG_PATHS.ADD_GAME_WEEK}
            element={
              <RouteGuard authorization={AUTH_ROLES.ORG_ADMIN}>
                <ORG.AddGameWeek />
              </RouteGuard>
            }
          />
          <Route
            path={ORG.ORG_PATHS.EDIT_ORG_SEASON}
            element={
              <RouteGuard authorization={AUTH_ROLES.ORG_ADMIN}>
                <ORG.EditOrgSeason />
              </RouteGuard>
            }
          />
          <Route
            path={ORG.ORG_PATHS.ORG_SEASON_ADMIN}
            element={
              <RouteGuard authorization={AUTH_ROLES.ORG_ADMIN}>
                <ORG.AdminOrgSeason />
              </RouteGuard>
            }
          />
          <Route path={ORG.ORG_PATHS.RESULT}>
            <Route
              index={true}
              element={
                <RouteGuard authorization={AUTH_ROLES.PUBLIC}>
                  <ORG.Result />
                </RouteGuard>
              }
            />
            <Route
              path={ORG.ORG_PATHS.EDIT_RESULT}
              element={
                <RouteGuard authorization={AUTH_ROLES.ORG_ADMIN}>
                  <ORG.EditResult />
                </RouteGuard>
              }
            />
          </Route>
        </Route>
        <Route path={ORG.ORG_PATHS.COMPETITION}>
          <Route
            index={true}
            element={
              <RouteGuard authorization={AUTH_ROLES.PUBLIC}>
                <ORG.Competition />
              </RouteGuard>
            }
          />
          <Route
            path={ORG.ORG_PATHS.EDIT_COMPETITION}
            element={
              <RouteGuard authorization={AUTH_ROLES.ORG_ADMIN}>
                <ORG.EditCompetition />
              </RouteGuard>
            }
          />
        </Route>
        <Route
          path={ORG.ORG_PATHS.EDIT_BADGE}
          element={
            <RouteGuard authorization={AUTH_ROLES.ORG_ADMIN}>
              <ORG.EditOrgBadge />
            </RouteGuard>
          }
        />

        {/* Team Routes - TEAM_ADMIN only for forms */}
        <Route path={TEAM.TEAM_PATHS.TEAM}>
          <Route
            index={true}
            element={
              <RouteGuard authorization={AUTH_ROLES.PUBLIC}>
                <TEAM.Team />
              </RouteGuard>
            }
          />
          <Route
            path={TEAM.TEAM_PATHS.ADD_PLAYER}
            element={
              <RouteGuard authorization={AUTH_ROLES.TEAM_ADMIN}>
                <PLAYER.AddPlayer />
              </RouteGuard>
            }
          />
          <Route path={TEAM.TEAM_PATHS.SEASON}>
            <Route
              index={true}
              element={
                <RouteGuard authorization={AUTH_ROLES.PUBLIC}>
                  <HISTORY.Season />
                </RouteGuard>
              }
            />
            <Route
              path={HISTORY.AWARD_PATHS.AWARD}
              element={
                <RouteGuard authorization={AUTH_ROLES.PUBLIC}>
                  <HISTORY.Award />
                </RouteGuard>
              }
            />
            <Route
              path={HISTORY.AWARD_PATHS.ADD_AWARD}
              element={
                <RouteGuard authorization={AUTH_ROLES.TEAM_ADMIN}>
                  <HISTORY.AddAward />
                </RouteGuard>
              }
            />
            <Route
              path={HISTORY.AWARD_PATHS.EDIT_AWARD}
              element={
                <RouteGuard authorization={AUTH_ROLES.TEAM_ADMIN}>
                  <HISTORY.EditAward />
                </RouteGuard>
              }
            />
            {PLAYER_ROUTES()}
            {MATCH_ROUTES()}
          </Route>
          <Route
            path={TEAM.TEAM_PATHS.ADD_SEASON}
            element={
              <RouteGuard authorization={AUTH_ROLES.TEAM_ADMIN}>
                <HISTORY.AddTeamSeason />
              </RouteGuard>
            }
          />
          <Route
            path={TEAM.TEAM_PATHS.EDIT_SEASON}
            element={
              <RouteGuard authorization={AUTH_ROLES.TEAM_ADMIN}>
                <HISTORY.EditTeamSeason />
              </RouteGuard>
            }
          />
          <Route
            path={TEAM.TEAM_PATHS.TROPHY}
            element={
              <RouteGuard authorization={AUTH_ROLES.PUBLIC}>
                <HISTORY.Trophy />
              </RouteGuard>
            }
          />
          <Route
            path={TEAM.TEAM_PATHS.ADD_TROPHY}
            element={
              <RouteGuard authorization={AUTH_ROLES.TEAM_ADMIN}>
                <HISTORY.AddTrophy />
              </RouteGuard>
            }
          />
          <Route
            path={TEAM.TEAM_PATHS.EDIT_TROPHY}
            element={
              <RouteGuard authorization={AUTH_ROLES.TEAM_ADMIN}>
                <HISTORY.EditTrophy />
              </RouteGuard>
            }
          />
          <Route
            path={MATCH.MATCH_PATHS.ADD_MATCH}
            element={
              <RouteGuard authorization={AUTH_ROLES.TEAM_ADMIN}>
                <MATCH.AddMatch />
              </RouteGuard>
            }
          />
          <Route
            path={TEAM.TEAM_PATHS.EDIT_BADGE}
            element={
              <RouteGuard authorization={AUTH_ROLES.TEAM_ADMIN}>
                <TEAM.EditBadge />
              </RouteGuard>
            }
          />
          <Route
            path={TEAM.TEAM_PATHS.EDIT}
            element={
              <RouteGuard authorization={AUTH_ROLES.TEAM_ADMIN}>
                <TEAM.EditTeam />
              </RouteGuard>
            }
          />
          {PLAYER_ROUTES()}
          {MATCH_ROUTES()}
        </Route>
      </Route>
    </Routes>
  );
}
