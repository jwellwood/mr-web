import { useTranslation } from 'react-i18next';
import { CustomButton, CustomTypography, NoDataText } from '../../../components';
import { CustomStack } from '../../../components/grids';
import TeamSearch from '../../home/containers/TeamSearch';
import { ORG_PATHS } from '../../organization/router';

interface Props {
  type: 'team' | 'organization';
}

export default function NoProfileItems({ type }: Props) {
  const { t } = useTranslation('profile');
  return (
    <CustomStack justify="center">
      <NoDataText>
        <CustomStack spacing={2} align="center" justify="center">
          <CustomTypography color="data" bold>
            {type === 'team' ? t('NO_RESULTS.TEAM.TITLE') : t('NO_RESULTS.ORGANIZATION.TITLE')}
          </CustomTypography>
          {type === 'team' && (
            <TeamSearch
              buttonElement={<CustomButton>{t('NO_RESULTS.TEAM.FIND_TEAM')}</CustomButton>}
            />
          )}
          {type === 'organization' && (
            <CustomButton link={ORG_PATHS.ADD} variant="contained" color="primary">
              {t('NO_RESULTS.ORGANIZATION.CREATE_ORG')}
            </CustomButton>
          )}
        </CustomStack>
      </NoDataText>
    </CustomStack>
  );
}
