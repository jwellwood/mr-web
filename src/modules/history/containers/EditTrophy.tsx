import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { AUTH_ROLES } from 'app/constants';
import { Spinner } from 'components/loaders';
import { PageHeader } from 'components/typography';
import ErrorGraphql from 'errors/ErrorGraphql';
import { useCustomParams } from 'hooks/useCustomParams';
import { useSeasons } from 'hooks/useSeasons';
import { showAlert } from 'modules/alerts';
import { AppDispatch } from 'reduxStore/rootReducer';
import RouteGuard from 'router/RouteGuard';
import { ITrophy } from 'types';
import { PAGES } from '../constants';
import TrophyForm from '../forms/TrophyForm';
import { DELETE_TROPHY } from '../graphql/deleteTrophy.graphql';
import { EDIT_TROPHY } from '../graphql/editTrophy.graphql';
import { GET_TROPHIES } from '../graphql/getTrophies.graphql';
import { GET_TROPHY_BY_ID } from '../graphql/getTrophyById.graphql';

const EditTrophy: React.FC = () => {
  const { teamId, trophyId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { seasonOptions, loading: loadingSeasons } = useSeasons();
  const [defaultValues, setDefaultValues] = useState<Partial<ITrophy>>(null);

  const { loading, error, data, refetch } = useQuery(GET_TROPHY_BY_ID, {
    variables: { trophyId },
    notifyOnNetworkStatusChange: true,
  });

  const [editTrophy, { error: editError, loading: editLoading }] = useMutation(
    EDIT_TROPHY,
    {
      refetchQueries: [{ query: GET_TROPHIES, variables: { teamId } }],
    }
  );

  const [deleteTrophy, { error: deleteError, loading: deleteLoading }] =
    useMutation(DELETE_TROPHY, {
      refetchQueries: [{ query: GET_TROPHIES, variables: { teamId } }],
    });

  useEffect(() => {
    if (data && seasonOptions) {
      const { trophy } = data;
      setDefaultValues({
        seasonId:
          (seasonOptions?.find((season) => season.label === trophy.season)
            ?.value as string) || '',
        ...(trophy as Partial<ITrophy>),
      });
    }
  }, [data, seasonOptions]);

  const onDelete = async () => {
    try {
      return deleteTrophy({ variables: { teamId, trophyId } }).then(() => {
        dispatch(showAlert('Trophy deleted successfully', 'success'));
        navigate(-2);
      });
    } catch (error) {
      dispatch(showAlert('There was a problem', 'error'));
    }
  };

  const onSubmit = async (formData: Partial<ITrophy>) => {
    try {
      return editTrophy({ variables: { teamId, trophyId, ...formData } }).then(
        () => {
          refetch();
          dispatch(showAlert('Trophy updated successfully', 'success'));
          navigate(-2);
        }
      );
    } catch (error) {
      dispatch(showAlert('There was a problem', 'error'));
    }
  };

  if (error || editError || deleteError) {
    return <ErrorGraphql error={[error, editError, deleteError]} />;
  }

  return (
    <RouteGuard authorization={AUTH_ROLES.TEAM_ADMIN} teamId={teamId}>
      <PageHeader title={PAGES.EDIT_TROPHY} />
      {!loading && !editLoading && !loadingSeasons && defaultValues ? (
        <TrophyForm
          defaultValues={defaultValues}
          seasonOptions={seasonOptions}
          onSubmit={onSubmit}
          onDelete={onDelete}
          deleteLoading={deleteLoading}
        />
      ) : (
        <Spinner />
      )}
    </RouteGuard>
  );
};

export default EditTrophy;
