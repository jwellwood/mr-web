import React from 'react';

import Kits from '../components/Kits';
import Stadium from '../components/Stadium';
import {CustomTabs, ITab} from '../../../components/tabs';
import {ITeamResponse} from "../../../types";
import {TAB_TYPES} from "../../../app/constants.ts";

type Props = { team?: ITeamResponse; loading: boolean };

const TeamTabs: React.FC<Props> = ({ team, loading }) => {
  const tabs: ITab[] = [
    { label: 'Kits', component: <Kits team={team} loading={loading} /> },
    { label: 'Stadium', component: <Stadium team={team} loading={loading} /> },
    // { label: 'Other', component: <Roles team={team} loading={loading} /> },
  ];
  return <CustomTabs type={TAB_TYPES.OVERVIEW} tabs={tabs} level="secondary" />;
};

export default TeamTabs;
