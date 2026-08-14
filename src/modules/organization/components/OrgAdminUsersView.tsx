import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation('organization');
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
        <SectionContainer title={t('ADMIN.CODE')}>
          <CustomStack>
            <CustomTypography color="data">
              {orgAdminAccessCode || t('ADMIN.NOT_SET')}
            </CustomTypography>
            {orgAdminAccessCode && (
              <CustomButton color={!copied ? 'tertiary' : 'success'} onClick={onCopy}>
                {copied ? t('BUTTONS.COPIED') : t('BUTTONS.COPY')}
              </CustomButton>
            )}
            <CustomTypography color="data">{t('ADMIN.SUMMARY')}</CustomTypography>
            <GenerateAdminCode />
            <ToggleAdminAccessEnabled data={{ enabled: orgAdminAccessEnabled || false }} />
          </CustomStack>
        </SectionContainer>
        <SectionContainer title={t('ADMIN.USERS.TITLE')}>
          <TextList data={adminUserList} />
        </SectionContainer>
      </SectionContainer>
    );
  };

  return loading ? <Spinner /> : renderContent();
}
