import React from 'react';
import { SectionContainer } from 'components/containers';
import TextList from 'components/lists/TextList';
import { IUser } from 'types';
import { parseDate } from 'utils/helpers';

type Props = {
  user: IUser;
};

const ProfileDetails: React.FC<Props> = ({ user }) => {
  const { email, createdAt, updatedAt } = user;
  const details = [
    { label: 'Email', value: email },
    { label: 'Created', value: createdAt ? parseDate(createdAt) : '-' },
    { label: 'Last updated', value: updatedAt ? parseDate(updatedAt) : '-' },
  ];
  return (
    <SectionContainer>
      <TextList data={details} />
    </SectionContainer>
  );
};

export default ProfileDetails;
