import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { AUTH_ROLES } from 'app/constants';
import { Spinner } from 'components/loaders';
import { PageHeader } from 'components/typography';
import ErrorGraphql from 'errors/ErrorGraphql';
import { useCustomParams } from 'hooks/useCustomParams';
import { showAlert } from 'modules/alerts';
import { AppDispatch } from 'reduxStore/rootReducer';
import RouteGuard from 'router/RouteGuard';
import { ICompetition } from 'types';
import { PAGES } from '../constants';
import CompetitionForm from '../forms/CompetitionForm';
import { GET_COMPETITION_BY_ID, UPDATE_COMPETITION } from '../graphql';
import { mapCompetitionInput } from '../helpers/mapCompetitionInput';

const EditCompetition: React.FC = () => {
  const { orgId, competitionId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const { loading, error, data } = useQuery(GET_COMPETITION_BY_ID, {
    variables: { compId: competitionId },
  });
  const [updateCompetition, { loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_COMPETITION, {
      refetchQueries: [
        { query: GET_COMPETITION_BY_ID, variables: { compId: competitionId } },
      ],
    });
  const [defaultValues, setDefaultValues] = useState<ICompetition>(null);

  useEffect(() => {
    if (data) {
      const { competition } = data;
      setDefaultValues({
        ...(competition as ICompetition),
      });
    }
  }, [data]);
  const onSubmit = async (formData: ICompetition) => {
    try {
      return updateCompetition({
        variables: {
          orgId,
          compId: competitionId,
          ...mapCompetitionInput(formData),
        },
      }).then((res) => {
        dispatch(showAlert('Competition updated successfully!', 'success'));
        navigate(-1);
      });
    } catch (error) {
      dispatch(showAlert('Something went wrong', 'error'));
    }
  };

  if (error || updateError)
    return <ErrorGraphql error={[error.message, updateError.message]} />;

  return (
    <RouteGuard authorization={AUTH_ROLES.ORG_ADMIN} orgId={orgId}>
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
