import { useState } from 'react';
import { CustomButton, CustomTypography, SectionContainer } from '../../../components';
import { AppIcon } from '../../../components/icons';
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
      label: (
        <CustomTypography bold color="data">
          Complete your profile
        </CustomTypography>
      ),
      secondary: 'Help your teammates get to know you by adding some basic info.',
      value: (
        <CustomButton link={PROFILE_PATHS.EDIT} variant="text" color="primary">
          Edit Profile
        </CustomButton>
      ),
      link: PROFILE_PATHS.EDIT,
      done: !!profile?.username && !!profile?.dateOfBirth && !!profile?.nationality,
    },
    {
      label: (
        <CustomTypography bold color="data">
          Upload a profile photo
        </CustomTypography>
      ),
      secondary: 'Put a face to the name.',
      value: (
        <CustomButton link={PROFILE_PATHS.EDIT_IMAGE} variant="text" color="primary">
          Upload Image
        </CustomButton>
      ),
      done: profile?.image?.url !== 'default',
    },
    {
      label: (
        <CustomTypography bold color="data">
          Create or join
        </CustomTypography>
      ),
      secondary: 'Create an organization or join a team by clicking the buttons below.',
      done: !!profile?.teamIds.length || !!profile?.orgIds.length,
    },
  ];

  const remaining = steps.filter(s => !s.done);

  if (!remaining.length || dismissed) return null;

  return (
    <SectionContainer
      title="Getting Started"
      type="success"
      secondaryAction={<AppIcon icon="cross" color="label" onClick={onDismiss} />}
    >
      {remaining.map((step, index) => (
        <SectionContainer key={index} title={step.label}>
          <CustomTypography key={index} color="label">
            {step.secondary}
          </CustomTypography>
          {step.value}
        </SectionContainer>
      ))}
      <SectionContainer>
        <CustomTypography>
          You can manage your profile at any time by clicking the{' '}
          <CustomButton variant="outlined" color="tertiary">
            Admin
          </CustomButton>{' '}
          button in the top right corner of the page.
        </CustomTypography>
      </SectionContainer>
    </SectionContainer>
  );
}
