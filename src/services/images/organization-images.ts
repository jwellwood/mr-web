import axios from 'axios';
import { API_PATH, ROOT_URL } from '../../constants';
import { authStorage } from '../../utils';

const api = {
  UPLOAD_ORG_BADGE_ROUTE: `${ROOT_URL}${API_PATH.ADMIN}/upload_org_badge`,
  REMOVE_ORG_BADGE_ROUTE: `${ROOT_URL}${API_PATH.ADMIN}/remove_org_badge?public_id=`,
};

const getAuthHeaders = () => ({
  authorization: authStorage.getToken() ?? '',
});

export const uploadOrgBadge = (dataToSubmit: FormData) => {
  const route = api.UPLOAD_ORG_BADGE_ROUTE;
  const request = axios
    .post(route, dataToSubmit, { headers: getAuthHeaders() })
    .then(res => res.data);
  return request;
};

export const removeOrgBadge = (public_id: string) => {
  const route = `${api.REMOVE_ORG_BADGE_ROUTE}${encodeURIComponent(public_id)}`;
  const request = axios.delete(route, { headers: getAuthHeaders() }).then(res => res.data);
  return request;
};
