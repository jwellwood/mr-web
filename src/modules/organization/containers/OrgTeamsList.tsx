import { NoDataText, SectionContainer } from '../../../components';
import { ImageAvatar } from '../../../components/avatars';
import { LinksList, type IListItem } from '../../../components/lists';
import { CustomTabs, ITab } from '../../../components/tabs';
import { IMAGE_TYPE, TAB_TYPES } from '../../../constants';
import KitDisplay from '../components/KitDisplay';
import { T_FETCH_ORG_TEAMS } from '../graphql';

interface Props {
  teams: T_FETCH_ORG_TEAMS['teams'];
}

export default function OrgTeamsList({ teams }: Props) {
  const activeTeams = teams.filter(team => team.isActive);
  const inactiveTeams = teams.filter(team => !team.isActive);

  const activeLinks: IListItem[] = activeTeams.map(team => {
    return {
      avatar: <ImageAvatar imageUrl={team.teamBadge?.url} fallbackIcon={IMAGE_TYPE.BADGE} />,
      label: team.teamName,
      link: `team/${team._id}`,
      value: <KitDisplay team={team} />,
    };
  });

  const inactiveLinks: IListItem[] = inactiveTeams.map(team => {
    return {
      label: team.teamName,
      link: `team/${team._id}`,
    };
  });
  const tabs: ITab[] = [
    {
      label: 'Active',
      component: activeLinks.length ? (
        <LinksList links={activeLinks} />
      ) : (
        <NoDataText>No active teams</NoDataText>
      ),
    },
    {
      label: 'Inactive',
      component: inactiveLinks.length ? (
        <LinksList links={inactiveLinks} />
      ) : (
        <NoDataText>No inactive teams</NoDataText>
      ),
    },
  ];

  return (
    <SectionContainer>
      <CustomTabs type={TAB_TYPES.ORG_TEAMS} tabs={tabs} level="secondary" />
    </SectionContainer>
  );
}
