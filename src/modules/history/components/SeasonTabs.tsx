import { lazy } from 'react';

import { TAB_TYPES } from '../../../app/constants.ts';
import { CustomTabs, ITab } from '../../../components/tabs/index.ts';
import SeasonHeader from './SeasonHeader.tsx';
import { ITeamSeason } from '../types/index.ts';
import { Matches } from '../../matches/routes.ts';
import { Squad } from '../../squad/routes.ts';

const MatchStats = lazy(() => import('../../matches/containers/MatchStats.tsx'));
const Awards = lazy(() => import('../containers/Awards.tsx'));

interface Props {
  season?: ITeamSeason;
}

export default function SeasonTabs({ season }: Props) {
  const tabs: ITab[] = [
    { label: 'Stats', component: <MatchStats /> },
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
