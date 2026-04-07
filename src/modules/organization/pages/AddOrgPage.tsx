import { useTranslation } from 'react-i18next';
import { PageHeader } from '../../../components';
import { Spinner } from '../../../components/loaders';
import { useNationality } from '../../../hooks';
import OrgForm from '../forms/org-form/OrgForm';
import { OrganizationFormData } from '../forms/org-form/schema';

interface Props {
  defaultValues?: OrganizationFormData | null;
  onSubmit: (data: OrganizationFormData) => void;
  loading: boolean;
}

export default function AddOrgPage({ defaultValues, onSubmit, loading }: Props) {
  const { t } = useTranslation('organization');
  const { nationalityOptions } = useNationality();
  return (
    <PageHeader title={t('PAGES.ADD')}>
      {defaultValues ? (
        <OrgForm
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          countryOptions={nationalityOptions}
          loading={loading}
        />
      ) : (
        <Spinner />
      )}
    </PageHeader>
  );
}
