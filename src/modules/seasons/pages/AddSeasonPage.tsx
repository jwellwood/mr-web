import { useTranslation } from 'react-i18next';
import { ISelectOptions, PageHeader } from '../../../components';
import Spinner from '../../../components/loaders/spinner/Spinner';
import { TApolloError } from '../../../types/apollo';
import OrgSeasonForm from '../forms/OrgSeasonForm';
import type { OrgSeasonFormData } from '../forms/schema';

interface Props {
  onSubmit: (data: OrgSeasonFormData) => void;
  defaultValues?: OrgSeasonFormData;
  teamOptions: ISelectOptions[];
  competitionOptions: ISelectOptions[];
  loading: boolean;
  error?: TApolloError;
}

export default function AddSeasonPage({
  onSubmit,
  defaultValues,
  teamOptions,
  competitionOptions,
  loading,
  error,
}: Props) {
  const { t } = useTranslation('seasons');

  return (
    <PageHeader title={t('PAGES.ADD_SEASON')}>
      {defaultValues ? (
        <OrgSeasonForm
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          loading={loading}
          error={error}
          teamOptions={teamOptions}
          competitionOptions={competitionOptions}
        />
      ) : (
        <Spinner />
      )}
    </PageHeader>
  );
}
