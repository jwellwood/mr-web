import React from 'react';
import { useTranslation } from 'react-i18next';
import { DataError, PageHeader } from '../../../components';
import ImageForm from '../../../components/forms/image-form/ImageForm';
import { Spinner } from '../../../components/loaders';
import { IMAGE_TYPE } from '../../../constants';
import { TApolloError } from '../../../types/apollo';

interface Props {
  loading: boolean;
  onSubmit: (data: { imageFile: File | null }) => void;
  removeImage: () => void;
  setImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
  imageUrl: string | null;
  error?: TApolloError;
}

export default function EditPlayerPhotoPage({
  loading,
  onSubmit,
  removeImage,
  setImageUrl,
  imageUrl,
  error,
}: Props) {
  const { t } = useTranslation('players');
  const renderContent = () => {
    return imageUrl ? (
      <ImageForm
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
        currentUrl={imageUrl}
        onSubmit={onSubmit}
        removeImage={removeImage}
        loading={loading}
        error={error}
        fallbackIcon={IMAGE_TYPE.USER}
      />
    ) : (
      <Spinner />
    );
  };

  return (
    <PageHeader title={t('PAGES.EDIT_PLAYER_PHOTO')}>
      {error ? <DataError error={error as TApolloError} /> : renderContent()}
    </PageHeader>
  );
}
