import { useTranslation } from 'react-i18next';
import { ISelectOptions, PageHeader } from '../../../components';
import Spinner from '../../../components/loaders/spinner/Spinner';
import BatchResultForm from '../forms/batch-result/BatchResultForm';
import { type BatchResultFormData } from '../forms/batch-result/schema';

interface Props {
  onSubmit: (data: BatchResultFormData) => void;
  defaultValues: BatchResultFormData;
  loading: boolean;
  teamOptions: ISelectOptions[];
  competitionOptions: ISelectOptions[];
  orgSeasonOptions: ISelectOptions[];
}

export default function AddGameweekPage({
  onSubmit,
  defaultValues,
  loading,
  teamOptions,
  competitionOptions,
  orgSeasonOptions,
}: Props) {
  const { t } = useTranslation('results');

  return (
    <PageHeader title={t('PAGES.ADD_GAMEWEEK')}>
      {loading ? (
        <Spinner />
      ) : (
        <BatchResultForm
          competitionOptions={competitionOptions}
          teamOptions={teamOptions}
          orgSeasonOptions={orgSeasonOptions}
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          loading={loading}
        />
      )}
    </PageHeader>
  );
}
