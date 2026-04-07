import { useTranslation } from 'react-i18next';
import { ISelectOptions, PageHeader } from '../../../components';
import { Spinner } from '../../../components/loaders';
import { TApolloError } from '../../../types/apollo';
import DeleteResult from '../containers/DeleteResult';
import ResultForm from '../forms/result/ResultForm';
import { type ResultFormData } from '../forms/result/schema';

interface Props {
  onSubmit: (data: ResultFormData) => void;
  defaultValues?: ResultFormData | null;
  loading: boolean;
  error?: TApolloError;
  teamOptions: ISelectOptions[];
  competitionOptions: ISelectOptions[];
  orgSeasonOptions: ISelectOptions[];
}

export default function EditResultPage({
  onSubmit,
  defaultValues,
  loading,
  error,
  teamOptions,
  competitionOptions,
  orgSeasonOptions,
}: Props) {
  const { t } = useTranslation('results');

  const renderContent = () => {
    return defaultValues ? (
      <>
        <ResultForm
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          teamOptions={teamOptions}
          competitionOptions={competitionOptions}
          orgSeasonOptions={orgSeasonOptions}
          loading={loading}
          error={error}
        />
        <DeleteResult />
      </>
    ) : (
      <Spinner />
    );
  };

  return <PageHeader title={t('PAGES.EDIT')}>{renderContent()}</PageHeader>;
}
