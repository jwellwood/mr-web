import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_AWARD, FETCH_AWARDS } from '../../graphql';
import { PAGES } from '../../constants';
import { useCustomParams } from '../../../../hooks';
import { AppDispatch, showAlert } from '../../../../store';
import { useMatchPlayersInput } from '../../../matches/hooks/useMatchPlayersInput';
import { Spinner } from '../../../../components/loaders';
import { PageHeader } from '../../../../components';
import type { ISelectOptions } from '../../../../components';
import { initialAwardState } from './state';
import type { AwardFormData } from './validation';
import AwardForm from './AwardForm';

export default function AddAward() {
  const { teamId, seasonId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [defaultValues, setDefaultValues] = useState<null | AwardFormData>(null);
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
    setDefaultValues({ ...initialAwardState });
  }, [players]);

  const [addAward, { error, loading }] = useMutation(ADD_AWARD, {
    refetchQueries: [{ query: FETCH_AWARDS, variables: { seasonId } }],
  });

  const onSubmit = async (formData: AwardFormData) => {
    try {
      return addAward({
        variables: {
          ...formData,
          teamId: teamId!,
          seasonId: seasonId!,
          awardValue: +(formData.awardValue || 0),
        },
      }).then(() => {
        dispatch(showAlert({ text: 'Award added successfully', type: 'success' }));
        navigate(-1);
      });
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: 'There was a problem', type: 'error' }));
    }
  };

  const renderContent = () => {
    return defaultValues ? (
      <AwardForm
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        playersOptions={playerOptions}
        loading={loading || playersLoading || !defaultValues}
        error={error || playersError}
      />
    ) : (
      <Spinner />
    );
  };

  return <PageHeader title={PAGES.ADD_AWARD}>{renderContent()}</PageHeader>;
}
