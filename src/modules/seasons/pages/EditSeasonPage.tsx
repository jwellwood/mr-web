import { useTranslation } from 'react-i18next';
import { ISelectOptions, PageHeader } from '../../../components';
import { Spinner } from '../../../components/loaders';
import { TApolloError } from '../../../types/apollo';
import DeleteOrgSeason from '../containers/DeleteOrgSeason';
import OrgSeasonForm from '../forms/OrgSeasonForm';
import type { OrgSeasonFormData } from '../forms/schema';

interface Props {
  onSubmit: (data: OrgSeasonFormData) => void;
  defaultValues?: OrgSeasonFormData | null;
  teamOptions: ISelectOptions[];
  competitionOptions: ISelectOptions[];
  loading: boolean;
  error?: TApolloError;
}

export default function EditSeasonPage({
  onSubmit,
  defaultValues,
  teamOptions,
  competitionOptions,
  loading,
  error,
}: Props) {
  const { t } = useTranslation('seasons');

  const renderContent = () => {
    return defaultValues ? (
      <>
        <OrgSeasonForm
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          loading={loading}
          error={error}
          teamOptions={teamOptions}
          competitionOptions={competitionOptions}
        />
        <DeleteOrgSeason />
      </>
    ) : (
      <Spinner />
    );
  };

  return <PageHeader title={t('PAGES.EDIT_SEASON')}>{renderContent()}</PageHeader>;
}
