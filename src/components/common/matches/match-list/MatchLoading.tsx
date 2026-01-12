import { IMatchList } from '../../../../modules/matches/types';
import { CustomAvatar } from '../../../avatars';
import { LinksList } from '../../../lists';
import MatchListLabel from './MatchListLabel';
import MatchListScoreBox from './MatchListScoreBox';

interface Props {
  showBadge?: boolean;
}

export default function MatchLoading({ showBadge }: Props) {
  const data = Array.from({ length: 12 }).map((_, index) => ({
    id: index,
    avatar: showBadge ? <CustomAvatar loading size="40px" /> : null,
    link: '',
    label: <MatchListLabel match={{ id: index } as unknown as IMatchList} loading />,
    value: <MatchListScoreBox teamGoals={0} opponentGoals={0} loading />,
  }));

  return <LinksList links={data} />;
}
