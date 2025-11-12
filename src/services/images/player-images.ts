import axios from 'axios';
import { API_PATH } from '../../app/constants';

const api = {
  UPLOAD_PLAYER_PHOTO_ROUTE: `${API_PATH.ADMIN}/upload_player_photo`,
  REMOVE_PLAYER_PHOTO_ROUTE: `${API_PATH.ADMIN}/remove_player_photo?public_id=`,
};

export const uploadPlayerPhoto = (dataToSubmit: FormData) => {
  const route = api.UPLOAD_PLAYER_PHOTO_ROUTE;
  const request = axios.post(route, dataToSubmit).then(res => res.data);
  return request;
};

export const removePlayerPhoto = (public_id: string) => {
  const route = `${api.REMOVE_PLAYER_PHOTO_ROUTE}${public_id}`;
  const request = axios.delete(route).then(res => res.data);
  return request;
};
