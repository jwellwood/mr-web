import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { resetTempMatch, setTempMatch } from '../actions/matches.actions';
import { resetTempPlayers, setTempPlayers } from '../actions/players.actions';
import MatchFormStepper from '../components/MatchFormStepper';
import { PAGES } from '../constants';
import { EDIT_MATCH, GET_MATCHES_BY_SEASON, GET_MATCH_BY_ID } from '../graphql';
import { GET_MATCH_STATS } from '../graphql/matchStats.graphql';
import { mapMatch } from '../helpers';
import { mapMatchToTempMatch } from '../helpers/mapMatchToTempMatch';
import { useMatchDetailsInput } from '../hooks/useMatchDetailsInput';
import {IPlayerInMatch, ITempMatch} from '../../../types';
import {useCustomParams} from "../../../hooks/useCustomParams.tsx";
import { AppDispatch } from '../../../store/store.ts';
import { getTempMatch } from '../../../store/features/matches/matchesSelector.ts';
import { getTempPlayers } from '../../../store/features/players/playersSelection.ts';
import {GET_PLAYERS_BY_SEASON_ID} from "../../players/graphql";
import ErrorGraphql from "../../../errors/ErrorGraphql.tsx";
import RouteGuard from "../../../router/RouteGuard.tsx";
import {AuthRoles} from "../../../constants.ts";
import {PageHeader} from "../../../components/typography";
import {Spinner} from "../../../components/loaders";

const EditMatch: React.FC = () => {
  const { teamId, matchId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [defaultValues, setDefaultValues] = useState<ITempMatch | null>(null);
  const [currentPlayers, setCurrentPlayers] = useState<IPlayerInMatch[]>([]);

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
    if(!teamId) {
      console.error("Missing team id")
      return;
    }
    const data = mapMatch(teamId, currentTempMatch, currentTempPlayers);
    editMatch({ variables: { matchId, ...data } })
      .then(() => {
        dispatch(resetTempMatch());
        dispatch(resetTempPlayers());
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (error || editError) {
    return <ErrorGraphql error={(error || editError) as Error} />;
  }

  return (
    <RouteGuard authorization={AuthRoles.TEAM_ADMIN}>
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
          teamId={teamId as string}
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
