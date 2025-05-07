import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { AUTH_ROLES } from 'app/constants';
import { Spinner } from 'components/loaders';
import { PageHeader } from 'components/typography';
import ErrorGraphql from 'errors/ErrorGraphql';
import { useCustomParams } from 'hooks/useCustomParams';
import { showAlert } from 'modules/alerts';
import { AppDispatch } from 'reduxStore/rootReducer';
import RouteGuard from 'router/RouteGuard';
import { ICompetition } from 'types';
import { PAGES, initialCompetitionState } from '../constants';
import CompetitionForm from '../forms/CompetitionForm';
import { ADD_COMPETITION, GET_ORG } from '../graphql';
import { mapCompetitionInput } from '../helpers/mapCompetitionInput';

const AddCompetition: React.FC = () => {
  const { orgId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [defaultValues, setDefaultValues] =
    useState<Partial<ICompetition>>(null);

  const [addCompetition, { error, loading }] = useMutation(ADD_COMPETITION, {
    refetchQueries: [{ query: GET_ORG, variables: { orgId } }],
  });

  useEffect(() => {
    setDefaultValues({ ...initialCompetitionState });
  }, []);
  const onSubmit = async (formData: ICompetition) => {
    try {
      return addCompetition({
        variables: { orgId, ...mapCompetitionInput(formData) },
      }).then((res) => {
        dispatch(showAlert('Competition added successfully!', 'success'));
        navigate(-1);
      });
    } catch (error) {
      dispatch(showAlert('Something went wrong', 'error'));
    }
  };

  if (error) return <ErrorGraphql error={[error.message]} />;

  return (
    <RouteGuard authorization={AUTH_ROLES.ORG_ADMIN} orgId={orgId}>
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
