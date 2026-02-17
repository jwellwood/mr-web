import { useMutation, useQuery } from '@apollo/client/react';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../../../components';
import { Spinner } from '../../../../components/loaders';
import { useCustomParams } from '../../../../hooks';
import { AppDispatch, showAlert } from '../../../../store';
import { PAGES } from '../../constants';
import { EDIT_COMPETITION, FETCH_COMPETITION, FETCH_COMPETITIONS } from '../graphql';
import { mapFormToEditCompetition, mapCompetitionToForm } from '../helpers/mapCompetitionForm';
import CompetitionForm from './CompetitionForm';
import DeleteCompetition from './DeleteCompetition';
import type { CompetitionFormData } from './validation';

export default function EditCompetition() {
  const { orgId, competitionId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const { loading, error, data } = useQuery(FETCH_COMPETITION, {
    variables: { compId: competitionId! },
  });
  const [updateCompetition, { loading: updateLoading, error: updateError }] = useMutation(
    EDIT_COMPETITION,
    {
      refetchQueries: [
        { query: FETCH_COMPETITION, variables: { compId: competitionId! } },
        { query: FETCH_COMPETITIONS, variables: { orgId: orgId! } },
      ],
    }
  );
  const defaultValues: CompetitionFormData | null = useMemo(
    () => (data?.competition ? mapCompetitionToForm(data.competition) : null),
    [data]
  );

  const onSubmit = async (formData: CompetitionFormData) => {
    try {
      const variables = mapFormToEditCompetition(formData, orgId!, competitionId!);
      return updateCompetition({ variables }).then(() => {
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

  return <PageHeader title={PAGES.EDIT_COMP}>{renderContent()}</PageHeader>;
}
