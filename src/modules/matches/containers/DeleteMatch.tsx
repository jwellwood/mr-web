import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { AUTH_ROLES } from 'app/constants';
import { Spinner } from 'components/loaders';
import { DeleteModal } from 'components/modals';
import { CustomTypography, PageHeader } from 'components/typography';
import ErrorGraphql from 'errors/ErrorGraphql';
import { useCustomParams } from 'hooks/useCustomParams';
import { useSeasons } from 'hooks/useSeasons';
import { showAlert } from 'modules/alerts';
import { GET_PLAYERS_BY_SEASON_ID } from 'modules/players/graphql';
import RouteGuard from 'router/RouteGuard';
import { PAGES } from '../constants';
import { DELETE_MATCH, GET_MATCHES_BY_SEASON } from '../graphql';
import { GET_MATCH_STATS } from '../graphql/matchStats.graphql';

const DeleteMatch: React.FC = () => {
  const { seasonId } = useSeasons();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { teamId, matchId } = useCustomParams();
  const [deleteMatch, { error, loading }] = useMutation(DELETE_MATCH, {
    variables: { teamId, matchId },
    refetchQueries: [
      {
        query: GET_MATCHES_BY_SEASON,
        variables: { limit: 5, offset: 0, teamId, seasonId: seasonId },
      },
      {
        query: GET_PLAYERS_BY_SEASON_ID,
        variables: { teamId, seasonId: seasonId },
      },
      {
        query: GET_MATCH_STATS,
        variables: { teamId, seasonId: seasonId },
      },
    ],
  });

  if (error) return <ErrorGraphql error={[error]} />;

  const onDeleteMatch = () => {
    deleteMatch()
      .then(() => {
        navigate(-2);
        dispatch(showAlert('Match deleted', 'success'));
      })
      .catch((err) => {
        dispatch(showAlert(err, 'error'));
      });
  };

  return (
    <RouteGuard authorization={AUTH_ROLES.TEAM_ADMIN} teamId={teamId}>
      <PageHeader title={PAGES.DELETE_MATCH} backButton />

      {!loading ? (
        <>
          <CustomTypography color="warning">
            This will remove the match and all associated stats
          </CustomTypography>
          <DeleteModal
            title="Match"
            loading={loading}
            onDelete={onDeleteMatch}
          />
        </>
      ) : (
        <Spinner />
      )}
    </RouteGuard>
  );
};

export default DeleteMatch;
