import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showAlert } from 'modules/alerts';

interface UseUpload {
  uploadFunc: (fileData: FormData) => Promise<object>;
  removeFunc: (public_id: string) => Promise<void>;
  url: string;
  public_id: string;
  graphqlFunc;
  refetchFunc: any;
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
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (url) {
      setImageUrl(url);
    }
  }, [url]);

  const onSubmit = (formData) => {
    setLoading(true);
    const file: File = formData.imageFile;
    const fileData: FormData = new FormData();
    fileData.append('file', file);
    fileData.append('upload_preset', 'image');
    uploadFunc(fileData)
      .then((res) => {
        setLoading(false);

        graphqlFunc({ variables: { ...res } })
          .then(() => {
            // refetchFunc();
            dispatch(showAlert('Image updated!', 'success'));
            navigate(-1);
          })
          .catch((err) => {
            dispatch(showAlert('There was a problem', 'error'));
          });
      })
      .catch((err) => {
        dispatch(showAlert('There was a problem', 'error'));
        setLoading(false);
      });
  };

  const removeImage = () => {
    setLoading(true);
    removeFunc(public_id)
      .then(() => {
        graphqlFunc({ variables: { public_id: '0', url: 'default' } })
          .then(() => {
            refetchFunc();
            dispatch(showAlert('Image removed successfully!', 'success'));
            navigate(-1);
          })
          .catch((err) => {
            setLoading(false);
            dispatch(showAlert('There was a problem', 'error'));
          });
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  return {
    loading,
    imageUrl,
    setImageUrl,
    onSubmit,
    removeImage,
  };
};
