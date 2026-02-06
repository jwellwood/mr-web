import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { EDIT_AWARD, FETCH_AWARD, FETCH_AWARDS } from '../../graphql';
import { PAGES } from '../../constants';
import { useCustomParams, useSeasons } from '../../../../hooks';
import { AppDispatch, showAlert } from '../../../../store';
import { Spinner } from '../../../../components/loaders';
import { useMatchPlayersInput } from '../../../matches/hooks/useMatchPlayersInput';
import { PageHeader, type ISelectOptions } from '../../../../components';
import type { AwardFormData } from './validation';
import AwardForm from './AwardForm';
import { mapAwardToForm, mapFormToEditAwardVariables } from '../../helpers/mapAwardForm';
import DeleteAward from './DeleteAward';

export default function EditAward() {
  const { awardId, teamId, seasonId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { loading: loadingSeasons } = useSeasons();
  const [defaultValues, setDefaultValues] = useState<AwardFormData | null>(null);

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

  useEffect(() => {
    setDefaultValues(mapAwardToForm(data?.award));
  }, [data]);

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

  const renderContent = () => {
    return defaultValues ? (
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
    ) : (
      <Spinner />
    );
  };

  return <PageHeader title={PAGES.EDIT_AWARD}>{renderContent()}</PageHeader>;
}
