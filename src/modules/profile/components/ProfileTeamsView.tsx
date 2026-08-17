import { useTranslation } from 'react-i18next';
import { DataError, ImageAvatar, NoDataText, SectionContainer } from '../../../components';
import { LinksList, type IListItem } from '../../../components/lists';
import { CustomTabs, ITab } from '../../../components/tabs';
import { IMAGE_TYPE, TAB_TYPES } from '../../../constants';
import { TApolloError } from '../../../types/apollo';
import { T_FETCH_TEAMS_BY_USER_QUERY } from '../graphql';
import EntityListWrapper from './EntityListWrapper';

interface Props {
  loading: boolean;
  data?: T_FETCH_TEAMS_BY_USER_QUERY;
  error?: TApolloError;
}

export default function ProfileTeamsView({ data, loading, error }: Props) {
  const { t } = useTranslation('profile');
  const { teams } = data || {};

  const activeTeams = teams?.filter(team => team.isActive);
  const inactiveTeams = teams?.filter(team => !team.isActive);

  const groupByOrg = (list?: typeof teams) => {
    const teamsByOrg = new Map<string, IListItem[]>();
    list?.forEach(team => {
      const orgName = team.orgId?.name || t('LABELS.UNKNOWN');
      const orgId = team.orgId?._id;
      const item: IListItem = {
        label: team.teamName,
        link: orgId ? `/org/${orgId}/team/${team._id}` : `/team/${team._id}`,
        avatar: (
          <ImageAvatar imageUrl={team.teamBadge?.url || ''} fallbackIcon={IMAGE_TYPE.BADGE} />
        ),
      };
      const arr = teamsByOrg.get(orgName) || [];
      arr.push(item);
      teamsByOrg.set(orgName, arr);
    });
    return Array.from(teamsByOrg.entries()); // [orgName, IListItem[]]
  };

  const activeGrouped = groupByOrg(activeTeams);
  const inactiveGrouped = groupByOrg(inactiveTeams);

  const compElement = (error: TApolloError | undefined, items: [string, IListItem[]][]) =>
    error ? (
      <DataError error={error} />
    ) : (
      <>
        {items.length ? (
          items.map(([orgName, links]) => (
            <SectionContainer key={orgName} subtitle={orgName}>
              <LinksList links={links} loading={loading} rows={5} />
            </SectionContainer>
          ))
        ) : (
          <NoDataText>{t('NO_RESULTS.TEAM.TITLE')}</NoDataText>
        )}
      </>
    );

  const ActiveTeams = compElement(error, activeGrouped);
  const InactiveTeams = compElement(error, inactiveGrouped);

  const tabs: ITab[] = [
    {
      label: t('TABS.ACTIVE'),
      component: ActiveTeams,
    },
    {
      label: t('TABS.INACTIVE'),
      component: InactiveTeams,
    },
  ];

  const renderContent = () => {
    if (!activeGrouped.length && !inactiveGrouped.length) {
      return <NoDataText>{t('NO_RESULTS.TEAM.TITLE')}</NoDataText>;
    }
    if (activeGrouped.length && !inactiveGrouped.length) {
      return ActiveTeams;
    }

    return <CustomTabs type={TAB_TYPES.PROFILE_TEAMS} tabs={tabs} level="secondary" />;
  };

  return (
    <EntityListWrapper type="team" error={error} loading={loading}>
      {renderContent()}
    </EntityListWrapper>
  );
}
