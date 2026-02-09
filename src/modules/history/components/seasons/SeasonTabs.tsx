import { lazy } from 'react';
import { CustomTabs, ITab } from '../../../../components/tabs';
import { TAB_TYPES } from '../../../../constants';
import { T_FETCH_SEASON } from '../../types';
import SeasonHeader from './SeasonHeader';

const Matches = lazy(() => import('../../../matches/containers/Matches'));
const Squad = lazy(() => import('../../../squad/containers/Squad'));
const MatchStatsSeason = lazy(() => import('../../../matches/containers/MatchStatsSeason'));
const Awards = lazy(() => import('../../containers/Awards'));

interface Props {
  season?: T_FETCH_SEASON['season'];
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
