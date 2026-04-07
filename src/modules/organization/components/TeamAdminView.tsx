import { CustomButton, CustomTypography, SectionContainer } from '../../../components';
import { CustomStack } from '../../../components/grids';
import { IListItem, TextList } from '../../../components/lists';
import { useCopy } from '../../../hooks/useCopy';
import SetAdminAccessCode from '../containers/SetAdminAccessCode';
import { T_FETCH_TEAM_ADMIN_VIEW } from '../graphql';

interface Props {
  team?: T_FETCH_TEAM_ADMIN_VIEW['team'];
}

export default function TeamAdminView({ team }: Props) {
  const { adminUsers, teamAdminAccessCode } = team || {};
  const { onCopy, copied } = useCopy(teamAdminAccessCode || '');

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
      <SectionContainer title="Admin Code">
        <CustomStack>
          <CustomTypography color="data">{teamAdminAccessCode || 'Not set'}</CustomTypography>
          {teamAdminAccessCode && (
            <CustomButton color={!copied ? 'tertiary' : 'success'} onClick={onCopy}>
              {copied ? 'Copied' : 'Copy code'}
            </CustomButton>
          )}
          {!teamAdminAccessCode && <SetAdminAccessCode />}
        </CustomStack>
      </SectionContainer>
      <SectionContainer title="Admin Users">
        <TextList data={adminUserList} />
      </SectionContainer>
    </SectionContainer>
  );
}
