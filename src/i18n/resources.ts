import * as inputs from '../components/inputs/locales';
import * as components from '../components/locales';
import * as hooks from '../hooks/locales';
import * as auth from '../modules/auth/locales';
import * as awards from '../modules/awards/locales';
import * as competitions from '../modules/competitions/locales';
import * as goalscorers from '../modules/goalscorers/locales';
import * as home from '../modules/home/locales';
import * as matches from '../modules/matches/locales';
import * as organization from '../modules/organization/locales';
import * as players from '../modules/players/locales';
import * as profile from '../modules/profile/locales';
import * as results from '../modules/results/locales';
import * as seasons from '../modules/seasons/locales';
import * as squad from '../modules/squad/locales';
import * as tables from '../modules/tables/locales';
import * as team from '../modules/team/locales';
import * as teamseasons from '../modules/teamseasons/locales';
import * as trophies from '../modules/trophies/locales';

// To add a new module: import its locales/index.ts and add one entry to `namespaces`.
const namespaces = {
  auth,
  awards,
  competitions,
  components,
  goalscorers,
  home,
  hooks,
  inputs,
  matches,
  organization,
  players,
  profile,
  results,
  seasons,
  squad,
  tables,
  team,
  teamseasons,
  trophies,
};

type Langs = 'en' | 'es';

// Preserves namespace key types so AppResources is fully typed for autocompletion
function byLang<T extends Record<string, { en: object; es: object }>>(
  ns: T,
  lng: Langs
): { [K in keyof T]: T[K]['en'] } {
  return Object.fromEntries(Object.entries(ns).map(([key, val]) => [key, val[lng]])) as {
    [K in keyof T]: T[K]['en'];
  };
}

export const resources = { en: byLang(namespaces, 'en'), es: byLang(namespaces, 'es') };

export type AppResources = (typeof resources)['en'];
