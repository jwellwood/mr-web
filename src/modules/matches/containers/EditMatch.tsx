import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
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
import { resetTempMatch, setTempMatch } from '../actions/matches.actions';
import { resetTempPlayers, setTempPlayers } from '../actions/players.actions';
import MatchFormStepper from '../components/MatchFormStepper';
import { PAGES } from '../constants';
import { EDIT_MATCH, GET_MATCHES_BY_SEASON, GET_MATCH_BY_ID } from '../graphql';
import { GET_MATCH_STATS } from '../graphql/matchStats.graphql';
import { mapMatch } from '../helpers';
import { mapMatchToTempMatch } from '../helpers/mapMatchToTempMatch';
import { useMatchDetailsInput } from '../hooks/useMatchDetailsInput';

const EditMatch: React.FC = () => {
  const { teamId, matchId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [defaultValues, setDefaultValues] = useState<ITempMatch>(null);
  const [currentPlayers, setCurrentPlayers] = useState<IPlayerInMatch[]>(null);

  const { data, loading, error } = useQuery(GET_MATCH_BY_ID, {
    variables: { matchId },
  });

  const currentTempMatch = useSelector(getTempMatch);
  const currentTempPlayers = useSelector(getTempPlayers);

  const { opponents, competitions, seasonOptions } = useMatchDetailsInput();

  const [editMatch, { error: editError, loading: editLoading }] = useMutation(
    EDIT_MATCH,
    {
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
    }
  );

  useEffect(() => {
    if (data?.match) {
      dispatch(setTempMatch(mapMatchToTempMatch(data.match)));
      dispatch(setTempPlayers(data.match?.matchPlayers as IPlayerInMatch[]));
    }
  }, [data, dispatch]);

  useEffect(() => {
    setDefaultValues(currentTempMatch);
  }, [currentTempMatch]);

  useEffect(() => {
    setCurrentPlayers(currentTempPlayers);
  }, [currentTempPlayers]);

  const onSubmit = () => {
    const data = mapMatch(teamId, currentTempMatch, currentTempPlayers);
    editMatch({ variables: { matchId, ...data } })
      .then((res) => {
        dispatch(resetTempMatch());
        dispatch(resetTempPlayers());
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (error || editError) {
    return <ErrorGraphql error={[error, editError]} />;
  }

  return (
    <RouteGuard authorization={AUTH_ROLES.TEAM_ADMIN} teamId={teamId}>
      <PageHeader title={PAGES.EDIT_MATCH} backButton />

      {!loading &&
      !editLoading &&
      defaultValues?._id &&
      currentPlayers &&
      competitions.length &&
      seasonOptions.length &&
      opponents.length ? (
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

export default EditMatch;
