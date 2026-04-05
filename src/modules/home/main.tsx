import { useTranslation } from 'react-i18next';
import { CustomButton, PageContainer } from '../../components';
import CustomStack from '../../components/grids/custom-stack/CustomStack';
import AppTitle from './components/AppTitle';
import OrgSearch from './containers/OrgSearch';
import TeamSearch from './containers/TeamSearch';

export default function HomeContainer() {
  const { t } = useTranslation('home');
  const buttonElement = (type: 'team' | 'org') => (
    <CustomButton variant={type === 'team' ? 'contained' : 'outlined'} color="primary">
      {type === 'team' ? t('SEARCH.TEAM') : t('SEARCH.ORG')}
    </CustomButton>
  );

  return (
    <PageContainer title={''} backButton={false}>
      <CustomStack>
        <AppTitle />
        <TeamSearch buttonElement={buttonElement('team')} />
        <OrgSearch buttonElement={buttonElement('org')} />
      </CustomStack>
    </PageContainer>
  );
}
