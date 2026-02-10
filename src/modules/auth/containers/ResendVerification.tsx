import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CustomButton } from '../../../components';
import { Spinner } from '../../../components/loaders';
import { AppDispatch, showAlert } from '../../../store';
import { PROFILE_PATHS } from '../../profile/router';
import { resendValidationEmail } from '../services/validation';

interface Props {
  email: string | null;
}

export default function ResendVerification({ email }: Props) {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = () => {
    if (!email) return;
    setLoading(true);
    resendValidationEmail(email)
      .then((res: { email: string }) => {
        setLoading(false);
        dispatch(showAlert({ text: `Email sent to ${res.email}`, type: 'success' }));
        navigate(PROFILE_PATHS.PROFILE);
      })
      .catch((err: Error) => {
        console.error(err);
        setLoading(false);
      });
  };

  return (
    <div style={{ margin: '16px' }}>
      {loading ? (
        <Spinner />
      ) : (
        <CustomButton onClick={onSubmit} color="warning">
          Resend Verification Link
        </CustomButton>
      )}
    </div>
  );
}
