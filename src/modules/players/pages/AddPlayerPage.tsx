import { useTranslation } from 'react-i18next';
import { NoDataText, PageHeader } from '../../../components';
import { Spinner } from '../../../components/loaders';
import { useNationality, useSeasons } from '../../../hooks';
import PlayerForm from '../forms/player-form/PlayerForm';
import { initialPlayerState, PlayerFormData } from '../forms/player-form/schema';

interface Props {
  loading: boolean;
  onSubmit: (formData: PlayerFormData) => void;
}

export default function AddPlayerPage({ loading, onSubmit }: Props) {
  const { nationalityOptions } = useNationality();
  const { seasonOptions, loading: seasonLoading } = useSeasons();
  const { t } = useTranslation('players');
  return (
    <PageHeader title={t('PAGES.ADD_PLAYER')}>
      {loading || seasonLoading ? (
        <Spinner />
      ) : !seasonOptions.length ? (
        <NoDataText>{t('MESSAGES.ADD_SEASON_BEFORE_PLAYERS')}</NoDataText>
      ) : (
        <PlayerForm
          defaultValues={initialPlayerState}
          onSubmit={onSubmit}
          countryOptions={nationalityOptions}
          seasonOptions={seasonOptions}
          loading={loading || seasonLoading}
        />
      )}
    </PageHeader>
  );
}
