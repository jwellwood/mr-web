import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { button_text } from '../../../i18n';
import { TApolloError } from '../../../types/apollo';
import ImageAvatar from '../../avatars/image-avatar/ImageAvatar';
import { CustomButton } from '../../buttons';
import { CustomGridContainer, CustomStack } from '../../grids';
import { AppIconType } from '../../icons';
import { ControlledFileInput } from '../../inputs';
import ConfirmationModal from '../../modals/confirmation-modal/ConfirmationModal';
import FormContainer from '../form-container/FormContainer';

interface Props {
  imageUrl?: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
  onSubmit: (data: { imageFile: File | null }) => void;
  currentUrl?: string;
  removeImage: () => void;
  loading: boolean;
  error?: TApolloError;
  fallbackIcon: AppIconType;
}

export default function ImageForm({
  imageUrl,
  setImageUrl,
  onSubmit,
  currentUrl,
  removeImage,
  loading,
  error,
  fallbackIcon,
}: Props) {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      imageFile: null,
    },
  });

  const resetImage = useCallback(() => {
    reset();
    setImageUrl('default');
  }, [reset, setImageUrl]);

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      loading={loading}
      error={error}
      submitBtn={{ disabled: currentUrl === imageUrl }}
    >
      <ControlledFileInput
        control={control}
        name="imageFile"
        onFileChange={url => setImageUrl(url)}
        accept="image/jpeg,image/png,image/webp,image/gif"
      />
      <CustomGridContainer>
        <ImageAvatar
          imageUrl={imageUrl}
          size="150px"
          fallbackIcon={fallbackIcon}
          iconSize="100px"
          centered
        />

        <CustomStack direction="row" spacing={2} justify="center">
          {currentUrl && imageUrl !== 'default' && (
            <CustomButton onClick={resetImage} color="info">
              {button_text.DEFAULT}
            </CustomButton>
          )}
          {currentUrl !== imageUrl && (
            <CustomButton
              color="warning"
              onClick={() => {
                reset();
                if (currentUrl) {
                  setImageUrl(currentUrl);
                }
              }}
            >
              Cancel
            </CustomButton>
          )}

          {currentUrl && currentUrl !== 'default' && imageUrl !== 'default' && (
            <ConfirmationModal
              title="Remove image"
              loading={loading}
              onConfirm={removeImage}
              btn={<CustomButton color="error">Remove image</CustomButton>}
            >
              This will remove your current image and cannot be undone. Are you sure you want to
              continue?
            </ConfirmationModal>
          )}
        </CustomStack>
      </CustomGridContainer>
    </FormContainer>
  );
}
