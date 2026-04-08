import { useTranslation } from 'react-i18next';
import { PageHeader } from '../../../components';
import type { ISelectOptions } from '../../../components';
import { Spinner } from '../../../components/loaders';
import { TApolloError } from '../../../types/apollo';
import DeleteTrophy from '../containers/DeleteTrophy';
import type { TrophyFormData } from '../forms/schema';
import TrophyForm from '../forms/TrophyForm';

interface Props {
  onSubmit: (data: TrophyFormData) => void;
  defaultValues?: TrophyFormData | null;
  seasonOptions: ISelectOptions[];
  loading: boolean;
  error?: TApolloError;
}

export default function EditTrophyPage({
  onSubmit,
  defaultValues,
  seasonOptions,
  loading,
  error,
}: Props) {
  const { t } = useTranslation('trophies');

  const renderContent = () => {
    return defaultValues ? (
      <>
        <TrophyForm
          defaultValues={defaultValues}
          seasonOptions={seasonOptions}
          onSubmit={onSubmit}
          loading={loading}
          error={error}
        />
        <DeleteTrophy />
      </>
    ) : (
      <Spinner />
    );
  };

  return <PageHeader title={t('PAGES.EDIT_TROPHY')}>{renderContent()}</PageHeader>;
}
