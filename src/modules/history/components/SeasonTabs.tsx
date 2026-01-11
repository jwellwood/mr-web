import { lazy } from 'react';

import { TAB_TYPES } from '../../../constants';
import { CustomTabs, ITab } from '../../../components/tabs';
import SeasonHeader from './SeasonHeader';
import { ITeamSeason } from '../types/index';

const Matches = lazy(() => import('../../matches/containers/Matches.tsx'));
const Squad = lazy(() => import('../../squad/containers/Squad.tsx'));
const MatchStatsSeason = lazy(() => import('../../matches/containers/MatchStatsSeason.tsx'));
const Awards = lazy(() => import('../containers/Awards.tsx'));

interface Props {
  season?: ITeamSeason;
}

export default function SeasonTabs({ season }: Props) {
  const tabs: ITab[] = [
    { label: 'Stats', component: <MatchStatsSeason /> },
    { label: 'Matches', component: <Matches /> },
    { label: 'Squad', component: <Squad /> },
    { label: 'Awards', component: <Awards /> },
  ] as const;

  if (!season) {
    return null;
  }

  return (
    <SeasonHeader title={season.name}>
      <CustomTabs type={TAB_TYPES.SEASON} tabs={tabs} level="secondary" />
    </SeasonHeader>
  );
}
