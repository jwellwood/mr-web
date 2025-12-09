import TextList from '../../../components/lists/TextList';

import { parseDate } from '../../../utils/helpers';
import { IUser } from '../../auth/types';
import { SectionContainer } from '../../../components';

type Props = {
  user: IUser | null;
};

export default function ProfileDetails({ user }: Props) {
  if (!user) {
    return null;
  }
  const { email, createdAt, updatedAt } = user;
  const details = [
    { label: 'Email', value: email || '-' },
    { label: 'Created', value: parseDate(createdAt) || '-' },
    { label: 'Last updated', value: parseDate(updatedAt) || '-' },
  ] as const;

  return (
    <SectionContainer>
      <TextList data={details} />
    </SectionContainer>
  );
}
