import { useMutation } from '@apollo/client/react';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../../../components';
import Spinner from '../../../../components/loaders/spinner/Spinner';
import { useCustomParams } from '../../../../hooks/useCustomParams';
import { AppDispatch, showAlert } from '../../../../store';
import { PAGES } from '../../constants';
import { useCompetitionOptions, useTeamOptions } from '../../hooks';
import { ADD_ORG_SEASON, FETCH_ORG_SEASONS } from '../graphql';
import { mapFormToAddOrgSeason } from '../helpers/mapOrgSeasonForm';
import OrgSeasonForm from './OrgSeasonForm';
import { initialOrgSeasonState } from './state';
import { OrgSeasonFormData } from './validation';

export default function AddOrgSeason() {
  const { orgId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { teamOptions, loading: teamOptionsLoading } = useTeamOptions();
  const { competitionOptions, loading: competitionOptionsLoading } = useCompetitionOptions();
  const defaultValues: OrgSeasonFormData = useMemo(() => ({ ...initialOrgSeasonState }), []);

  const [addOrgSeason, { error, loading }] = useMutation(ADD_ORG_SEASON, {
    refetchQueries: [{ query: FETCH_ORG_SEASONS, variables: { orgId } }],
  });

  const onSubmit = async (formData: OrgSeasonFormData) => {
    try {
      const variables = mapFormToAddOrgSeason(formData, orgId!);
      return addOrgSeason({
        variables,
      }).then(() => {
        dispatch(showAlert({ text: 'Season added successfully!', type: 'success' }));
        navigate(-1);
      });
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: 'Something went wrong', type: 'error' }));
    }
  };

  return (
    <PageHeader title={PAGES.ADD_ORG_SEASON}>
      {defaultValues ? (
        <OrgSeasonForm
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          loading={loading || teamOptionsLoading || competitionOptionsLoading}
          error={error}
          teamOptions={teamOptions}
          competitionOptions={competitionOptions}
        />
      ) : (
        <Spinner />
      )}
    </PageHeader>
  );
}
