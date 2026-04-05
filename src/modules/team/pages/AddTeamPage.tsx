import { useTranslation } from 'react-i18next';
import { PageContainer } from '../../../components';
import AddTeamForm from '../forms/add-team/AddTeamForm';
import { TeamFormData } from '../forms/add-team/schema';

interface Props {
  onSubmit: (data: TeamFormData) => void;
  loading: boolean;
  defaultValues: TeamFormData;
}

export default function AddTeamPage({ onSubmit, loading, defaultValues }: Props) {
  const { t } = useTranslation('team');

  return (
    <PageContainer title={t('PAGES.ADD_TEAM')}>
      <AddTeamForm onSubmit={onSubmit} loading={loading} defaultValues={defaultValues} />
    </PageContainer>
  );
}
