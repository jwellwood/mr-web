import { TAB_TYPES } from '../../../app/constants';
import ImageAvatar from '../../../components/avatars/image-avatar/ImageAvatar';
import { SectionContainer } from '../../../components/containers';
import LinksList from '../../../components/lists/LinksList';
import { IListItem } from '../../../components/lists/types';
import { CustomTabs, ITab } from '../../../components/tabs';
import { ITeam } from '../../team/types';

type Props = {
  teams: ITeam[];
};

export default function OrgTeamsList({ teams }: Props) {
  const activeTeams = teams.filter(team => team.isActive);
  const inactiveTeams = teams.filter(team => !team.isActive);

  const activeLinks: IListItem[] = activeTeams.map(team => {
    return {
      avatar: <ImageAvatar imageUrl={team.teamBadge?.url} fallbackIcon="team" />,
      label: team.teamName,
      link: `team/${team._id}`,
    };
  });

  const inactiveLinks: IListItem[] = inactiveTeams.map(team => {
    return {
      label: team.teamName,
      link: `team/${team._id}`,
    };
  });
  const tabs: ITab[] = [
    { label: 'Active', component: <LinksList links={activeLinks} /> },
    { label: 'Past', component: <LinksList links={inactiveLinks} /> },
  ];

  return (
    <SectionContainer title="Teams">
      <CustomTabs type={TAB_TYPES.ORG_TEAMS} tabs={tabs} level="secondary" />
    </SectionContainer>
  );
}
