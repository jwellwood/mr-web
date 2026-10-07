import { useMutation } from '@apollo/client/react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { DeleteModal } from '../../../components/modals';
import { useCustomParams } from '../../../hooks';
import { AppDispatch, showAlert } from '../../../store';
import { DELETE_ORG_TROPHY, FETCH_ORG_TROPHIES } from '../graphql';

interface Props {
  orgSeasonId: string;
  orgTrophyId: string;
  onDeleted: () => void;
}

export default function DeleteOrgTrophy({ orgSeasonId, orgTrophyId, onDeleted }: Props) {
  const { t } = useTranslation('trophies');
  const { orgId } = useCustomParams();
  const dispatch: AppDispatch = useDispatch();

  const [deleteTrophy, { error, loading }] = useMutation(DELETE_ORG_TROPHY, {
    refetchQueries: [{ query: FETCH_ORG_TROPHIES, variables: { orgSeasonId } }],
    awaitRefetchQueries: true,
  });

  const onDelete = async () => {
    try {
      await deleteTrophy({ variables: { orgId: orgId!, orgTrophyId } });
      dispatch(showAlert({ text: t('ALERTS.DELETE_TROPHY.SUCCESS'), type: 'success' }));
      onDeleted();
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: t('ALERTS.DELETE_TROPHY.ERROR'), type: 'error' }));
    }
  };

  return (
    <DeleteModal title={t('PAGES.TROPHY')} error={error} onDelete={onDelete} loading={loading} />
  );
}
