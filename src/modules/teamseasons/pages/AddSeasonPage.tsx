import { useTranslation } from 'react-i18next';
import { PageHeader } from '../../../components';
import type { ISelectOptions } from '../../../components';
import { Spinner } from '../../../components/loaders';
import { TApolloError } from '../../../types/apollo';
import type { SeasonFormData } from '../forms/schema';
import SeasonForm from '../forms/SeasonForm';

interface Props {
  onSubmit: (data: SeasonFormData) => void;
  defaultValues?: SeasonFormData;
  competitionOptions: ISelectOptions[];
  loading: boolean;
  error?: TApolloError;
}

export default function AddSeasonPage({
  onSubmit,
  defaultValues,
  competitionOptions,
  loading,
  error,
}: Props) {
  const { t } = useTranslation('teamseasons');

  const renderContent = () => {
    return defaultValues ? (
      <SeasonForm
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        competitionOptions={competitionOptions}
        loading={loading}
        error={error}
      />
    ) : (
      <Spinner />
    );
  };

  return <PageHeader title={t('PAGES.ADD_SEASON')}>{renderContent()}</PageHeader>;
}
