import { ApolloError } from '@apollo/client';

import { DataError } from '../../../../components';
import { Spinner } from '../../../../components/loaders';
import ImageForm from '../../../../components/forms/ImageForm';
import { ITeamResponse } from '../../types';

interface Props {
  loading: boolean;
  error?: ApolloError;
  onSubmit: (formData: { imageFile: File | null }) => void;
  imageUrl?: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
  data?: { team: ITeamResponse };
  removeImage: () => void;
}

export default function EditTeamBadgeView({
  data,
  loading,
  onSubmit,
  error,
  imageUrl,
  setImageUrl,
  removeImage,
}: Props) {
  if (error) {
    return <DataError error={error} />;
  }
  return data?.team ? (
    <ImageForm
      imageUrl={imageUrl}
      setImageUrl={setImageUrl}
      onSubmit={onSubmit}
      currentUrl={data.team?.teamBadge?.url as string}
      removeImage={removeImage}
      loading={loading}
    />
  ) : (
    <Spinner />
  );
}
