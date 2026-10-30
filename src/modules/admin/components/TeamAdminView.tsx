import { CustomTypography, SectionContainer } from '../../../components';
import { IListItem } from '../../../components/lists';
import { T_FETCH_TEAM_ADMIN_VIEW } from '../graphql';
import AdminCode from './AdminCode';
import UsersList from './UsersList';

interface Props {
  team?: T_FETCH_TEAM_ADMIN_VIEW['team'];
}

export default function TeamAdminView({ team }: Props) {
  const { adminUsers, teamAdminAccessCode } = team || {};

  const adminUserList: IListItem[] =
    adminUsers?.map(user => ({
      label: user.username,
      value: user.email,
    })) || [];

  return (
    <SectionContainer>
      <CustomTypography bold size="lg" color="data">
        {team?.teamName}
      </CustomTypography>
      <AdminCode accessCode={teamAdminAccessCode} />
      <UsersList users={adminUserList} />
    </SectionContainer>
  );
}
