import { CustomButton, CustomTypography, NoDataText } from '../../../components';
import { CustomStack } from '../../../components/grids';
import TeamSearch from '../../home/forms/TeamSearch';
import { ORG_PATHS } from '../../organization/router';

interface Props {
  type: 'team' | 'organization';
}

export default function NoProfileItems({ type }: Props) {
  return (
    <CustomStack justify="center">
      <NoDataText>
        <CustomStack spacing={2} align="center" justify="center">
          <CustomTypography color="data" bold>
            {`No ${type}s yet!`}
          </CustomTypography>
          {type === 'team' && (
            <TeamSearch buttonElement={<CustomButton>Search Teams</CustomButton>} />
          )}
          {type === 'organization' && (
            <CustomButton link={ORG_PATHS.ADD} variant="contained" color="primary">
              Create Organization
            </CustomButton>
          )}
        </CustomStack>
      </NoDataText>
    </CustomStack>
  );
}
