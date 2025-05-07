import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { AUTH_ROLES } from 'app/constants';
import { Spinner } from 'components/loaders';
import { PageHeader } from 'components/typography';
import ErrorGraphql from 'errors/ErrorGraphql';
import { useCustomParams } from 'hooks/useCustomParams';
import { GET_PLAYERS_BY_SEASON_ID } from 'modules/players/graphql';
import { AppDispatch } from 'reduxStore/rootReducer';
import RouteGuard from 'router/RouteGuard';
import { getTempMatch, getTempPlayers } from 'selectors';
import { IPlayerInMatch, ITempMatch } from 'types';
import { resetTempMatch } from '../actions/matches.actions';
import { resetTempPlayers } from '../actions/players.actions';
import MatchFormStepper from '../components/MatchFormStepper';
import { PAGES } from '../constants';
import { ADD_MATCH, GET_MATCHES_BY_SEASON } from '../graphql';
import { GET_MATCH_STATS } from '../graphql/matchStats.graphql';
import { mapMatch } from '../helpers';
import { useMatchDetailsInput } from '../hooks/useMatchDetailsInput';

const AddMatch: React.FC = () => {
  const { teamId } = useCustomParams();
  const navigate = useNavigate();
  const currentTempMatch = useSelector(getTempMatch);
  const currentTempPlayers = useSelector(getTempPlayers);

  const dispatch: AppDispatch = useDispatch();

  const [defaultValues, setDefaultValues] = useState<ITempMatch>(null);
  const [currentPlayers, setCurrentPlayers] = useState<IPlayerInMatch[]>(null);

  const [addMatch, { error, loading: addLoading }] = useMutation(ADD_MATCH, {
    refetchQueries: [
      {
        query: GET_MATCHES_BY_SEASON,
        variables: {
          limit: 5,
          offset: 0,
          teamId,
          seasonId: currentTempMatch.seasonId,
        },
      },
      {
        query: GET_PLAYERS_BY_SEASON_ID,
        variables: { teamId, seasonId: currentTempMatch.seasonId },
      },
      {
        query: GET_MATCH_STATS,
        variables: { teamId, seasonId: currentTempMatch.seasonId },
      },
    ],
  });

  const { opponents, competitions, seasonOptions } = useMatchDetailsInput();

  useEffect(() => {
    setDefaultValues(currentTempMatch);
  }, [currentTempMatch]);

  useEffect(() => {
    setCurrentPlayers(currentTempPlayers);
  }, [currentTempPlayers]);

  const onSubmit = () => {
    const data = mapMatch(teamId, currentTempMatch, currentTempPlayers);
    addMatch({ variables: { ...data } })
      .then((res) => {
        dispatch(resetTempMatch());
        dispatch(resetTempPlayers());
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (error) {
    return <ErrorGraphql error={[error]} />;
  }

  return (
    <RouteGuard authorization={AUTH_ROLES.TEAM_ADMIN} teamId={teamId}>
      <PageHeader title={PAGES.ADD_MATCH} />
      {!addLoading && defaultValues && currentPlayers ? (
        <MatchFormStepper
          defaultValues={defaultValues}
          currentPlayers={currentPlayers}
          teamId={teamId}
          seasonOptions={seasonOptions}
          opponents={opponents}
          competitions={competitions}
          onSubmit={onSubmit}
        />
      ) : (
        <Spinner />
      )}
    </RouteGuard>
  );
};

export default AddMatch;
