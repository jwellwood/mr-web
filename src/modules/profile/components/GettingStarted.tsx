import { useState } from 'react';
import { CustomButton, SectionContainer } from '../../../components';
import { AppIcon } from '../../../components/icons';
import { TextList } from '../../../components/lists';
import { PROFILE_PATHS } from '../router';
import { FETCH_USER_QUERY } from '../types';

const DISMISSED_KEY = 'getting_started_dismissed';

interface Props {
  profile?: FETCH_USER_QUERY['user'];
}

export default function GettingStarted({ profile }: Props) {
  const [dismissed, setDismissed] = useState(() => localStorage.getItem(DISMISSED_KEY) === 'true');

  const onDismiss = () => {
    localStorage.setItem(DISMISSED_KEY, 'true');
    setDismissed(true);
  };
  const steps = [
    {
      label: 'Complete your profile',
      value: (
        <CustomButton link={PROFILE_PATHS.EDIT} variant="text" color="primary">
          Edit Profile
        </CustomButton>
      ),
      done: !!profile?.username && !!profile?.dateOfBirth && !!profile?.nationality,
    },
    {
      label: 'Upload a profile photo',
      value: (
        <CustomButton link={PROFILE_PATHS.EDIT_IMAGE} variant="text" color="primary">
          Upload Image
        </CustomButton>
      ),
      done: profile?.image?.url !== 'default',
    },
    {
      label: 'Create or join a team or organization',
      done: !!profile?.teamIds.length || !!profile?.orgIds.length,
    },
  ];

  const remaining = steps.filter(s => !s.done);

  if (!remaining.length || dismissed) return null;

  return (
    <SectionContainer
      title="Getting Started"
      type="success"
      secondaryAction={<AppIcon icon="cross" color="dark" onClick={onDismiss} />}
    >
      <TextList data={remaining} />
    </SectionContainer>
  );
}
