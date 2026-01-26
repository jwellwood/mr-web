import type { EditProfileFormData } from './validation';
import { FETCH_USER_QUERY } from '../../types';

export function backendToFrontend(user: FETCH_USER_QUERY['user']): EditProfileFormData {
  return {
    username: user.username,
    email: user.email,
    dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth) : undefined,
    nationality: user.nationality ?? undefined,
  } as EditProfileFormData;
}

export function frontendToBackend(form: EditProfileFormData) {
  const vars: {
    username: string;
    email: string;
    dateOfBirth?: string | null;
    nationality?: string | null;
  } = {
    username: form.username,
    email: form.email,
  };

  if (form.dateOfBirth instanceof Date && !isNaN(form.dateOfBirth.getTime())) {
    vars.dateOfBirth = form.dateOfBirth.toISOString();
  }

  if (typeof form.nationality === 'string') {
    vars.nationality = form.nationality === '' ? null : form.nationality;
  }

  return vars;
}

export default { backendToFrontend, frontendToBackend };
