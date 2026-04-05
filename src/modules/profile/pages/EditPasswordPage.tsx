import { useTranslation } from 'react-i18next';
import { PageContainer } from '../../../components';
import EditPasswordForm from '../forms/edit-password/EditPasswordForm';
import { ChangePasswordFormData } from '../forms/edit-password/schema';

interface Props {
  onSubmit: (formData: ChangePasswordFormData) => void;
  loading: boolean;
  defaultValues: ChangePasswordFormData;
}

export default function EditPasswordPage({ onSubmit, loading, defaultValues }: Props) {
  const { t, i18n } = useTranslation('profile');
  return (
    <PageContainer title={t('PAGES.CHANGE_PASSWORD')}>
      <EditPasswordForm
        key={i18n.language}
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        loading={loading}
      />
    </PageContainer>
  );
}
