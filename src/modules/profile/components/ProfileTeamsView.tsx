import { ApolloError } from '@apollo/client';

import { IMAGE_TYPE, TAB_TYPES } from '../../../constants';
import { DataError, ImageAvatar, SectionContainer } from '../../../components';
import { IListItem } from '../../../components/lists/types';
import LinksList from '../../../components/lists/links-list/LinksList';
import { CustomTabs, ITab } from '../../../components/tabs';
import { FETCH_TEAMS_BY_USER_QUERY } from '../types';

interface Props {
  loading: boolean;
  data?: FETCH_TEAMS_BY_USER_QUERY;
  error?: ApolloError;
}

export default function ProfileTeamsView({ data, loading, error }: Props) {
  const { teams } = data || {};
  const activeTeams = teams?.filter(team => team.isActive);
  const inactiveTeams = teams?.filter(team => !team.isActive);

  const activeLinks: IListItem[] = activeTeams
    ? activeTeams.map(team => {
        const { teamName, teamBadge, _id, orgId } = team;
        return {
          label: teamName,
          link: `/org/${orgId._id}/team/${_id}`,
          avatar: <ImageAvatar imageUrl={teamBadge?.url || ''} fallbackIcon={IMAGE_TYPE.TEAM} />,
        };
      })
    : [];

  const inactiveLinks: IListItem[] = inactiveTeams
    ? inactiveTeams.map(team => {
        const { teamName, _id, orgId } = team;
        return {
          label: teamName,
          link: `/org/${orgId._id}/team/${_id}`,
        };
      })
    : [];

  const tabs: ITab[] = [
    {
      label: 'Active',
      component: error ? (
        <DataError error={error} />
      ) : (
        <LinksList links={activeLinks} loading={loading} rows={5} />
      ),
    },
    {
      label: 'Previous',
      component: error ? (
        <DataError error={error} />
      ) : (
        <LinksList links={inactiveLinks} loading={loading} rows={5} />
      ),
    },
  ];

  return (
    <SectionContainer title="Teams">
      <CustomTabs type={TAB_TYPES.PROFILE_TEAMS} tabs={tabs} level="secondary" />
    </SectionContainer>
  );
}
