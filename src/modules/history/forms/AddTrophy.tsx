import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_TROPHY, FETCH_TROPHIES } from '../graphql';

import { PAGES } from '../constants.ts';
import { useCustomParams } from '../../../hooks/useCustomParams.tsx';
import { AppDispatch } from '../../../store/store.ts';
import { useSeasons } from '../../../hooks/useSeasons.ts';
import { showAlert } from '../../../store/features/alerts/alertsSlice.ts';
import ErrorGraphql from '../../../errors/ErrorGraphql.tsx';
import RouteGuard from '../../../router/RouteGuard.tsx';
import { AuthRoles } from '../../../constants.ts';
import PageHeader from '../../../components/typography/PageHeader.tsx';
import { Spinner } from '../../../components/loaders/index.ts';
import { ITrophy } from '../types/index.ts';
import TrophyForm from './components/TrophyForm.tsx';
import { initialTrophyFormState } from './state.ts';

export default function AddTrophy() {
  const { teamId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { seasonOptions, loading: loadingSeasons } = useSeasons();
  const [defaultValues, setDefaultValues] = useState<Partial<ITrophy> | null>(null);

  useEffect(() => {
    setDefaultValues({ ...initialTrophyFormState });
  }, []);

  const [addTrophy, { error, loading }] = useMutation(ADD_TROPHY, {
    refetchQueries: [{ query: FETCH_TROPHIES, variables: { teamId } }],
  });

  const onSubmit = async (formData: Partial<ITrophy>) => {
    const mappedFormData = { ...formData, year: String(formData.year) };
    try {
      return addTrophy({ variables: { teamId, ...mappedFormData } }).then(() => {
        dispatch(showAlert({ text: 'Trophy added successfully', type: 'success' }));
        navigate(-1);
      });
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: 'There was a problem', type: 'error' }));
    }
  };

  const renderContent = () => {
    return !loading && !loadingSeasons && defaultValues && seasonOptions ? (
      <TrophyForm defaultValues={defaultValues} onSubmit={onSubmit} seasonOptions={seasonOptions} />
    ) : (
      <Spinner />
    );
  };

  return (
    <RouteGuard authorization={AuthRoles.TEAM_ADMIN}>
      <PageHeader title={PAGES.ADD_TROPHY} />
      {error?.message ? <ErrorGraphql error={{ message: error.message }} /> : renderContent()}
    </RouteGuard>
  );
}
