import { useTranslation } from 'react-i18next';
import { ISelectOptions, PageHeader } from '../../../components';
import { Spinner } from '../../../components/loaders';
import { TApolloError } from '../../../types/apollo';
import BatchResultForm from '../forms/batch-result/BatchResultForm';
import { type BatchResultFormData } from '../forms/batch-result/schema';

interface Props {
  onSubmit: (data: BatchResultFormData) => void;
  defaultValues: BatchResultFormData | null;
  loading: boolean;
  error?: TApolloError;
  orgSeasonOptions: ISelectOptions[];
  originalCount?: number;
}

export default function EditRoundPage({
  onSubmit,
  defaultValues,
  loading,
  error,
  orgSeasonOptions,
  originalCount,
}: Props) {
  const { t } = useTranslation('results');

  const renderContent = () => {
    return defaultValues ? (
      <BatchResultForm
        orgSeasonOptions={orgSeasonOptions}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        loading={loading}
        error={error}
        confirmTitle={t('MESSAGES.GAMEWEEK_CHANGES')}
        originalCount={originalCount}
      />
    ) : (
      <Spinner />
    );
  };

  return <PageHeader title={t('PAGES.EDIT_ROUND')}>{renderContent()}</PageHeader>;
}
