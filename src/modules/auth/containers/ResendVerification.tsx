import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CustomButton } from 'components/buttons';
import { Spinner } from 'components/loaders';
import { showAlert } from 'modules/alerts';
import { AppDispatch } from 'reduxStore/rootReducer';
import { PROFILE } from 'router/paths';
import { resendValidationEmail } from '../services/validation';

interface Props {
  email: string | null;
}

const ResendVerification: React.FC<Props> = ({ email }) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = () => {
    setLoading(true);
    resendValidationEmail(email)
      .then((res) => {
        setLoading(false);
        dispatch(showAlert(`Email sent to ${res.email}`, 'success'));
        navigate(PROFILE.PROFILE);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return loading ? (
    <Spinner />
  ) : (
    <CustomButton onClick={onSubmit}>Resend Verification Link</CustomButton>
  );
};

export default ResendVerification;
