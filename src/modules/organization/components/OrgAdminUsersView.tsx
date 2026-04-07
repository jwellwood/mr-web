import { CustomButton, CustomTypography, DataError, SectionContainer } from '../../../components';
import { CustomStack } from '../../../components/grids';
import { IListItem, TextList } from '../../../components/lists';
import { Spinner } from '../../../components/loaders';
import { useCopy } from '../../../hooks/useCopy';
import { TApolloError } from '../../../types/apollo';
import GenerateAdminCode from '../containers/GenerateAdminCode';
import ToggleAdminAccessEnabled from '../containers/ToggleAdminAccessEnabled';
import { T_FETCH_ORG_ADMIN_VIEW } from '../graphql';

interface Props {
  org?: T_FETCH_ORG_ADMIN_VIEW['org'];
  loading: boolean;
  error?: TApolloError;
}

export default function OrgAdminUsersView({ org, loading, error }: Props) {
  const { adminUsers, orgAdminAccessCode, orgAdminAccessEnabled } = org || {};
  const { onCopy, copied } = useCopy(orgAdminAccessCode || '');

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
        <SectionContainer title="Admin Code">
          <CustomStack>
            <CustomTypography color="data">{orgAdminAccessCode || 'Not set'}</CustomTypography>
            {orgAdminAccessCode && (
              <CustomButton color={!copied ? 'tertiary' : 'success'} onClick={onCopy}>
                {copied ? 'Copied' : 'Copy code'}
              </CustomButton>
            )}
            <CustomTypography color="data">
              * The code will only work once. Once it is used, it will no longer be valid and a new
              one will be automatically generated. If you generate a new code, the old code will
              stop working.
            </CustomTypography>
            <GenerateAdminCode />
            <ToggleAdminAccessEnabled data={{ enabled: orgAdminAccessEnabled || false }} />
          </CustomStack>
        </SectionContainer>
        <SectionContainer title="Admin Users">
          <TextList data={adminUserList} />
        </SectionContainer>
      </SectionContainer>
    );
  };

  return loading ? <Spinner /> : renderContent();
}
