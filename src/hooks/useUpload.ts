import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showAlert } from '../store';

const getErrorMessage = (err: unknown): string => {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data;
    return data?.message ?? data?.error ?? `${err.response?.status} ${err.response?.statusText}`;
  }
  if (err instanceof Error) return err.message;
  return 'An unknown error occurred';
};

interface UseUpload {
  uploadFunc: (fileData: FormData) => Promise<Record<string, string>>;
  removeFunc: (public_id: string) => Promise<void>;
  url?: string;
  public_id?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  graphQLMutation: (options?: any) => Promise<unknown>;
  refetchFunc: () => Promise<unknown>;
}

const MAX_SIZE_BYTES = 2 * 1024 * 1024; // 2MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export const useUpload = ({
  uploadFunc,
  removeFunc,
  url,
  public_id,
  graphQLMutation,
  refetchFunc,
}: UseUpload) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState<string | null>(url ?? null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (formData: { imageFile: File | null }) => {
    if (!formData.imageFile) {
      if (imageUrl === 'default') await removeImage();
      return;
    }

    if (!ALLOWED_MIME_TYPES.includes(formData.imageFile.type)) {
      dispatch(showAlert({ text: 'Invalid file type.', type: 'error' }));
      return;
    }

    if (formData.imageFile.size > MAX_SIZE_BYTES) {
      dispatch(showAlert({ text: 'File must be under 2MB.', type: 'error' }));
      return;
    }
    setLoading(true);
    const fileData = new FormData();
    fileData.append('file', formData.imageFile);
    fileData.append('upload_preset', 'image');
    try {
      const res = await uploadFunc(fileData);
      await graphQLMutation({ variables: { ...res } });
      await refetchFunc();
      dispatch(showAlert({ text: 'Image updated!', type: 'success' }));
      navigate(-1);
    } catch (err) {
      console.error(err);
      dispatch(showAlert({ text: getErrorMessage(err), type: 'error' }));
    } finally {
      setLoading(false);
    }
  };

  const removeImage = async () => {
    if (!public_id) return;
    setLoading(true);
    try {
      await removeFunc(public_id);
      await graphQLMutation({ variables: { public_id: '0', url: 'default' } });
      await refetchFunc();
      dispatch(showAlert({ text: 'Image removed successfully!', type: 'success' }));
      navigate(-1);
    } catch (err) {
      console.error(err);
      dispatch(showAlert({ text: getErrorMessage(err), type: 'error' }));
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    imageUrl,
    setImageUrl,
    onSubmit,
    removeImage,
  };
};
