import { useTranslation } from 'react-i18next';
import { PageHeader } from '../../../components';
import type { ISelectOptions } from '../../../components';
import { TApolloError } from '../../../types/apollo';
import AwardForm from '../forms/AwardForm';
import type { AwardFormData } from '../forms/schema';

interface Props {
  onSubmit: (data: AwardFormData) => void;
  defaultValues: AwardFormData;
  playerOptions: ISelectOptions[];
  loading: boolean;
  error?: TApolloError;
}

export default function AddAwardPage({
  onSubmit,
  defaultValues,
  playerOptions,
  loading,
  error,
}: Props) {
  const { t } = useTranslation('awards');

  return (
    <PageHeader title={t('PAGES.ADD_AWARD')}>
      <AwardForm
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        playersOptions={playerOptions}
        loading={loading}
        error={error}
      />
    </PageHeader>
  );
}
