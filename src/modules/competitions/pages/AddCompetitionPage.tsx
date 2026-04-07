import { useTranslation } from 'react-i18next';
import { PageHeader } from '../../../components';
import Spinner from '../../../components/loaders/spinner/Spinner';
import { TApolloError } from '../../../types/apollo';
import CompetitionForm from '../forms/CompetitionForm';
import { type CompetitionFormData } from '../forms/schema';

interface Props {
  onSubmit: (data: CompetitionFormData) => void;
  defaultValues?: CompetitionFormData;
  loading: boolean;
  error?: TApolloError;
}

export default function AddCompetitionPage({ onSubmit, defaultValues, loading, error }: Props) {
  const { t } = useTranslation('competitions');
  const renderContent = () => {
    return defaultValues ? (
      <CompetitionForm
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        loading={loading}
        error={error}
      />
    ) : (
      <Spinner />
    );
  };

  return <PageHeader title={t('PAGES.ADD_COMPETITION')}>{renderContent()}</PageHeader>;
}
