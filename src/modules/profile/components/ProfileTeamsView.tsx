import { DataError, ImageAvatar, SectionContainer } from '../../../components';
import { LinksList, type IListItem } from '../../../components/lists';
import { CustomTabs, ITab } from '../../../components/tabs';
import { IMAGE_TYPE, TAB_TYPES } from '../../../constants';
import { TApolloError } from '../../../types/apollo';
import { FETCH_TEAMS_BY_USER_QUERY } from '../types';

interface Props {
  loading: boolean;
  data?: FETCH_TEAMS_BY_USER_QUERY;
  error?: TApolloError;
}

export default function ProfileTeamsView({ data, loading, error }: Props) {
  const { teams } = data || {};
  const activeTeams = teams?.filter(team => team.isActive);
  const inactiveTeams = teams?.filter(team => !team.isActive);
  const groupByOrg = (list?: typeof teams) => {
    const grouped = new Map<string, IListItem[]>();
    list?.forEach(team => {
      const orgName = team.orgId?.name || 'Unknown';
      const orgId = team.orgId?._id;
      const item: IListItem = {
        label: team.teamName,
        link: orgId ? `/org/${orgId}/team/${team._id}` : `/team/${team._id}`,
        avatar: (
          <ImageAvatar imageUrl={team.teamBadge?.url || ''} fallbackIcon={IMAGE_TYPE.BADGE} />
        ),
      };
      const arr = grouped.get(orgName) || [];
      arr.push(item);
      grouped.set(orgName, arr);
    });
    return Array.from(grouped.entries()); // [orgName, IListItem[]]
  };

  const activeGrouped = groupByOrg(activeTeams);
  const inactiveGrouped = groupByOrg(inactiveTeams);

  const tabs: ITab[] = [
    {
      label: 'Active',
      component: error ? (
        <DataError error={error} />
      ) : (
        <>
          {activeGrouped.map(([orgName, links]) => (
            <SectionContainer key={orgName} title={orgName}>
              <LinksList links={links} loading={loading} rows={5} />
            </SectionContainer>
          ))}
        </>
      ),
    },
    {
      label: 'Previous',
      component: error ? (
        <DataError error={error} />
      ) : (
        <>
          {inactiveGrouped.map(([orgName, links]) => (
            <SectionContainer key={orgName} title={orgName}>
              <LinksList links={links} loading={loading} rows={5} />
            </SectionContainer>
          ))}
        </>
      ),
    },
  ];

  return (
    <SectionContainer title="Teams">
      <CustomTabs type={TAB_TYPES.PROFILE_TEAMS} tabs={tabs} level="secondary" />
    </SectionContainer>
  );
}
