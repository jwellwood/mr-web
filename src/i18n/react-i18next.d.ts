import 'react-i18next';
import { AppResources } from './resources';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    resources: AppResources;
  }
}
