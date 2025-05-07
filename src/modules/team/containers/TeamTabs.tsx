import React from 'react';
import { TAB_TYPES } from 'app/constants';
import { CustomTabs, ITab } from 'components/tabs';
import { ITeamResponse } from 'types';
import Kits from '../components/Kits';
// import Roles from '../components/Roles';
import Stadium from '../components/Stadium';

type Props = { team: ITeamResponse; loading: boolean };

const TeamTabs: React.FC<Props> = ({ team, loading }) => {
  const tabs: ITab[] = [
    { label: 'Kits', component: <Kits team={team} loading={loading} /> },
    { label: 'Stadium', component: <Stadium team={team} loading={loading} /> },
    // { label: 'Other', component: <Roles team={team} loading={loading} /> },
  ];
  return <CustomTabs type={TAB_TYPES.OVERVIEW} tabs={tabs} level="secondary" />;
};

export default TeamTabs;
