import { IMAGE_TYPE } from '../../../app/constants';
import ModuleHeader from '../../../components/common/ModuleHeader';
import { IUser } from '../../../types';
import { useDateOfBirth } from '../../../hooks';
import { parseDate } from '../../../utils/helpers';

interface Props {
  user: IUser | null;
}

export default function Profile({ user }: Props) {
  const { image, username, dateOfBirth, nationality } = user || {};
  const { age } = useDateOfBirth(dateOfBirth);
  if (!user) {
    return null;
  }
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
}
