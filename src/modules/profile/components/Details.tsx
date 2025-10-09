import { SectionContainer } from '../../../components/containers';
import TextList from '../../../components/lists/TextList';
import { IUser } from '../../../types';
import { parseDate } from '../../../utils/helpers';

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
