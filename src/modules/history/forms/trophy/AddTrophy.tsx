import { useMutation } from '@apollo/client/react';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../../../components';
import { Spinner } from '../../../../components/loaders';
import { useCustomParams, useSeasons } from '../../../../hooks';
import { AppDispatch, showAlert } from '../../../../store';
import { PAGES } from '../../constants';
import { ADD_TROPHY, FETCH_TROPHIES } from '../../graphql';
import { initialTrophyFormState } from './state';
import TrophyForm from './TrophyForm';
import type { TrophyFormData } from './validation';

export default function AddTrophy() {
  const { teamId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { seasonOptions, loading: loadingSeasons } = useSeasons();
  const defaultValues: TrophyFormData = useMemo(() => ({ ...initialTrophyFormState }), []);

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

  return (
    <PageHeader title={PAGES.ADD_TROPHY}>
      {seasonOptions ? (
        <TrophyForm
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          seasonOptions={seasonOptions}
          loading={isLoading}
          error={error}
        />
      ) : (
        <Spinner />
      )}
    </PageHeader>
  );
}
