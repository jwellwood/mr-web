import React from 'react';
import { IMAGE_TYPE } from '../../../app/constants';
import ModuleHeader from '../../../components/common/ModuleHeader';
import {IUser} from "../../../types";
import { useDateOfBirth } from '../../../hooks';
import { parseDate } from '../../../utils/helpers';

interface Props {
  user?: IUser;
}

const Profile: React.FC<Props> = ({
  user: { image, username, dateOfBirth, nationality } = {},
}) => {
  const { age } = useDateOfBirth(dateOfBirth);
  return (
    <>
      <ModuleHeader
        title={username}
        badge={image?.url}
        data={[
          { label: '', value: dateOfBirth ? parseDate(dateOfBirth) : '-' },
          { label: 'Age', value: dateOfBirth ? age : '-' },
        ]}
        country={nationality}
        type={IMAGE_TYPE.USER}
      />
    </>
  );
};

export default Profile;
