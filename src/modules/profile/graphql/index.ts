import { DeepOmitTypename } from '../../../utils';
import { Delete_UserDocument, type Delete_UserMutation } from './DELETE_USER.generated';
import { Edit_PasswordDocument, type Edit_PasswordMutation } from './EDIT_PASSWORD.generated';
import { Edit_ProfileDocument, type Edit_ProfileMutation } from './EDIT_PROFILE.generated';
import {
  Edit_Profile_ImageDocument,
  type Edit_Profile_ImageMutation,
} from './EDIT_PROFILE_IMAGE.generated';
import {
  Fetch_Orgs_By_UserDocument,
  type Fetch_Orgs_By_UserQuery,
} from './FETCH_ORGS_BY_USER.generated';
import {
  Fetch_Teams_By_UserDocument,
  type Fetch_Teams_By_UserQuery,
} from './FETCH_TEAMS_BY_USER.generated';
import { Fetch_UserDocument, type Fetch_UserQuery } from './FETCH_USER.generated';

export {
  Fetch_UserDocument as FETCH_USER,
  Fetch_Teams_By_UserDocument as FETCH_TEAMS_BY_USER,
  Fetch_Orgs_By_UserDocument as FETCH_ORGS_BY_USER,
  Edit_ProfileDocument as EDIT_PROFILE,
  Edit_Profile_ImageDocument as EDIT_PROFILE_IMAGE,
  Edit_PasswordDocument as EDIT_PASSWORD,
  Delete_UserDocument as DELETE_USER,
};

export type T_FETCH_USER_QUERY = DeepOmitTypename<Fetch_UserQuery>;
export type T_FETCH_TEAMS_BY_USER_QUERY = DeepOmitTypename<Fetch_Teams_By_UserQuery>;
export type T_FETCH_ORGS_BY_USER_QUERY = DeepOmitTypename<Fetch_Orgs_By_UserQuery>;
export type T_EDIT_PROFILE_MUTATION = DeepOmitTypename<Edit_ProfileMutation>;
export type T_EDIT_PROFILE_IMAGE_MUTATION = DeepOmitTypename<Edit_Profile_ImageMutation>;
export type T_EDIT_PASSWORD_MUTATION = DeepOmitTypename<Edit_PasswordMutation>;
export type T_DELETE_USER_MUTATION = DeepOmitTypename<Delete_UserMutation>;
