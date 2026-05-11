import { useLazyQuery } from '@apollo/client/react';
import { useTranslation } from 'react-i18next';
import { PresentationModal } from '../../../../components/modals';
import { CustomTypography } from '../../../../components/typography';
import { useCustomParams } from '../../../../hooks';
import { FETCH_PLAYER_PROFILES } from '../../graphql';
import ByProfileGroup from './ByProfileGroup';

export default function PlayerProfilesModal() {
  const { t } = useTranslation('squad');
  const { teamId } = useCustomParams();

  const [fetchProfiles, { data, loading }] = useLazyQuery(FETCH_PLAYER_PROFILES, {
    fetchPolicy: 'cache-first',
  });

  const players = data?.players ?? [];

  return (
    <PresentationModal
      title={t('HEADERS.PLAYER_PROFILES')}
      buttonElement={
        <span onClick={() => fetchProfiles({ variables: { teamId: teamId! } })}>
          <CustomTypography color="primary" size="sm" bold>
            {t('BUTTONS.PROFILES')}
          </CustomTypography>
        </span>
      }
    >
      <ByProfileGroup players={players} title={t('BUTTONS.PROFILES')} loading={loading} />
    </PresentationModal>
  );
}
