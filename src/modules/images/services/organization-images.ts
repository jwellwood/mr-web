import { API_PATH } from '../../../app/constants';
import axios from 'axios';

const api = {
  UPLOAD_ORG_BADGE_ROUTE: `${API_PATH.ADMIN}/upload_org_badge`,
  REMOVE_ORG_BADGE_ROUTE: `${API_PATH.ADMIN}/remove_org_badge?public_id=`,
};

export const uploadOrgBadge = (dataToSubmit: FormData) => {
  const route = api.UPLOAD_ORG_BADGE_ROUTE;
  const request = axios.post(route, dataToSubmit).then(res => res.data);
  return request;
};

export const removeOrgBadge = (public_id: string) => {
  const route = `${api.REMOVE_ORG_BADGE_ROUTE}${public_id}`;
  const request = axios.delete(route).then(res => res.data);
  return request;
};
