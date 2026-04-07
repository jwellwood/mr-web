import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '../../../components';
import ImageForm from '../../../components/forms/image-form/ImageForm';
import { AppIconType } from '../../../components/icons';
import { Spinner } from '../../../components/loaders';
import { TApolloError } from '../../../types/apollo';

interface Props {
  loading: boolean;
  imageUrl: string | null;
  setImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
  onSubmit: (data: { imageFile: File | null }) => void;
  currentUrl: string;
  removeImage: () => void;
  error?: TApolloError;
  fallbackIcon: AppIconType;
}

export default function UpdateOrgBadgePage({
  loading,
  imageUrl,
  setImageUrl,
  onSubmit,
  currentUrl,
  removeImage,
  error,
  fallbackIcon,
}: Props) {
  const { t } = useTranslation('organization');

  return (
    <PageHeader title={t('PAGES.EDIT_BADGE')}>
      {imageUrl ? (
        <ImageForm
          loading={loading}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          onSubmit={onSubmit}
          currentUrl={currentUrl}
          removeImage={removeImage}
          error={error}
          fallbackIcon={fallbackIcon}
        />
      ) : (
        <Spinner />
      )}
    </PageHeader>
  );
}
