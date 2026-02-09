import React, { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ApolloError } from '@apollo/client';

import { CustomButton } from '../buttons';
import { CenteredGrid } from '../grids';
import FileInput from '../inputs/file-input/FileInput';
import { button_text } from '../../i18n';
import ImageAvatar from '../avatars/image-avatar/ImageAvatar';
import { IMAGE_TYPE } from '../../constants';
import FormContainer from './form-container/FormContainer';

interface Props {
  imageUrl?: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
  onSubmit: (data: { imageFile: File | null }) => void;
  currentUrl?: string;
  removeImage: () => void;
  loading: boolean;
  error?: ApolloError;
}

const ImageForm: React.FC<Props> = ({
  imageUrl,
  setImageUrl,
  onSubmit,
  currentUrl,
  removeImage,
  loading,
  error,
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
    <FormContainer onSubmit={handleSubmit(onSubmit)} loading={loading} error={error}>
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
                errors={
                  errors.imageFile
                    ? Array.isArray(errors.imageFile)
                      ? errors.imageFile.map(err => err)
                      : [errors.imageFile]
                    : []
                }
              />
            );
          }}
        />
        <ImageAvatar
          imageUrl={imageUrl}
          size="150px"
          fallbackIcon={IMAGE_TYPE.BADGE}
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
