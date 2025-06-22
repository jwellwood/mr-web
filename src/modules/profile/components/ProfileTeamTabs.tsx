import React from 'react';
import { TAB_TYPES } from '../../../app/constants';
import LinksList from '../../../components/lists/LinksList';
import { CustomTabs, ITab } from '../../../components/tabs';
import { IListItem, ITeamResponse } from '../../../types';
import CustomAvatar from '../../../components/avatars/CustomAvatar';
type Props = {
  teams: ITeamResponse[];
};

const ProfileTeamTabs: React.FC<Props> = ({ teams }) => {
  const activeTeams = teams.filter(team => team.isActive);
  const inactiveTeams = teams.filter(team => !team.isActive);

  const activeLinks: IListItem[] = activeTeams.map(team => {
    const { teamName, teamBadge, _id, orgId } = team;
    return {
      label: teamName,
      link: `/org/${orgId?._id}/team/${_id}`,
      avatar: <CustomAvatar imageUrl={teamBadge?.url} />,
    };
  });

  const inactiveLinks: IListItem[] = inactiveTeams.map(team => {
    const { teamName, _id, orgId } = team;
    return {
      label: teamName,
      link: `/org/${orgId?._id}/team/${_id}`,
    };
  });
  const tabs: ITab[] = [
    { label: 'Active', component: <LinksList links={activeLinks} /> },
    { label: 'Previous', component: <LinksList links={inactiveLinks} /> },
  ];

  return <CustomTabs type={TAB_TYPES.PROFILE_TEAMS} tabs={tabs} level="secondary" />;
};

export default ProfileTeamTabs;
