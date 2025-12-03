import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { FETCH_COMPETITION, EDIT_COMPETITION, FETCH_COMPETITIONS } from '../graphql';
import { PAGES } from '../constants.ts';
import { mapCompetitionInput } from '../helpers/mapCompetitionInput.ts';
import { useCustomParams } from '../../../hooks/useCustomParams.tsx';
import { AppDispatch } from '../../../store/store.ts';
import { showAlert } from '../../../store/features/alerts/alertsSlice.ts';
import ErrorGraphql from '../../../errors/ErrorGraphql.tsx';
import RouteGuard from '../../../router/RouteGuard.tsx';
import { AuthRoles } from '../../../constants.ts';
import { Spinner } from '../../../components/loaders/index.ts';
import { ICompetitionInput } from '../types.ts';
import { PageHeader } from '../../../components/index.ts';
import CompetitionForm from './components/CompetitionForm.tsx';
import DeleteCompetition from '../containers/DeleteCompetition.tsx';

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
  const [defaultValues, setDefaultValues] = useState<ICompetitionInput | null>(null);

  useEffect(() => {
    if (data) {
      const { competition } = data;
      setDefaultValues({
        ...(competition as ICompetitionInput),
      });
    }
  }, [data]);

  const onSubmit = async (formData: ICompetitionInput) => {
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

  const renderContent = () => {
    return !loading && !updateLoading && defaultValues ? (
      <>
        <CompetitionForm defaultValues={defaultValues} onSubmit={onSubmit} />
        <DeleteCompetition />
      </>
    ) : (
      <Spinner />
    );
  };

  return (
    <RouteGuard authorization={AuthRoles.ORG_ADMIN}>
      <PageHeader title={PAGES.EDIT_COMP}>
        {error || updateError ? (
          <ErrorGraphql
            error={{ message: [error?.message, updateError?.message].filter(Boolean) as string[] }}
          />
        ) : (
          renderContent()
        )}
      </PageHeader>
    </RouteGuard>
  );
}
