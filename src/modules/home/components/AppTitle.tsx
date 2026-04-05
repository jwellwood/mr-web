import { useTranslation } from 'react-i18next';
import CustomStack from '../../../components/grids/custom-stack/CustomStack';
import { AppTitleText, CustomTypography } from '../../../components/typography';

export default function AppTitle() {
  const { t } = useTranslation('home');
  return (
    <div style={{ textAlign: 'center', marginTop: '200px' }}>
      <CustomStack>
        <AppTitleText>Footy</AppTitleText>
        <AppTitleText color="primary">Stats</AppTitleText>

        <CustomTypography color="data" size="md">
          {t('SUBTITLE')}
        </CustomTypography>
      </CustomStack>
    </div>
  );
}
