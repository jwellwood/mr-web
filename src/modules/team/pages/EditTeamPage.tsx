import { useTranslation } from 'react-i18next';
import { PageContainer } from '../../../components';
import { Spinner } from '../../../components/loaders';
import { TApolloError } from '../../../types/apollo';
import DeleteTeam from '../containers/DeleteTeam';
import EditTeamForm from '../forms/edit-team/EditTeamForm';
import { EditTeamFormData } from '../forms/edit-team/schema';

interface Props {
  onSubmit: (data: EditTeamFormData) => void;
  defaultValues: EditTeamFormData | null;
  loading: boolean;
  error?: TApolloError;
}

export default function EditTeamPage({ onSubmit, defaultValues, loading, error }: Props) {
  const { t } = useTranslation('team');
  return (
    <PageContainer title={t('PAGES.EDIT_TEAM')}>
      {defaultValues ? (
        <>
          <EditTeamForm
            defaultValues={defaultValues}
            onSubmit={onSubmit}
            loading={loading}
            error={error}
          />
          <DeleteTeam />
        </>
      ) : (
        <Spinner />
      )}
    </PageContainer>
  );
}
