import { CustomTypography, DataError, SectionContainer } from '../../../components';
import { IListItem } from '../../../components/lists';
import { Spinner } from '../../../components/loaders';
import { TApolloError } from '../../../types/apollo';
import ToggleAdminAccessEnabled from '../containers/ToggleAdminAccessEnabled';
import { T_FETCH_ORG_ADMIN_VIEW } from '../graphql';
import AdminCode from './AdminCode';
import UsersList from './UsersList';

interface Props {
  org?: T_FETCH_ORG_ADMIN_VIEW['org'];
  loading: boolean;
  error?: TApolloError;
}

export default function OrgAdminView({ org, loading, error }: Props) {
  const { adminUsers, orgAdminAccessCode, orgAdminAccessEnabled } = org || {};

  const adminUserList: IListItem[] =
    adminUsers?.map(user => ({
      label: user.username,
      value: user.email,
    })) || [];

  const renderContent = () => {
    if (error) {
      return <DataError error={error} />;
    }
    return (
      <SectionContainer>
        <CustomTypography bold size="lg" color="data">
          {org?.orgName}
        </CustomTypography>
        <ToggleAdminAccessEnabled data={{ enabled: orgAdminAccessEnabled || false }} />
        {orgAdminAccessEnabled && <AdminCode accessCode={orgAdminAccessCode} />}
        <UsersList users={adminUserList} />
      </SectionContainer>
    );
  };

  return loading ? <Spinner /> : renderContent();
}
