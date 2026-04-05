import { useTranslation } from 'react-i18next';
import { CustomButton } from '../../buttons';
import { CustomStack } from '../../grids';

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const current = (i18n.language || 'en').split('-')[0];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <CustomStack divider direction="row">
      <CustomButton
        variant={current === 'en' ? 'contained' : 'text'}
        onClick={() => changeLanguage('en')}
        aria-pressed={current === 'en'}
      >
        EN
      </CustomButton>
      <CustomButton
        variant={current === 'es' ? 'contained' : 'text'}
        onClick={() => changeLanguage('es')}
        aria-pressed={current === 'es'}
      >
        ES
      </CustomButton>
    </CustomStack>
  );
}
