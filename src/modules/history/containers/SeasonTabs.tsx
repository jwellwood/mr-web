import React from 'react';
import { TAB_TYPES } from '../../../app/constants';
import { CustomTabs, ITab } from '../../../components/tabs';
import Matches from 'modules/matches/containers/Matches';
import MatchStats from 'modules/matches/containers/MatchStats';
import Squad from 'modules/players/containers/Squad';
import SeasonHeader from '../components/SeasonHeader';
import { ITeamSeason } from '../types';
import Awards from './Awards';

interface Props {
  season: ITeamSeason;
}

const SeasonTabs: React.FC<Props> = ({ season }) => {
  const tabs: ITab[] = [
    { label: 'Stats', component: <MatchStats /> },
    { label: 'Matches', component: <Matches /> },
    { label: 'Squad', component: <Squad /> },
    { label: 'Awards', component: <Awards /> },
  ];

  return (
    <SeasonHeader title={season.name} position={season.leaguePosition}>
      <CustomTabs type={TAB_TYPES.SEASON} tabs={tabs} level="secondary" />
    </SeasonHeader>
  );
};

export default SeasonTabs;
