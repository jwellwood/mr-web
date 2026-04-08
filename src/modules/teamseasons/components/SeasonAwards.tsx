import { lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { AppIcon } from '../../../components/icons';
import { StatSkeleton } from '../../../components/loaders';
import { PresentationModal } from '../../../components/modals';

const Awards = lazy(() => import('../../awards/containers/Awards'));

interface Props {
  seasonId?: string;
  name: string;
  position?: number;
  loading?: boolean;
}

export default function SeasonAwards({ seasonId, name, position, loading }: Props) {
  const { t } = useTranslation('teamseasons');

  const renderDisplay = position ? (
    <PresentationModal
      title={t('MODALS.AWARDS_TITLE', { name })}
      buttonElement={<AppIcon icon="medal" color="label" />}
    >
      <Awards season_id={seasonId} />
    </PresentationModal>
  ) : null;
  return loading ? <StatSkeleton /> : renderDisplay;
}
