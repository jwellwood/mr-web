import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_TROPHY, FETCH_TROPHIES } from '../../graphql';
import { PAGES } from '../../constants';
import { useCustomParams, useSeasons } from '../../../../hooks';
import { AppDispatch, showAlert } from '../../../../store';
import { Spinner } from '../../../../components/loaders';
import { PageHeader } from '../../../../components';
import { initialTrophyFormState } from './state';
import type { TrophyFormData } from './validation';
import TrophyForm from './TrophyForm';

export default function AddTrophy() {
  const { teamId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { seasonOptions, loading: loadingSeasons } = useSeasons();
  const [defaultValues, setDefaultValues] = useState<TrophyFormData | null>(null);

  useEffect(() => {
    setDefaultValues({ ...initialTrophyFormState });
  }, []);

  const [addTrophy, { error, loading }] = useMutation(ADD_TROPHY, {
    refetchQueries: [{ query: FETCH_TROPHIES, variables: { teamId: teamId! } }],
  });

  const onSubmit = async (formData: TrophyFormData) => {
    const mappedFormData = { ...formData, year: String(formData.year) };
    try {
      return addTrophy({ variables: { teamId: teamId!, ...mappedFormData } }).then(() => {
        dispatch(showAlert({ text: 'Trophy added successfully', type: 'success' }));
        navigate(-1);
      });
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: 'There was a problem', type: 'error' }));
    }
  };

  const isLoading = loading || loadingSeasons;

  const renderContent = () => {
    return defaultValues && seasonOptions ? (
      <TrophyForm
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        seasonOptions={seasonOptions}
        loading={isLoading}
        error={error}
      />
    ) : (
      <Spinner />
    );
  };

  return <PageHeader title={PAGES.ADD_TROPHY}>{renderContent()}</PageHeader>;
}
