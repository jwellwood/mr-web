import { useTranslation } from 'react-i18next';
import { CustomCheckList } from '../../../components/lists';
import { useTeamSetupChecklist } from '../hooks/useTeamSetupChecklist';

export default function TeamSetupChecklist() {
  const { t } = useTranslation('team');
  const { steps, allDone, loading } = useTeamSetupChecklist();

  return (
    <CustomCheckList
      title={t('CHECKLIST.TITLE')}
      steps={steps}
      allDone={allDone}
      loading={loading}
    />
  );
}
