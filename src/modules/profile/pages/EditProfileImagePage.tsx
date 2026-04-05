import { useTranslation } from 'react-i18next';
import { PageContainer } from '../../../components';
import ImageForm from '../../../components/forms/image-form/ImageForm';
import { IMAGE_TYPE } from '../../../constants';

interface Props {
  imageUrl: string | null;
  setImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
  onSubmit: (formData: { imageFile: File | null }) => Promise<void>;
  currentUrl?: string;
  removeImage: () => void;
  error?: Error;
  loading: boolean;
}

export default function EditProfileImagePage({
  imageUrl,
  setImageUrl,
  onSubmit,
  currentUrl,
  removeImage,
  error,
  loading,
}: Props) {
  const { t } = useTranslation('profile');
  return (
    <PageContainer title={t('PAGES.EDIT_PROFILE_IMAGE')}>
      <ImageForm
        imageUrl={imageUrl || 'default'}
        setImageUrl={setImageUrl}
        onSubmit={onSubmit}
        currentUrl={currentUrl}
        removeImage={removeImage}
        error={error}
        loading={loading}
        fallbackIcon={IMAGE_TYPE.USER}
      />
    </PageContainer>
  );
}
