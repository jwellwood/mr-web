import { useTranslation } from 'react-i18next';
import { PageHeader } from '../../../components';
import type { ISelectOptions } from '../../../components';
import { Spinner } from '../../../components/loaders';
import { TApolloError } from '../../../types/apollo';
import DeleteSeason from '../containers/DeleteSeason';
import type { SeasonFormData } from '../forms/schema';
import SeasonForm from '../forms/SeasonForm';

interface Props {
  onSubmit: (data: SeasonFormData) => void;
  defaultValues?: SeasonFormData | null;
  competitionOptions: ISelectOptions[];
  loading: boolean;
  error?: TApolloError;
}

export default function EditSeasonPage({
  onSubmit,
  defaultValues,
  competitionOptions,
  loading,
  error,
}: Props) {
  const { t } = useTranslation('teamseasons');

  const renderContent = () => {
    return defaultValues ? (
      <>
        <SeasonForm
          competitionOptions={competitionOptions}
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          loading={loading}
          error={error}
        />
        <DeleteSeason />
      </>
    ) : (
      <Spinner />
    );
  };

  return <PageHeader title={t('PAGES.EDIT_SEASON')}>{renderContent()}</PageHeader>;
}
