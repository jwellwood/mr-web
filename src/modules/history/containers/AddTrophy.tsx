import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
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
import { PAGES, initialTrophyFormState } from '../constants';
import TrophyForm from '../forms/TrophyForm';
import { ADD_TROPHY } from '../graphql/addTrophy.graphql';
import { GET_TROPHIES } from '../graphql/getTrophies.graphql';

const AddTrophy: React.FC = () => {
  const { teamId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { seasonOptions, loading: loadingSeasons } = useSeasons();
  const [defaultValues, setDefaultValues] = useState<Partial<ITrophy>>(null);

  useEffect(() => {
    setDefaultValues({ ...initialTrophyFormState });
  }, []);

  const [addTrophy, { error, loading }] = useMutation(ADD_TROPHY, {
    refetchQueries: [{ query: GET_TROPHIES, variables: { teamId } }],
  });

  const onSubmit = async (formData: Partial<ITrophy>) => {
    try {
      return addTrophy({ variables: { teamId, ...formData } }).then(() => {
        dispatch(showAlert('Trophy added successfully', 'success'));
        navigate(-1);
      });
    } catch (error) {
      dispatch(showAlert('There was a problem', 'error'));
    }
  };

  if (error) {
    return <ErrorGraphql error={[error]} />;
  }

  return (
    <RouteGuard authorization={AUTH_ROLES.TEAM_ADMIN} teamId={teamId}>
      <PageHeader title={PAGES.ADD_TROPHY} />
      {!loading && !loadingSeasons && defaultValues && seasonOptions ? (
        <TrophyForm
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          seasonOptions={seasonOptions}
        />
      ) : (
        <Spinner />
      )}
    </RouteGuard>
  );
};

export default AddTrophy;
