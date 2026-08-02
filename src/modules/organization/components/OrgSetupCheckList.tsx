import { useTranslation } from 'react-i18next';
import { CustomCheckList } from '../../../components/lists';
import { useOrgSetupChecklist } from '../hooks/useOrgSetupChecklist';
export default function OrgSetupChecklist() {
  const { t } = useTranslation('organization');

  const { steps, allDone, loading } = useOrgSetupChecklist();

  return (
    <CustomCheckList
      title={t('CHECKLIST.TITLE')}
      steps={steps}
      allDone={allDone}
      loading={loading}
    />
  );
}
