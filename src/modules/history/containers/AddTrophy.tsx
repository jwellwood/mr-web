import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { PAGES, initialTrophyFormState } from '../constants';
import TrophyForm from '../forms/TrophyForm';
import { ADD_TROPHY, GET_TROPHIES } from '../graphql/trophy';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { AppDispatch } from '../../../store/store';
import { useSeasons } from '../../../hooks/useSeasons';
import { showAlert } from '../../../store/features/alerts/alertsSlice';
import ErrorGraphql from '../../../errors/ErrorGraphql.tsx';
import RouteGuard from '../../../router/RouteGuard.tsx';
import { AuthRoles } from '../../../constants.ts';
import PageHeader from '../../../components/typography/PageHeader.tsx';
import { Spinner } from '../../../components/loaders';
import { ITrophy } from '../types';

const AddTrophy: React.FC = () => {
  const { teamId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { seasonOptions, loading: loadingSeasons } = useSeasons();
  const [defaultValues, setDefaultValues] = useState<Partial<ITrophy> | null>(null);

  useEffect(() => {
    setDefaultValues({ ...initialTrophyFormState });
  }, []);

  const [addTrophy, { error, loading }] = useMutation(ADD_TROPHY, {
    refetchQueries: [{ query: GET_TROPHIES, variables: { teamId } }],
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

  const children = error?.message ? (
    <ErrorGraphql error={{ message: error.message }} />
  ) : !loading && !loadingSeasons && defaultValues && seasonOptions ? (
    <TrophyForm defaultValues={defaultValues} onSubmit={onSubmit} seasonOptions={seasonOptions} />
  ) : (
    <Spinner />
  );

  return (
    <RouteGuard authorization={AuthRoles.TEAM_ADMIN}>
      <PageHeader title={PAGES.ADD_TROPHY} />
      {children}
    </RouteGuard>
  );
};

export default AddTrophy;
