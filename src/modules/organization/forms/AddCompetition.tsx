import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_COMPETITION, FETCH_COMPETITIONS } from '../graphql';
import { AuthRoles } from '../../../constants.ts';
import { PAGES } from '../constants.ts';
import { initialCompetitionState } from './state.ts';
import { mapCompetitionInput } from '../helpers/mapCompetitionInput.ts';
import { useCustomParams } from '../../../hooks/useCustomParams.tsx';
import { showAlert } from '../../../store/features/alerts/alertsSlice.ts';
import { AppDispatch } from '../../../store/store.ts';
import ErrorGraphql from '../../../errors/ErrorGraphql.tsx';
import RouteGuard from '../../../router/RouteGuard.tsx';
import Spinner from '../../../components/loaders/Spinner.tsx';
import { ICompetitionInput } from '../types.ts';
import { PageHeader } from '../../../components/index.ts';
import CompetitionForm from './components/CompetitionForm.tsx';

export default function AddCompetition() {
  const { orgId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [defaultValues, setDefaultValues] = useState<ICompetitionInput | null>(null);

  const [addCompetition, { error, loading }] = useMutation(ADD_COMPETITION, {
    refetchQueries: [{ query: FETCH_COMPETITIONS, variables: { orgId } }],
  });

  useEffect(() => {
    setDefaultValues({ ...initialCompetitionState });
  }, []);

  const onSubmit = async (formData: ICompetitionInput) => {
    try {
      return addCompetition({
        variables: { orgId, ...mapCompetitionInput(formData) },
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
    return !loading && defaultValues ? (
      <CompetitionForm defaultValues={defaultValues} onSubmit={onSubmit} />
    ) : (
      <Spinner />
    );
  };

  return (
    <RouteGuard authorization={AuthRoles.ORG_ADMIN}>
      <PageHeader title={PAGES.ADD_COMPETITION}>
        {error ? <ErrorGraphql error={error} /> : renderContent()}
      </PageHeader>
    </RouteGuard>
  );
}
