import { CustomTypography, SectionContainer } from '../../../../../components';
import { FETCH_TEAM_QUERY } from '../../../../team/types';

interface Props {
  team?: FETCH_TEAM_QUERY['team'];
}

export default function TeamAdminView({ team }: Props) {
  return (
    <SectionContainer>
      <CustomTypography bold size="lg" color="data">
        {team?.teamName}
      </CustomTypography>
      <SectionContainer subtitle="Admin Code">
        <CustomTypography color="data">xxxxxx</CustomTypography>
      </SectionContainer>
      <SectionContainer subtitle="Admin Users">
        <CustomTypography color="data">John Doe</CustomTypography>
      </SectionContainer>
    </SectionContainer>
  );
}
