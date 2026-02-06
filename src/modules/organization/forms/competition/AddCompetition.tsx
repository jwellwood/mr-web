import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_COMPETITION, FETCH_COMPETITIONS } from '../../graphql';
import { PAGES } from '../../constants';
import { useCustomParams } from '../../../../hooks';
import { AppDispatch, showAlert } from '../../../../store';
import Spinner from '../../../../components/loaders/Spinner';
import { PageHeader } from '../../../../components';
import { initialCompetitionState } from './state';
import type { CompetitionFormData } from './validation';
import CompetitionForm from './CompetitionForm';

export default function AddCompetition() {
  const { orgId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [defaultValues, setDefaultValues] = useState<CompetitionFormData | null>(null);

  const [addCompetition, { error, loading }] = useMutation(ADD_COMPETITION, {
    refetchQueries: [{ query: FETCH_COMPETITIONS, variables: { orgId } }],
  });

  useEffect(() => {
    setDefaultValues({ ...initialCompetitionState });
  }, []);

  const onSubmit = async (formData: CompetitionFormData) => {
    try {
      return addCompetition({
        variables: { orgId, ...formData },
      }).then(() => {
        dispatch(showAlert({ text: 'Competition added successfully!', type: 'success' }));
        navigate(-1);
      });
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: 'Something went wrong', type: 'error' }));
    }
  };

  const renderContent = () => {
    return defaultValues ? (
      <CompetitionForm
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        loading={loading}
        error={error}
      />
    ) : (
      <Spinner />
    );
  };

  return <PageHeader title={PAGES.ADD_COMPETITION}>{renderContent()}</PageHeader>;
}
