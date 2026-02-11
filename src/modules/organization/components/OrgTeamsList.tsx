import { SectionContainer } from '../../../components';
import { ImageAvatar } from '../../../components/avatars';
import { LinksList, type IListItem } from '../../../components/lists';
import { CustomTabs, ITab } from '../../../components/tabs';
import { IMAGE_TYPE, TAB_TYPES } from '../../../constants';
import { ITeam } from '../../team/types';

interface Props {
  teams: ITeam[];
}

export default function OrgTeamsList({ teams }: Props) {
  const activeTeams = teams.filter(team => team.isActive);
  const inactiveTeams = teams.filter(team => !team.isActive);

  const activeLinks: IListItem[] = activeTeams.map(team => {
    return {
      avatar: <ImageAvatar imageUrl={team.teamBadge?.url} fallbackIcon={IMAGE_TYPE.BADGE} />,
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
