import { useTranslation } from 'react-i18next';
import { ISelectOptions, PageHeader } from '../../../components';
import Spinner from '../../../components/loaders/spinner/Spinner';
import { TApolloError } from '../../../types/apollo';
import ResultForm from '../forms/result/ResultForm';
import { type ResultFormData } from '../forms/result/schema';

interface Props {
  onSubmit: (data: ResultFormData) => void;
  defaultValues: ResultFormData;
  loading: boolean;
  error?: TApolloError;
  teamOptions: ISelectOptions[];
  competitionOptions: ISelectOptions[];
  orgSeasonOptions: ISelectOptions[];
}

export default function AddResultPage({
  onSubmit,
  defaultValues,
  loading,
  error,
  teamOptions,
  competitionOptions,
  orgSeasonOptions,
}: Props) {
  const { t } = useTranslation('results');

  return (
    <PageHeader title={t('PAGES.ADD')}>
      {loading ? (
        <Spinner />
      ) : (
        <ResultForm
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          teamOptions={teamOptions}
          competitionOptions={competitionOptions}
          orgSeasonOptions={orgSeasonOptions}
          loading={loading}
          error={error}
        />
      )}
    </PageHeader>
  );
}
