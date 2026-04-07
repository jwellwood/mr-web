import { useTranslation } from 'react-i18next';
import { DataError, PageHeader } from '../../../components';
import { Spinner } from '../../../components/loaders';
import { TApolloError } from '../../../types/apollo';
import MatchFormStepper from '../forms/components/MatchFormStepper';

interface Props {
  onSubmit: () => void;
  ready: boolean;
  loading: boolean;
  error?: TApolloError;
}

export default function AddMatchPage({ onSubmit, ready, loading, error }: Props) {
  const { t } = useTranslation('matches');

  const renderContent = () =>
    ready ? <MatchFormStepper onSubmit={onSubmit} loading={loading} error={error} /> : <Spinner />;

  return (
    <PageHeader title={t('PAGES.ADD_MATCH')}>
      {error ? <DataError error={error} /> : renderContent()}
    </PageHeader>
  );
}
