import { useTranslation } from 'react-i18next';
import { PageHeader } from '../components/composed';
import { CustomTypography } from '../components/typography';

export default function NotFound() {
  const { t } = useTranslation('components');
  return (
    <PageHeader title={t('PAGES.NOT_FOUND.TITLE')}>
      <CustomTypography color="warning">{t('PAGES.NOT_FOUND.MESSAGE')}</CustomTypography>
    </PageHeader>
  );
}
