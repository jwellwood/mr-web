import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { PAGES, initialCompetitionState } from '../constants';
import CompetitionForm from '../forms/CompetitionForm';
import { ADD_COMPETITION, GET_ORG } from '../graphql';
import { mapCompetitionInput } from '../helpers/mapCompetitionInput';
import { useCustomParams } from '../../../hooks/useCustomParams.tsx';
import { AppDispatch } from '../../../store/store.ts';
import { ICompetition } from '../../../types/organization.ts';
import { showAlert } from '../../../store/features/alerts/alertsSlice.ts';
import ErrorGraphql from '../../../errors/ErrorGraphql.tsx';
import RouteGuard from '../../../router/RouteGuard.tsx';
import { PageHeader } from '../../../components/typography';
import Spinner from '../../../components/loaders/Spinner.tsx';
import { AuthRoles } from '../../../constants.ts';

const AddCompetition: React.FC = () => {
  const { orgId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [defaultValues, setDefaultValues] = useState<Partial<ICompetition | null>>(null);

  const [addCompetition, { error, loading }] = useMutation(ADD_COMPETITION, {
    refetchQueries: [{ query: GET_ORG, variables: { orgId } }],
  });

  useEffect(() => {
    setDefaultValues({ ...initialCompetitionState });
  }, []);
  const onSubmit = async (formData: Partial<ICompetition>) => {
    try {
      return addCompetition({
        variables: { orgId, ...mapCompetitionInput(formData) },
      }).then(() => {
        dispatch(showAlert({ text: 'Competition added successfully!', type: 'success' }));
        navigate(-1);
      });
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: 'Something went wrong', type: 'error' }));
    }
  };

  if (error) return <ErrorGraphql error={error} />;

  return (
    <RouteGuard authorization={AuthRoles.ORG_ADMIN}>
      <PageHeader title={PAGES.ADD_COMPETITION} />
      {!loading && defaultValues ? (
        <CompetitionForm defaultValues={defaultValues} onSubmit={onSubmit} />
      ) : (
        <Spinner />
      )}
    </RouteGuard>
  );
};

export default AddCompetition;
