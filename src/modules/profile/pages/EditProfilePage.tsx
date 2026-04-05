import { useTranslation } from 'react-i18next';
import { PageContainer } from '../../../components';
import { Spinner } from '../../../components/loaders';
import { TApolloError } from '../../../types/apollo';
import DeleteAccount from '../containers/DeleteAccount';
import EditProfileForm from '../forms/edit-profile/EditProfileForm';
import { EditProfileFormData } from '../forms/edit-profile/schema';

interface Props {
  onSubmit: (formData: EditProfileFormData) => Promise<void>;
  defaultValues: EditProfileFormData | null;
  loading: boolean;
  error?: TApolloError;
}

export default function EditProfilePage({ onSubmit, defaultValues, loading, error }: Props) {
  const { t } = useTranslation('profile');

  return (
    <PageContainer title={t('PAGES.EDIT_PROFILE')}>
      {defaultValues ? (
        <>
          <EditProfileForm
            onSubmit={onSubmit}
            defaultValues={defaultValues}
            loading={loading}
            error={error}
          />

          <DeleteAccount />
        </>
      ) : (
        <Spinner />
      )}
    </PageContainer>
  );
}
