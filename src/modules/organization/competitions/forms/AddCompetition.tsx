import { useMutation } from '@apollo/client/react';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../../../components';
import Spinner from '../../../../components/loaders/spinner/Spinner';
import { useCustomParams } from '../../../../hooks';
import { AppDispatch, showAlert } from '../../../../store';
import { PAGES } from '../../constants';
import { ADD_COMPETITION, FETCH_COMPETITIONS } from '../graphql';
import { mapFormToAddCompetition } from '../helpers/mapCompetitionForm';
import CompetitionForm from './CompetitionForm';
import { initialCompetitionState } from './state';
import type { CompetitionFormData } from './validation';

export default function AddCompetition() {
  const { orgId } = useCustomParams();
  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();

  const defaultValues: CompetitionFormData = useMemo(() => ({ ...initialCompetitionState }), []);

  const [addCompetition, { error, loading }] = useMutation(ADD_COMPETITION, {
    refetchQueries: [{ query: FETCH_COMPETITIONS, variables: { orgId } }],
  });

  const onSubmit = async (formData: CompetitionFormData) => {
    try {
      const variables = mapFormToAddCompetition(formData, orgId!);
      return addCompetition({
        variables,
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
