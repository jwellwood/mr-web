import { API_PATH } from 'app/constants';
import axios from 'axios';

const api = {
  UPLOAD_USER_IMAGE_ROUTE: `${API_PATH.USER}/upload_user_image`,
  REMOVE_USER_IMAGE_ROUTE: `${API_PATH.USER}/remove_user_image?public_id=`,
};

export const uploadUserImage = (dataToSubmit: FormData) => {
  const route = api.UPLOAD_USER_IMAGE_ROUTE;
  const request = axios.post(route, dataToSubmit).then((res) => res.data);
  return request;
};

export const removeUserImage = (public_id: string) => {
  const route = `${api.REMOVE_USER_IMAGE_ROUTE}${public_id}`;
  const request = axios.delete(route).then((res) => res.data);
  return request;
};
