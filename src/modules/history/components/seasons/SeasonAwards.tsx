import { lazy } from 'react';
import StatSkeleton from '../../../../components/loaders/StatSkeleton';
import { PresentationModal } from '../../../../components/modals';
import { AppIcon } from '../../../../components/icons';

const Awards = lazy(() => import('../../containers/Awards'));

interface Props {
  seasonId?: string;
  name: string;
  position?: number;
  loading?: boolean;
}

export default function SeasonAwards({ seasonId, name, position, loading }: Props) {
  const renderDisplay = position ? (
    <PresentationModal
      title={`${name} Awards`}
      buttonElement={<AppIcon icon="medal" color="label" />}
    >
      <Awards season_id={seasonId} />
    </PresentationModal>
  ) : null;
  return loading ? <StatSkeleton /> : renderDisplay;
}
