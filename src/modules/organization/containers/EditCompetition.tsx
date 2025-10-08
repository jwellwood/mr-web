import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { FETCH_COMPETITION, EDIT_COMPETITION } from '../graphql';

import { PAGES } from '../constants';
import CompetitionForm from '../forms/CompetitionForm';
import { mapCompetitionInput } from '../helpers/mapCompetitionInput';
import { useCustomParams } from '../../../hooks/useCustomParams.tsx';
import { AppDispatch } from '../../../store/store.ts';
import { ICompetition } from '../../../types';
import { showAlert } from '../../../store/features/alerts/alertsSlice.ts';
import ErrorGraphql from '../../../errors/ErrorGraphql.tsx';
import RouteGuard from '../../../router/RouteGuard.tsx';
import { AuthRoles } from '../../../constants.ts';
import { Spinner } from '../../../components/loaders';
import CustomAppBar from '../../../components/navigation/CustomAppBar.tsx';

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
      refetchQueries: [{ query: FETCH_COMPETITION, variables: { compId: competitionId } }],
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

  const renderContent = () => {
    return !loading && !updateLoading && defaultValues ? (
      <CompetitionForm defaultValues={defaultValues} onSubmit={onSubmit} />
    ) : (
      <Spinner />
    );
  };

  return (
    <RouteGuard authorization={AuthRoles.ORG_ADMIN}>
      <CustomAppBar title={PAGES.EDIT_COMP}>
        {error || updateError ? (
          <ErrorGraphql
            error={{ message: [error?.message, updateError?.message].filter(Boolean) as string[] }}
          />
        ) : (
          renderContent()
        )}
      </CustomAppBar>
    </RouteGuard>
  );
}
