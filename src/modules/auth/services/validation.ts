import { API_PATH } from 'app/constants';
import axios from 'axios';

const api = {
  VERIFY_EMAIL_ROUTE: `${API_PATH.PUBLIC}/verify_email?token=`,
  RESEND_VALIDATION_EMAIL: `${API_PATH.PUBLIC}/resend_validation_email`,
};

export const verifyEmail = (token: string) => {
  const route = `${api.VERIFY_EMAIL_ROUTE}${token}`;
  const request = axios.post(route).then((res) => res.data);
  return request;
};

export const resendValidationEmail = (email: string) => {
  const route = api.RESEND_VALIDATION_EMAIL;
  const request = axios.post(route, { email }).then((res) => res.data);
  return request;
};
