import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AUTH_ROLES } from 'app/constants';
import { Spinner } from 'components/loaders';
import { PageHeader } from 'components/typography';
import { AppDispatch } from 'reduxStore/rootReducer';
import RouteGuard from 'router/RouteGuard';
import ValidatedEmail from '../components/ValidatedEmail.component';
import { VALIDATED_EMAIL_PAGE } from '../constants';
import { verifyEmail } from '../services/validation';

const ValidatedEmailContainer: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const dispatch: AppDispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const [successfulValidation, setSuccessfulValidation] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    verifyEmail(token)
      .then((res) => {
        setLoading(false);
        if (res.email) {
          setSuccessfulValidation(true);
        }
      })
      .catch((err) => {
        setError(err?.response?.data?.message || 'Something went wrong');
        setLoading(false);
      });
  }, [token, dispatch]);

  return loading ? (
    <Spinner />
  ) : (
    <RouteGuard authorization={AUTH_ROLES.NONE}>
      <>
        <PageHeader title={VALIDATED_EMAIL_PAGE} />
        <ValidatedEmail success={successfulValidation} errorMessage={error} />
      </>
    </RouteGuard>
  );
};

export default ValidatedEmailContainer;
