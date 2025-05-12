import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showAlert } from '../../../store/features/alerts/alertsSlice';
import { ApolloQueryResult, FetchResult } from '@apollo/client';

interface UseUpload {
  uploadFunc: (fileData: FormData) => Promise<object>;
  removeFunc: (public_id: string) => Promise<void>;
  url?: string;
  public_id?: string;
  graphqlFunc: (data?: object) => Promise<FetchResult<unknown>>;
  refetchFunc: (data?: object) => Promise<ApolloQueryResult<unknown>>;
}

export const useUpload = ({
  uploadFunc,
  removeFunc,
  url,
  public_id,
  graphqlFunc,
  refetchFunc,
}: UseUpload) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (url) {
      setImageUrl(url);
    }
  }, [url]);

  const onSubmit = (formData: { imageFile: File | null }) => {
    if (!formData.imageFile) return;
    setLoading(true);
    const file: File = formData.imageFile;
    const fileData: FormData = new FormData();
    fileData.append('file', file);
    fileData.append('upload_preset', 'image');
    uploadFunc(fileData)
      .then(res => {
        setLoading(false);

        graphqlFunc({ variables: { ...res } })
          .then(() => {
            // refetchFunc();
            dispatch(
              showAlert({
                text: 'Image updated!',
                type: 'success',
              })
            );
            navigate(-1);
          })
          .catch(err => {
            console.error(err);
            dispatch(showAlert({ text: 'There was a problem', type: 'error' }));
          });
      })
      .catch(err => {
        console.error(err);
        dispatch(showAlert({ text: 'There was a problem', type: 'error' }));
        setLoading(false);
      });
  };

  const removeImage = () => {
    if (!public_id) {
      return;
    }
    setLoading(true);
    removeFunc(public_id)
      .then(() => {
        graphqlFunc({ variables: { public_id: '0', url: 'default' } })
          .then(() => {
            refetchFunc();
            dispatch(showAlert({ text: 'Image removed successfully!', type: 'success' }));
            navigate(-1);
          })
          .catch(err => {
            console.error(err);
            setLoading(false);
            dispatch(showAlert({ text: 'There was a problem', type: 'error' }));
          });
        setLoading(false);
      })
      .catch(err => console.error(err));
  };

  return {
    loading,
    imageUrl,
    setImageUrl,
    onSubmit,
    removeImage,
  };
};
