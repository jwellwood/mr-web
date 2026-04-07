import { useTranslation } from 'react-i18next';
import { PageHeader } from '../../../components';
import { Spinner } from '../../../components/loaders';
import { useNationality } from '../../../hooks';
import { TApolloError } from '../../../types/apollo';
import DeleteOrg from '../containers/DeleteOrg';
import OrgForm from '../forms/org-form/OrgForm';
import type { OrganizationFormData } from '../forms/org-form/schema';

interface Props {
  defaultValues: OrganizationFormData | null;
  onSubmit: (data: OrganizationFormData) => void;
  loading: boolean;
  error?: TApolloError;
}

export default function EditOrgPage({ defaultValues, onSubmit, loading, error }: Props) {
  const { t } = useTranslation('organization');
  const { nationalityOptions } = useNationality();

  return (
    <PageHeader title={t('PAGES.EDIT')}>
      {defaultValues ? (
        <>
          <OrgForm
            defaultValues={defaultValues}
            onSubmit={onSubmit}
            countryOptions={nationalityOptions}
            loading={loading}
            error={error}
          />
          <DeleteOrg />
        </>
      ) : (
        <Spinner />
      )}
    </PageHeader>
  );
}
