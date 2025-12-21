import React, { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { CustomButton } from '../buttons';
import { FormContainer } from '../containers';
import { CenteredGrid } from '../grids';
import FileInput from '../inputs/FileInput';
import { button_text } from '../../i18n';
import ImageAvatar from '../avatars/image-avatar/ImageAvatar';
import { IMAGE_TYPE } from '../../constants';

interface Props {
  imageUrl?: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
  onSubmit: (data: { imageFile: File | null }) => void;
  currentUrl?: string;
  removeImage: () => void;
  loading?: boolean;
}

const ImageForm: React.FC<Props> = ({
  imageUrl,
  setImageUrl,
  onSubmit,
  currentUrl,
  removeImage,
  loading,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      imageFile: null,
    },
  });

  const resetImage = useCallback(() => {
    reset();
    setImageUrl('default');
  }, [reset, setImageUrl]);

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} loading={loading}>
      <CenteredGrid>
        <Controller
          control={control}
          name="imageFile"
          render={({ field: { name, value, onChange } }) => {
            return (
              <FileInput
                inputName={name}
                defaultValue={value || undefined}
                onChange={event => {
                  onChange(event.target?.files?.[0]);
                  setImageUrl(URL.createObjectURL(event.target?.files?.[0] as File));
                }}
                errors={errors.imageFile ? [errors.imageFile.message as string] : []}
              />
            );
          }}
        />
        <ImageAvatar
          imageUrl={imageUrl}
          size="150px"
          fallbackIcon={IMAGE_TYPE.TEAM}
          iconSize="100px"
        />
        <CustomButton type="reset" onClick={resetImage}>
          {button_text.DEFAULT}
        </CustomButton>
        <CustomButton
          onClick={() => {
            if (currentUrl) {
              setImageUrl(currentUrl);
            }
          }}
        >
          Cancel
        </CustomButton>
        <CustomButton onClick={removeImage}>Remove image</CustomButton>
      </CenteredGrid>
    </FormContainer>
  );
};

export default ImageForm;
