import * as inputs from '../components/inputs/locales';
import * as components from '../components/locales';
import * as auth from '../modules/auth/locales';
import * as home from '../modules/home/locales';
import * as profile from '../modules/profile/locales';
import * as team from '../modules/team/locales';

// To add a new module: import its locales/index.ts and add one entry to `namespaces`.
const namespaces = { components, inputs, auth, home, profile, team };

type Langs = 'en' | 'es';

const byLang = (lng: Langs) => ({
  ...Object.fromEntries(Object.entries(namespaces).map(([key, ns]) => [key, ns[lng]])),
});

export const resources = { en: byLang('en'), es: byLang('es') };

export type AppResources = (typeof resources)['en'];
