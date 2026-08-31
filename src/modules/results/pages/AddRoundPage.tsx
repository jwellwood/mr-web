import { useTranslation } from 'react-i18next';
import { ISelectOptions, PageHeader } from '../../../components';
import Spinner from '../../../components/loaders/spinner/Spinner';
import BatchResultForm from '../forms/batch-result/BatchResultForm';
import { type BatchResultFormData } from '../forms/batch-result/schema';

interface Props {
  onSubmit: (data: BatchResultFormData) => void;
  defaultValues: BatchResultFormData;
  loading: boolean;
  orgSeasonOptions: ISelectOptions[];
}

export default function AddRoundPage({
  onSubmit,
  defaultValues,
  loading,
  orgSeasonOptions,
}: Props) {
  const { t } = useTranslation('results');

  return (
    <PageHeader title={t('PAGES.ADD_ROUND')}>
      {loading ? (
        <Spinner />
      ) : (
        <BatchResultForm
          orgSeasonOptions={orgSeasonOptions}
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          loading={loading}
        />
      )}
    </PageHeader>
  );
}
