import { useMutation, useQuery } from '@apollo/client/react';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../../../components';
import { Spinner } from '../../../../components/loaders';
import { useCustomParams, useSeasons } from '../../../../hooks';
import { AppDispatch, showAlert } from '../../../../store';
import { PAGES } from '../../constants';
import { FETCH_TROPHY, EDIT_TROPHY, FETCH_TROPHIES } from '../../graphql';
import { mapTrophyToForm, mapFormToEditTrophyVariables } from '../../helpers/mapTrophyForm';
import DeleteTrophy from './DeleteTrophy';
import TrophyForm from './TrophyForm';
import type { TrophyFormData } from './validation';

export default function EditTrophy() {
  const { teamId, trophyId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { seasonOptions, loading: loadingSeasons } = useSeasons();

  const { loading, error, data, refetch } = useQuery(FETCH_TROPHY, {
    variables: { trophyId: trophyId! },
  });

  const defaultValues: TrophyFormData | null = useMemo(() => {
    const trophy = data?.trophy;
    return trophy && seasonOptions.length > 0 ? mapTrophyToForm(trophy, seasonOptions) : null;
  }, [data, seasonOptions]);

  const [editTrophy, { error: editError, loading: editLoading }] = useMutation(EDIT_TROPHY, {
    refetchQueries: [{ query: FETCH_TROPHIES, variables: { teamId: teamId! } }],
  });

  const onSubmit = async (formData: TrophyFormData) => {
    try {
      const variables = mapFormToEditTrophyVariables(formData);
      return editTrophy({ variables: { teamId: teamId!, trophyId: trophyId!, ...variables } }).then(
        () => {
          refetch();
          dispatch(showAlert({ text: 'Trophy updated successfully', type: 'success' }));
          navigate(-1);
        }
      );
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: 'There was a problem', type: 'error' }));
    }
  };

  const isLoading = loading || editLoading || loadingSeasons;

  return (
    <PageHeader title={PAGES.EDIT_TROPHY}>
      {isLoading || !defaultValues ? (
        <Spinner />
      ) : (
        <>
          <TrophyForm
            defaultValues={defaultValues}
            seasonOptions={seasonOptions}
            onSubmit={onSubmit}
            loading={isLoading}
            error={error || editError}
          />
          <DeleteTrophy />
        </>
      )}
    </PageHeader>
  );
}
