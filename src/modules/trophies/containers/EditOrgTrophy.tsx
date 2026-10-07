import { useMutation } from '@apollo/client/react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { FormModal } from '../../../components/modals';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { AppDispatch, showAlert } from '../../../store';
import OrgTrophyForm from '../forms/OrgTrophyForm';
import { EDIT_ORG_TROPHY, FETCH_ORG_TROPHIES } from '../graphql';
import type { T_FETCH_ORG_TROPHIES } from '../graphql';
import { useOrgTrophyOptions } from '../hooks/useOrgTrophyOptions';
import type { OrgTrophyFormData } from '../schema/org-trophy';

interface Props {
  orgSeasonId: string;
  trophy: T_FETCH_ORG_TROPHIES['trophies'][number];
  onClose: () => void;
}

export default function EditOrgTrophy({ orgSeasonId, trophy, onClose }: Props) {
  const { t } = useTranslation('trophies');
  const { orgId } = useCustomParams();
  const dispatch: AppDispatch = useDispatch();
  const { competitionOptions, teamOptionsByCompetition, loading, error } =
    useOrgTrophyOptions(orgSeasonId);
  const defaultValues: OrgTrophyFormData = {
    competitionId: trophy.competitionId,
    winningTeamId: trophy.winningTeamId,
    runnerUpTeamId: trophy.runnerUpTeamId,
    comment: trophy.comment ?? '',
  };

  const [editOrgTrophy, { loading: saving }] = useMutation(EDIT_ORG_TROPHY);

  const onSubmit = async (formData: OrgTrophyFormData) => {
    try {
      await editOrgTrophy({
        variables: {
          orgId: orgId!,
          orgTrophyId: trophy._id,
          orgSeasonId: orgSeasonId!,
          ...formData,
        },
        refetchQueries: [{ query: FETCH_ORG_TROPHIES, variables: { orgSeasonId: orgSeasonId! } }],
      });
      dispatch(showAlert({ text: t('ALERTS.EDIT_ORG_TROPHY.SUCCESS'), type: 'success' }));
      onClose();
    } catch (error) {
      dispatch(
        showAlert({
          text: error instanceof Error ? error.message : t('ALERTS.EDIT_ORG_TROPHY.ERROR'),
          type: 'error',
        })
      );
    }
  };

  return (
    <FormModal open onClose={onClose} title={t('PAGES.EDIT_ORG_TROPHY')}>
      <OrgTrophyForm
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        competitionOptions={competitionOptions}
        teamOptionsByCompetition={teamOptionsByCompetition}
        loading={loading || saving}
        error={error}
      />
    </FormModal>
  );
}
