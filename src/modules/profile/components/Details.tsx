import React from 'react';
import { SectionContainer } from '../../../components/containers';
import TextList from '../../../components/lists/TextList';
import { IUser } from '../../../types';
import { parseDate } from '../../../utils/helpers';

type Props = {
  user?: IUser;
};

const ProfileDetails: React.FC<Props> = ({ user }) => {
  if(!user) {
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
};

export default ProfileDetails;
