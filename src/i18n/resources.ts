import * as inputs from '../components/inputs/locales';
import * as components from '../components/locales';
import * as auth from '../modules/auth/locales';
import * as competitions from '../modules/competitions/locales';
import * as home from '../modules/home/locales';
import * as matches from '../modules/matches/locales';
import * as organization from '../modules/organization/locales';
import * as players from '../modules/players/locales';
import * as profile from '../modules/profile/locales';
import * as results from '../modules/results/locales';
import * as seasons from '../modules/seasons/locales';
import * as squad from '../modules/squad/locales';
import * as team from '../modules/team/locales';
import * as teamseasons from '../modules/teamseasons/locales';

// To add a new module: import its locales/index.ts and add one entry to `namespaces`.
const namespaces = {
  components,
  inputs,
  auth,
  competitions,
  home,
  matches,
  players,
  profile,
  results,
  seasons,
  squad,
  team,
  teamseasons,
  organization,
};

type Langs = 'en' | 'es';

const byLang = (lng: Langs) => ({
  ...Object.fromEntries(Object.entries(namespaces).map(([key, ns]) => [key, ns[lng]])),
});

export const resources = { en: byLang('en'), es: byLang('es') };

export type AppResources = (typeof resources)['en'];
