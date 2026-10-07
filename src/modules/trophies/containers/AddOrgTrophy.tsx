import { useMutation } from '@apollo/client/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { CustomButton } from '../../../components';
import { FormModal } from '../../../components/modals';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { AppDispatch, showAlert } from '../../../store';
import OrgTrophyForm from '../forms/OrgTrophyForm';
import { ADD_ORG_TROPHY, FETCH_ORG_TROPHIES } from '../graphql';
import { useOrgTrophyOptions } from '../hooks/useOrgTrophyOptions';
import { initialOrgTrophyFormState, type OrgTrophyFormData } from '../schema/org-trophy';

interface Props {
  orgSeasonId: string;
}

export default function AddOrgTrophy({ orgSeasonId }: Props) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation('trophies');
  return (
    <>
      <CustomButton variant="text" onClick={() => setOpen(true)}>
        {t('PAGES.ADD_ORG_TROPHY')}
      </CustomButton>
      {open && <AddOrgTrophyModal orgSeasonId={orgSeasonId} onClose={() => setOpen(false)} />}
    </>
  );
}

interface ModalProps {
  orgSeasonId: string;
  onClose: () => void;
}

function AddOrgTrophyModal({ orgSeasonId, onClose }: ModalProps) {
  const { t } = useTranslation('trophies');
  const { orgId } = useCustomParams();
  const dispatch: AppDispatch = useDispatch();
  const { competitionOptions, teamOptionsByCompetition, loading, error } =
    useOrgTrophyOptions(orgSeasonId);
  const defaultValues: OrgTrophyFormData = { ...initialOrgTrophyFormState };

  const [addOrgTrophy, { loading: saving }] = useMutation(ADD_ORG_TROPHY);

  const onSubmit = async (formData: OrgTrophyFormData) => {
    try {
      await addOrgTrophy({
        variables: { orgId: orgId!, orgSeasonId: orgSeasonId!, ...formData },
        refetchQueries: [{ query: FETCH_ORG_TROPHIES, variables: { orgSeasonId: orgSeasonId! } }],
      });
      dispatch(showAlert({ text: t('ALERTS.ADD_ORG_TROPHY.SUCCESS'), type: 'success' }));
      onClose();
    } catch (error) {
      dispatch(
        showAlert({
          text: error instanceof Error ? error.message : t('ALERTS.ADD_ORG_TROPHY.ERROR'),
          type: 'error',
        })
      );
    }
  };

  return (
    <FormModal open onClose={onClose} title={t('PAGES.ADD_ORG_TROPHY')}>
      <OrgTrophyForm
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        competitionOptions={competitionOptions}
        teamOptionsByCompetition={teamOptionsByCompetition}
        loading={saving || loading}
        error={error}
      />
    </FormModal>
  );
}
