import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { FETCH_COMPETITION, EDIT_COMPETITION, FETCH_COMPETITIONS } from '../../graphql';
import { PAGES } from '../../constants';
import { useCustomParams } from '../../../../hooks';
import { AppDispatch, showAlert } from '../../../../store';
import RouteGuard from '../../../../router/RouteGuard';
import { AUTH_ROLES } from '../../../../constants';
import { Spinner } from '../../../../components/loaders';
import { PageHeader } from '../../../../components';
import type { CompetitionFormData } from './validation';
import DeleteCompetition from './DeleteCompetition';
import CompetitionForm from './CompetitionForm';

export default function EditCompetition() {
  const { orgId, competitionId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const { loading, error, data } = useQuery(FETCH_COMPETITION, {
    variables: { compId: competitionId },
  });
  const [updateCompetition, { loading: updateLoading, error: updateError }] = useMutation(
    EDIT_COMPETITION,
    {
      refetchQueries: [
        { query: FETCH_COMPETITION, variables: { compId: competitionId } },
        { query: FETCH_COMPETITIONS, variables: { orgId } },
      ],
    }
  );
  const [defaultValues, setDefaultValues] = useState<CompetitionFormData | null>(null);

  useEffect(() => {
    if (data) {
      const { competition } = data;
      setDefaultValues({ ...competition } as CompetitionFormData);
    }
  }, [data]);

  const onSubmit = async (formData: CompetitionFormData) => {
    try {
      return updateCompetition({
        variables: {
          orgId,
          compId: competitionId,
          ...formData,
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

  const renderContent = () => {
    return defaultValues ? (
      <>
        <CompetitionForm
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          loading={updateLoading || loading}
          error={updateError || error}
        />
        <DeleteCompetition />
      </>
    ) : (
      <Spinner />
    );
  };

  return (
    <RouteGuard authorization={AUTH_ROLES.ORG_ADMIN}>
      <PageHeader title={PAGES.EDIT_COMP}>{renderContent()}</PageHeader>
    </RouteGuard>
  );
}
