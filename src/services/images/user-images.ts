import axios from 'axios';
import { API_PATH, ROOT_URL } from '../../constants';
import { authStorage } from '../../utils';

const api = {
  UPLOAD_USER_IMAGE_ROUTE: `${ROOT_URL}${API_PATH.USER}/upload_user_image`,
  REMOVE_USER_IMAGE_ROUTE: `${ROOT_URL}${API_PATH.USER}/remove_user_image?public_id=`,
};

const getAuthHeaders = () => ({
  authorization: authStorage.getToken() ?? '',
});

export const uploadUserImage = (dataToSubmit: FormData) => {
  const route = api.UPLOAD_USER_IMAGE_ROUTE;
  const request = axios
    .post(route, dataToSubmit, { headers: getAuthHeaders() })
    .then(res => res.data);
  return request;
};

export const removeUserImage = (public_id: string) => {
  const route = `${api.REMOVE_USER_IMAGE_ROUTE}${encodeURIComponent(public_id)}`;
  const request = axios.delete(route, { headers: getAuthHeaders() }).then(res => res.data);
  return request;
};
