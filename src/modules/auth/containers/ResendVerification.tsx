import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { resendValidationEmail } from '../services/validation';
import { AppDispatch } from '../../../store/store';
import { showAlert } from '../../../store/features/alerts/alertsSlice.ts';
import { PROFILE } from '../../../router/paths.ts';
import { Spinner } from '../../../components/loaders';
import { CustomButton } from '../../../components/buttons';

interface Props {
  email: string | null;
}

const ResendVerification: React.FC<Props> = ({ email }) => {
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
        navigate(PROFILE.PROFILE);
      })
      .catch((err: Error) => {
        console.error(err);
        setLoading(false);
      });
  };

  return loading ? (
    <Spinner />
  ) : (
    <CustomButton onClick={onSubmit}>Resend Verification Link</CustomButton>
  );
};

export default ResendVerification;
