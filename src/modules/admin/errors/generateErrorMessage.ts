import { CombinedGraphQLErrors } from '@apollo/client/errors';
import { ADMIN_ERROR_CODES } from './constants';

export const generateErrorMessage = (error: unknown, t: (key: string) => string) => {
  const errorCode = CombinedGraphQLErrors.is(error) ? error.errors[0]?.extensions?.code : undefined;

  switch (errorCode) {
    case ADMIN_ERROR_CODES.INVALID_TEAM_ADMIN_ACCESS_CODE:
      return t('ERRORS.INVALID_TEAM_ADMIN_ACCESS_CODE');
    case ADMIN_ERROR_CODES.INVALID_ORG_ADMIN_ACCESS_CODE:
      return t('ERRORS.INVALID_ORG_ADMIN_ACCESS_CODE');
    case ADMIN_ERROR_CODES.ORG_ADMIN_ACCESS_DISABLED:
      return t('ERRORS.ORG_ADMIN_ACCESS_DISABLED');
    case ADMIN_ERROR_CODES.ORG_ADMIN_ACCESS_CODE_NOT_SET:
      return t('ERRORS.ORG_ADMIN_ACCESS_CODE_NOT_SET');
    case ADMIN_ERROR_CODES.TEAM_ADMIN_ACCESS_CODE_NOT_SET:
      return t('ERRORS.TEAM_ADMIN_ACCESS_CODE_NOT_SET');
    default:
      return t('ALERTS.REQUEST_ADMIN.ERROR');
  }
};
