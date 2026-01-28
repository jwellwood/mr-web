import { DeepOmitTypename } from '../../utils';

import { type Fetch_UserQuery } from './graphql/FETCH_USER.generated';
import { type Fetch_Teams_By_UserQuery } from './graphql/FETCH_TEAMS_BY_USER.generated';
import { type Fetch_Orgs_By_UserQuery } from './graphql/FETCH_ORGS_BY_USER.generated';
import { type Edit_ProfileMutation } from './graphql/EDIT_PROFILE.generated';
import { type Edit_Profile_ImageMutation } from './graphql/EDIT_PROFILE_IMAGE.generated';
import { type Edit_PasswordMutation } from './graphql/EDIT_PASSWORD.generated';
import { type Delete_UserMutation } from './graphql/DELETE_USER.generated';

export type FETCH_USER_QUERY = DeepOmitTypename<Fetch_UserQuery>;
export type FETCH_TEAMS_BY_USER_QUERY = DeepOmitTypename<Fetch_Teams_By_UserQuery>;
export type FETCH_ORGS_BY_USER_QUERY = DeepOmitTypename<Fetch_Orgs_By_UserQuery>;
export type EDIT_PROFILE_MUTATION = DeepOmitTypename<Edit_ProfileMutation>;
export type EDIT_PROFILE_IMAGE_MUTATION = DeepOmitTypename<Edit_Profile_ImageMutation>;
export type EDIT_PASSWORD_MUTATION = DeepOmitTypename<Edit_PasswordMutation>;
export type DELETE_USER_MUTATION = DeepOmitTypename<Delete_UserMutation>;
