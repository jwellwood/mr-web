import { useTranslation } from 'react-i18next';
import { CustomCheckList } from '../../../components/lists';
import { T_FETCH_USER_QUERY } from '../graphql';

const DISMISSED_KEY = 'getting_started_dismissed';

interface Props {
  profile?: T_FETCH_USER_QUERY['user'];
}

export default function GettingStarted({ profile }: Props) {
  const { t } = useTranslation('profile');

  const steps = [
    {
      label: t('GETTING_STARTED.STEPS.UPDATE_PROFILE'),
      done: !!profile?.username && !!profile?.dateOfBirth && !!profile?.nationality,
    },
    {
      label: t('GETTING_STARTED.STEPS.UPLOAD_IMAGE'),
      done: profile?.image?.url !== 'default',
    },
    {
      label: t('GETTING_STARTED.STEPS.JOIN_TEAM'),
      done: !!profile?.teamIds.length || !!profile?.orgIds.length,
    },
  ];

  return (
    <CustomCheckList
      title={t('GETTING_STARTED.TITLE')}
      steps={steps}
      loading={false}
      dismissedKey={DISMISSED_KEY}
    />
  );
}
