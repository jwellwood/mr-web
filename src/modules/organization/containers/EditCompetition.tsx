import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { PAGES } from '../constants';
import CompetitionForm from '../forms/CompetitionForm';
import { GET_COMPETITION_BY_ID, UPDATE_COMPETITION } from '../graphql';
import { mapCompetitionInput } from '../helpers/mapCompetitionInput';
import { useCustomParams } from '../../../hooks/useCustomParams.tsx';
import { AppDispatch } from '../../../store/store.ts';
import { ICompetition } from '../../../types';
import { showAlert } from '../../../store/features/alerts/alertsSlice.ts';
import ErrorGraphql from '../../../errors/ErrorGraphql.tsx';
import RouteGuard from '../../../router/RouteGuard.tsx';
import { AuthRoles } from '../../../constants.ts';
import { PageHeader } from '../../../components/typography';
import { Spinner } from '../../../components/loaders';

const EditCompetition: React.FC = () => {
  const { orgId, competitionId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const { loading, error, data } = useQuery(GET_COMPETITION_BY_ID, {
    variables: { compId: competitionId },
  });
  const [updateCompetition, { loading: updateLoading, error: updateError }] = useMutation(
    UPDATE_COMPETITION,
    {
      refetchQueries: [{ query: GET_COMPETITION_BY_ID, variables: { compId: competitionId } }],
    }
  );
  const [defaultValues, setDefaultValues] = useState<ICompetition | null>(null);

  useEffect(() => {
    if (data) {
      const { competition } = data;
      setDefaultValues({
        ...(competition as ICompetition),
      });
    }
  }, [data]);
  const onSubmit = async (formData: Partial<ICompetition>) => {
    try {
      return updateCompetition({
        variables: {
          orgId,
          compId: competitionId,
          ...mapCompetitionInput(formData),
        },
      }).then(() => {
        dispatch(showAlert({ text: 'Competition updated successfully!', type: 'success' }));
        navigate(-1);
      });
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: 'Something went wrong', type: 'error' }));
    }
  };

  if (error) {
    return <ErrorGraphql error={error} />;
  }
  if (updateError) {
    return <ErrorGraphql error={new Error(updateError.message)} />;
  }

  return (
    <RouteGuard authorization={AuthRoles.ORG_ADMIN}>
      <PageHeader title={PAGES.EDIT_COMP} />
      {!loading && !updateLoading && defaultValues ? (
        <CompetitionForm defaultValues={defaultValues} onSubmit={onSubmit} />
      ) : (
        <Spinner />
      )}
    </RouteGuard>
  );
};

export default EditCompetition;
