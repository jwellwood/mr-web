import { T_FETCH_SEASON } from '../graphql';
import SeasonTabs from './SeasonTabs';

interface Props {
  season?: T_FETCH_SEASON['season'];
}

export default function SeasonView({ season }: Props) {
  return <SeasonTabs season={season} />;
}
