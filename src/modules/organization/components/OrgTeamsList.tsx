import { TAB_TYPES } from '../../../app/constants';
import LinksList from '../../../components/lists/LinksList';
import { CustomTabs, ITab } from '../../../components/tabs';
import { IListItem } from '../../../types';
import { ITeam } from '../../team/types';

type Props = {
  teams: ITeam[];
};

export default function OrgTeamsList({ teams }: Props) {
  const activeTeams = teams.filter(team => team.isActive);
  const inactiveTeams = teams.filter(team => !team.isActive);

  const activeLinks: IListItem[] = activeTeams.map(team => {
    return {
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
    { label: 'Previous', component: <LinksList links={inactiveLinks} /> },
  ];

  return <CustomTabs type={TAB_TYPES.ORG_TEAMS} tabs={tabs} level="secondary" />;
}
