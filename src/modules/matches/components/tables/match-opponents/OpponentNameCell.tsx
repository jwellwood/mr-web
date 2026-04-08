import { lazy } from 'react';
import { OpponentModal } from '../../../../../components';

const HeadToHead = lazy(() => import('../../../containers/HeadToHead'));

interface Props {
  name: string;
  badge: string;
  opponentId: string;
}

export function OpponentNameCell({ name, badge, opponentId }: Props) {
  return (
    <OpponentModal name={name} badge={badge}>
      <HeadToHead opponentId={opponentId} />
    </OpponentModal>
  );
}
