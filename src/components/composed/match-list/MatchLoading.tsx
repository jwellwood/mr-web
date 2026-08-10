import { CustomAvatar } from '../../avatars';
import { LinksList } from '../../lists';
import { IMatchesListMatch } from '../types';
import MatchListLabel from './MatchListLabel';
import MatchListScoreBox from './MatchListScoreBox';

interface Props {
  showBadge?: boolean;
  length?: number;
}

export default function MatchLoading({ showBadge, length = 12 }: Props) {
  const data = Array.from({ length }).map((_, index) => ({
    id: index,
    avatar: showBadge ? <CustomAvatar loading size="40px" /> : null,
    link: '',
    label: <MatchListLabel match={{ id: index } as unknown as IMatchesListMatch} loading />,
    value: <MatchListScoreBox teamGoals={0} opponentGoals={0} loading />,
  }));

  return <LinksList links={data} />;
}
