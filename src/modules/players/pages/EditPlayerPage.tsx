import { useTranslation } from 'react-i18next';
import { PageHeader } from '../../../components';
import { Spinner } from '../../../components/loaders';
import { useSeasons, useNationality } from '../../../hooks';
import { TApolloError } from '../../../types/apollo';
import DeletePlayer from '../containers/DeletePlayer';
import PlayerForm from '../forms/player-form/PlayerForm';
import type { PlayerFormData } from '../forms/player-form/schema';

interface Props {
  loading: boolean;
  defaultValues: PlayerFormData | null;
  onSubmit: (data: PlayerFormData) => void;
  error?: TApolloError;
}

export default function EditPlayerPage({ loading, defaultValues, onSubmit, error }: Props) {
  const { t } = useTranslation('players');
  const { seasonOptions } = useSeasons();

  const { nationalityOptions } = useNationality();

  return (
    <PageHeader title={t('PAGES.EDIT_PLAYER')}>
      {loading || !defaultValues ? (
        <Spinner />
      ) : (
        <>
          <PlayerForm
            defaultValues={defaultValues}
            onSubmit={onSubmit}
            countryOptions={nationalityOptions}
            seasonOptions={seasonOptions}
            loading={loading}
            error={error}
          />
          <DeletePlayer />
        </>
      )}
    </PageHeader>
  );
}
