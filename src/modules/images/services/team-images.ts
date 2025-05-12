import { API_PATH } from '../../../app/constants';
import axios from 'axios';

const api = {
  UPLOAD_TEAM_BADGE_ROUTE: `${API_PATH.ADMIN}/upload_team_badge`,
  REMOVE_TEAM_BADGE_ROUTE: `${API_PATH.ADMIN}/remove_team_badge?public_id=`,
};

export const uploadTeamBadge = (dataToSubmit: FormData) => {
  const route = api.UPLOAD_TEAM_BADGE_ROUTE;
  const request = axios.post(route, dataToSubmit).then(res => res.data);
  return request;
};

export const removeTeamBadge = (public_id: string) => {
  const route = `${api.REMOVE_TEAM_BADGE_ROUTE}${public_id}`;
  const request = axios.delete(route).then(res => res.data);
  return request;
};
