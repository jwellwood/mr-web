import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { AUTH_ROLES } from 'app/constants';
import { ISelectOptions } from 'components/inputs/SelectInput';
import { Spinner } from 'components/loaders';
import { PageHeader } from 'components/typography';
import ErrorGraphql from 'errors/ErrorGraphql';
import { useCustomParams } from 'hooks/useCustomParams';
import { showAlert } from 'modules/alerts';
import { useMatchPlayersInput } from 'modules/matches/hooks/useMatchPlayersInput';
import { AppDispatch } from 'reduxStore/rootReducer';
import RouteGuard from 'router/RouteGuard';
import { PAGES, initialAwardState } from '../constants';
import AwardForm from '../forms/AwardForm';
import { ADD_SEASON_AWARD } from '../graphql/addSeasonAward.graphql';
import { GET_SEASON_AWARDS } from '../graphql/getSeasonAwards.graphql';
import { IAward } from '../types';

const AddAward: React.FC = () => {
  const { teamId, seasonId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [defaultValues, setDefaultValues] = useState<any>(null);
  const {
    players,
    loading: playersLoading,
    error: playersError,
  } = useMatchPlayersInput(teamId, seasonId);

  const playerOptions: ISelectOptions[] = useMemo(
    () =>
      players?.map((player) => ({
        label: player.name,
        value: player._id,
      })),
    [players]
  );

  useEffect(() => {
    setDefaultValues({ ...initialAwardState });
  }, [players]);

  const [addAward, { error, loading }] = useMutation(ADD_SEASON_AWARD, {
    refetchQueries: [{ query: GET_SEASON_AWARDS, variables: { seasonId } }],
  });

  const onSubmit = async (formData: Partial<IAward>) => {
    try {
      return addAward({
        variables: {
          ...formData,
          teamId,
          seasonId,
          awardValue: +formData.awardValue,
        },
      }).then(() => {
        dispatch(showAlert('Award added successfully', 'success'));
        navigate(-1);
      });
    } catch (error) {
      dispatch(showAlert('There was a problem', 'error'));
    }
  };

  if (error || playersError)
    return <ErrorGraphql error={[error, playersError]} />;

  return (
    <RouteGuard authorization={AUTH_ROLES.TEAM_ADMIN} teamId={teamId}>
      <PageHeader title={PAGES.ADD_AWARD} />
      {!loading && !playersLoading && defaultValues ? (
        <AwardForm
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          playersOptions={playerOptions}
        />
      ) : (
        <Spinner />
      )}
    </RouteGuard>
  );
};

export default AddAward;
