import { IMAGE_TYPE, TAB_TYPES } from '../../../app/constants';
import LinksList from '../../../components/lists/LinksList';
import { CustomTabs, ITab } from '../../../components/tabs';
import { SectionContainer } from '../../../components';
import { ITeamResponse } from '../../team/types';
import { IListItem } from '../../../components/lists/types';
import ImageAvatar from '../../../components/avatars/image-avatar/ImageAvatar';

type Props = {
  teams: ITeamResponse[];
};

export default function ProfileTeamTabs({ teams }: Props) {
  const activeTeams = teams.filter(team => team.isActive);
  const inactiveTeams = teams.filter(team => !team.isActive);

  const activeLinks: IListItem[] = activeTeams.map(team => {
    const { teamName, teamBadge, _id, orgId } = team;
    return {
      label: teamName,
      link: `/org/${orgId?._id}/team/${_id}`,
      avatar: <ImageAvatar imageUrl={teamBadge?.url || ''} fallbackIcon={IMAGE_TYPE.TEAM} />,
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

  return (
    <SectionContainer title="Teams">
      <CustomTabs type={TAB_TYPES.PROFILE_TEAMS} tabs={tabs} level="secondary" />
    </SectionContainer>
  );
}
