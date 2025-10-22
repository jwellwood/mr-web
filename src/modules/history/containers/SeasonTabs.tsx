import React from 'react';
import { TAB_TYPES } from '../../../app/constants';
import { CustomTabs, ITab } from '../../../components/tabs';
import SeasonHeader from '../components/SeasonHeader';
import { ITeamSeason } from '../types';
import Awards from './Awards';
import MatchStats from '../../matches/containers/MatchStats.tsx';
import { Matches } from '../../matches/routes.ts';
import { Squad } from '../../squad/routes.ts';

interface Props {
  season?: ITeamSeason;
}

const SeasonTabs: React.FC<Props> = ({ season }) => {
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
};

export default SeasonTabs;
