import { useTranslation } from 'react-i18next';
import { PageHeader } from '../../../components';
import type { ISelectOptions } from '../../../components';
import { Spinner } from '../../../components/loaders';
import { TApolloError } from '../../../types/apollo';
import DeleteAward from '../containers/DeleteAward';
import AwardForm from '../forms/AwardForm';
import type { AwardFormData } from '../forms/schema';

interface Props {
  onSubmit: (data: Partial<AwardFormData>) => void;
  defaultValues?: AwardFormData | null;
  playerOptions: ISelectOptions[];
  loading: boolean;
  error?: TApolloError;
}

export default function EditAwardPage({
  onSubmit,
  defaultValues,
  playerOptions,
  loading,
  error,
}: Props) {
  const { t } = useTranslation('awards');

  const renderContent = () => {
    return loading || !defaultValues ? (
      <Spinner />
    ) : (
      <>
        <AwardForm
          defaultValues={defaultValues}
          playersOptions={playerOptions}
          onSubmit={onSubmit}
          loading={loading}
          error={error}
        />
        <DeleteAward />
      </>
    );
  };

  return <PageHeader title={t('PAGES.EDIT_AWARD')}>{renderContent()}</PageHeader>;
}
