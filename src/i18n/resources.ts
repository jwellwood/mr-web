import * as inputs from '../components/inputs/locales';
import * as components from '../components/locales';
import * as auth from '../modules/auth/locales';
import * as awards from '../modules/awards/locales';
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
import * as trophies from '../modules/trophies/locales';

// To add a new module: import its locales/index.ts and add one entry to `namespaces`.
const namespaces = {
  components,
  inputs,
  auth,
  awards,
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
  trophies,
  organization,
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
