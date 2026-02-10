import { useMutation, useQuery } from '@apollo/client/react';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../../../components';
import { Spinner } from '../../../../components/loaders';
import { useCustomParams } from '../../../../hooks';
import { AppDispatch, showAlert } from '../../../../store';
import { PAGES } from '../../constants';
import { EDIT_SEASON, FETCH_SEASONS_POSITION, FETCH_SEASON, FETCH_SEASONS } from '../../graphql';
import { mapSeasonForm } from '../../helpers/mapSeasonForm';
import { useSeasonInput } from '../../hooks/useSeasonInput';
import DeleteSeason from './DeleteSeason';
import SeasonForm from './SeasonForm';
import type { SeasonFormData } from './validation';

export default function EditSeason() {
  const { teamId, seasonId, orgId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { loading, error, data, refetch } = useQuery(FETCH_SEASON, {
    variables: { seasonId: seasonId! },
  });

  const [editSeason, { error: editError, loading: editLoading }] = useMutation(EDIT_SEASON, {
    refetchQueries: [
      { query: FETCH_SEASONS, variables: { teamId: teamId! } },
      { query: FETCH_SEASONS_POSITION, variables: { teamId: teamId! } },
    ],
  });

  const { competitionOptions, orgError, orgLoading } = useSeasonInput(orgId);

  const defaultValues: SeasonFormData | null = useMemo(
    () => (data?.season ? mapSeasonForm.toForm(data.season) : null),
    [data]
  );

  const onSubmit = async (formData: SeasonFormData) => {
    try {
      const variables = mapSeasonForm.toVariables(formData);
      return editSeason({ variables: { teamId: teamId!, seasonId: seasonId!, ...variables } }).then(
        () => {
          refetch();
          dispatch(showAlert({ text: 'Season updated successfully', type: 'success' }));
          navigate(-2);
        }
      );
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: 'There was a problem', type: 'error' }));
    }
  };

  const isLoading = loading || orgLoading || editLoading;

  const renderContent = () => {
    return defaultValues ? (
      <>
        <SeasonForm
          competitionOptions={competitionOptions}
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          loading={isLoading}
          error={error || editError || orgError}
        />
        <DeleteSeason />
      </>
    ) : (
      <Spinner />
    );
  };
  return <PageHeader title={PAGES.EDIT_SEASON}>{renderContent()}</PageHeader>;
}
