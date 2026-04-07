import { useTranslation } from 'react-i18next';
import { PageHeader } from '../../../components';
import { Spinner } from '../../../components/loaders';
import { TApolloError } from '../../../types/apollo';
import DeleteCompetition from '../containers/DeleteCompetition';
import CompetitionForm from '../forms/CompetitionForm';
import type { CompetitionFormData } from '../forms/schema';

interface Props {
  onSubmit: (data: CompetitionFormData) => void;
  defaultValues?: CompetitionFormData | null;
  loading: boolean;
  error?: TApolloError;
}

export default function EditCompetitionPage({ onSubmit, defaultValues, loading, error }: Props) {
  const { t } = useTranslation('competitions');

  const renderContent = () => {
    return defaultValues ? (
      <>
        <CompetitionForm
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          loading={loading}
          error={error}
        />
        <DeleteCompetition />
      </>
    ) : (
      <Spinner />
    );
  };

  return <PageHeader title={t('PAGES.EDIT_COMPETITION')}>{renderContent()}</PageHeader>;
}
