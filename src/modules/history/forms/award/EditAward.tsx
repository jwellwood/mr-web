import { useMutation, useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PageHeader, type ISelectOptions } from '../../../../components';
import { Spinner } from '../../../../components/loaders';
import { useCustomParams, useSeasons } from '../../../../hooks';
import { AppDispatch, showAlert } from '../../../../store';
import { useMatchPlayersInput } from '../../../matches/hooks/useMatchPlayersInput';
import { PAGES } from '../../constants';
import { EDIT_AWARD, FETCH_AWARD, FETCH_AWARDS } from '../../graphql';
import { mapAwardToForm, mapFormToEditAwardVariables } from '../../helpers/mapAwardForm';
import AwardForm from './AwardForm';
import DeleteAward from './DeleteAward';
import type { AwardFormData } from './validation';

export default function EditAward() {
  const { awardId, teamId, seasonId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { loading: loadingSeasons } = useSeasons();

  const { loading, error, data, refetch } = useQuery(FETCH_AWARD, {
    variables: { awardId: awardId! },
    notifyOnNetworkStatusChange: true,
  });

  const [editAward, { error: editError, loading: editLoading }] = useMutation(EDIT_AWARD, {
    refetchQueries: [{ query: FETCH_AWARDS, variables: { seasonId: seasonId! } }],
  });

  const {
    players,
    loading: playersLoading,
    error: playersError,
  } = useMatchPlayersInput(teamId, seasonId);

  const playerOptions: ISelectOptions[] = useMemo(
    () =>
      players?.map(player => ({
        label: player.name,
        value: player._id,
      })),
    [players]
  );

  // derive default values directly from query data
  const defaultValues: AwardFormData | null = data?.award ? mapAwardToForm(data.award) : null;

  const onSubmit = async (formData: Partial<AwardFormData>) => {
    try {
      const variables = mapFormToEditAwardVariables(formData);
      return editAward({
        variables: {
          teamId: teamId!,
          awardId: awardId!,
          ...variables,
        },
      }).then(() => {
        refetch();
        dispatch(showAlert({ text: 'Award updated successfully', type: 'success' }));
        navigate(-1);
      });
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: 'There was a problem', type: 'error' }));
    }
  };

  const isLoading = loading || editLoading || loadingSeasons || playersLoading;

  return (
    <PageHeader title={PAGES.EDIT_AWARD}>
      {isLoading || !defaultValues ? (
        <Spinner />
      ) : (
        <>
          <AwardForm
            defaultValues={defaultValues}
            playersOptions={playerOptions}
            onSubmit={onSubmit}
            loading={isLoading}
            error={error || editError || playersError}
          />
          <DeleteAward />
        </>
      )}
    </PageHeader>
  );
}
