import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { DELETE_MATCH, FETCH_MATCHES, FETCH_MATCHES_STATS } from '../graphql';
import { FETCH_SQUAD_BY_SEASON } from '../../squad/graphql';
import { PAGES } from '../constants.ts';
import { useSeasons } from '../../../hooks/useSeasons.ts';
import { useCustomParams } from '../../../hooks/useCustomParams.tsx';
import ErrorGraphql from '../../../errors/ErrorGraphql.tsx';
import { showAlert } from '../../../store/features/alerts/alertsSlice.ts';
import RouteGuard from '../../../router/RouteGuard.tsx';
import { AuthRoles } from '../../../constants.ts';
import { CustomTypography } from '../../../components/typography';
import { DeleteModal } from '../../../components/modals';
import { Spinner } from '../../../components/loaders';
import { PageHeader } from '../../../components';

export default function DeleteMatch() {
  const { seasonId } = useSeasons();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { teamId, matchId } = useCustomParams();
  const [deleteMatch, { error, loading }] = useMutation(DELETE_MATCH, {
    variables: { teamId, matchId },
    refetchQueries: [
      {
        query: FETCH_MATCHES,
        variables: { limit: 5, offset: 0, teamId, seasonId: seasonId },
      },
      {
        query: FETCH_SQUAD_BY_SEASON,
        variables: { teamId, seasonId: seasonId },
      },
      {
        query: FETCH_MATCHES_STATS,
        variables: { teamId, seasonId: seasonId },
      },
    ],
  });

  const onDeleteMatch = () => {
    deleteMatch()
      .then(() => {
        navigate(-2);
        dispatch(
          showAlert({
            text: 'Match deleted',
            type: 'success',
          })
        );
      })
      .catch(err => {
        dispatch(
          showAlert({
            text: err,
            type: 'error',
          })
        );
      });
  };

  const renderContent = () => {
    return !loading ? (
      <>
        <CustomTypography color="warning">
          This will remove the match and all associated stats
        </CustomTypography>
        <DeleteModal title="Match" loading={loading} onDelete={onDeleteMatch} />
      </>
    ) : (
      <Spinner />
    );
  };

  return (
    <RouteGuard authorization={AuthRoles.TEAM_ADMIN}>
      <PageHeader title={PAGES.DELETE_MATCH}>
        {error ? <ErrorGraphql error={error} /> : renderContent()}
      </PageHeader>
    </RouteGuard>
  );
}
