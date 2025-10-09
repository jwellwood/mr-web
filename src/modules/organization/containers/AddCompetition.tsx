import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { AuthRoles } from '../../../constants.ts';
import { PAGES } from '../constants';
import { initialCompetitionState } from '../forms/state.ts';
import { mapCompetitionInput } from '../helpers/mapCompetitionInput';
import { useCustomParams } from '../../../hooks/useCustomParams.tsx';

import { showAlert } from '../../../store/features/alerts/alertsSlice.ts';
import { AppDispatch } from '../../../store/store.ts';
import ErrorGraphql from '../../../errors/ErrorGraphql.tsx';
import RouteGuard from '../../../router/RouteGuard.tsx';
import { ADD_COMPETITION, FETCH_ORG } from '../graphql';
import Spinner from '../../../components/loaders/Spinner.tsx';
import CustomAppBar from '../../../components/navigation/CustomAppBar.tsx';
import CompetitionForm from '../forms/CompetitionForm';
import { ICompetitionInput } from '../types.ts';

export default function AddCompetition() {
  const { orgId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [defaultValues, setDefaultValues] = useState<ICompetitionInput | null>(null);

  const [addCompetition, { error, loading }] = useMutation(ADD_COMPETITION, {
    refetchQueries: [{ query: FETCH_ORG, variables: { orgId } }],
  });

  useEffect(() => {
    setDefaultValues({ ...initialCompetitionState });
  }, []);
  const onSubmit = async (formData: ICompetitionInput) => {
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

  const renderContent = () => {
    return !loading && defaultValues ? (
      <CompetitionForm defaultValues={defaultValues} onSubmit={onSubmit} />
    ) : (
      <Spinner />
    );
  };

  return (
    <RouteGuard authorization={AuthRoles.ORG_ADMIN}>
      <CustomAppBar title={PAGES.ADD_COMPETITION}>
        {error ? <ErrorGraphql error={error} /> : renderContent()}
      </CustomAppBar>
    </RouteGuard>
  );
}
