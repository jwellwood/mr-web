import { useTranslation } from 'react-i18next';
import { PageHeader } from '../../../components';
import type { ISelectOptions } from '../../../components';
import { Spinner } from '../../../components/loaders';
import { TApolloError } from '../../../types/apollo';
import type { TrophyFormData } from '../forms/schema';
import TrophyForm from '../forms/TrophyForm';

interface Props {
  onSubmit: (data: TrophyFormData) => void;
  defaultValues?: TrophyFormData;
  seasonOptions: ISelectOptions[];
  loading: boolean;
  error?: TApolloError;
}

export default function AddTrophyPage({
  onSubmit,
  defaultValues,
  seasonOptions,
  loading,
  error,
}: Props) {
  const { t } = useTranslation('trophies');

  const renderContent = () => {
    return defaultValues ? (
      <TrophyForm
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        seasonOptions={seasonOptions}
        loading={loading}
        error={error}
      />
    ) : (
      <Spinner />
    );
  };

  return <PageHeader title={t('PAGES.ADD_TROPHY')}>{renderContent()}</PageHeader>;
}
