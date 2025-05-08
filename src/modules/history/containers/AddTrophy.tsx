import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { PAGES, initialTrophyFormState } from '../constants';
import TrophyForm from '../forms/TrophyForm';
import { ADD_TROPHY } from '../graphql/addTrophy.graphql';
import { GET_TROPHIES } from '../graphql/getTrophies.graphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { AppDispatch } from '../../../store/store';
import { useSeasons } from '../../../hooks/useSeasons';
import { ITrophy } from '../../../types';
import { showAlert } from '../../../store/features/alerts/alertsSlice';
import ErrorGraphql from "../../../errors/ErrorGraphql.tsx";
import RouteGuard from '../../../router/RouteGuard.tsx';
import {AuthRoles} from "../../../constants.ts";
import PageHeader from '../../../components/typography/PageHeader.tsx';
import {Spinner} from "../../../components/loaders";

const AddTrophy: React.FC = () => {
  const { teamId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { seasonOptions, loading: loadingSeasons } = useSeasons();
  const [defaultValues, setDefaultValues] = useState<Partial<ITrophy>>({});

  useEffect(() => {
    setDefaultValues({ ...initialTrophyFormState });
  }, []);

  const [addTrophy, { error, loading }] = useMutation(ADD_TROPHY, {
    refetchQueries: [{ query: GET_TROPHIES, variables: { teamId } }],
  });

  const onSubmit = async (formData: Partial<ITrophy>) => {
    try {
      return addTrophy({ variables: { teamId, ...formData } }).then(() => {
        dispatch(showAlert({text: 'Trophy added successfully', type: 'success'}));
        navigate(-1);
      });
    } catch (error) {
      console.error(error);
      dispatch(showAlert({text: 'There was a problem', type: 'error'}));
    }
  };

  if (error) {
    return <ErrorGraphql error={{message: error.message}} />;
  }

  return (
    <RouteGuard authorization={AuthRoles.TEAM_ADMIN}>
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
