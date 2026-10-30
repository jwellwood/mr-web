import { useTranslation } from 'react-i18next';
import { CustomButton, CustomTypography, SectionContainer } from '../../../components';
import { CustomStack } from '../../../components/grids';
import { useCopy } from '../../../hooks/useCopy';
import GenerateAdminCode from '../containers/GenerateAdminCode';
import SetAdminAccessCode from '../containers/SetAdminAccessCode';

interface Props {
  type?: 'org' | 'team';
  accessCode?: string | null;
}

export default function AdminCode({ accessCode, type }: Props) {
  const { t } = useTranslation('admin');
  const { onCopy, copied } = useCopy(accessCode || '');
  return (
    <SectionContainer title={t('HEADERS.ADMIN_CODE')}>
      <SectionContainer>
        <CustomTypography color="label">{t('HELPERS.COPY_ADMIN_CODE')}</CustomTypography>
      </SectionContainer>
      <CustomStack>
        <CustomTypography color="data" bold size="lg">
          {accessCode || t('HELPERS.NOT_SET')}
        </CustomTypography>
        {accessCode && (
          <CustomButton color={!copied ? 'tertiary' : 'success'} onClick={onCopy}>
            {copied ? t('BUTTONS.COPIED') : t('BUTTONS.COPY')}
          </CustomButton>
        )}
        {!accessCode && <SetAdminAccessCode />}
        {type === 'org' && <GenerateAdminCode />}
      </CustomStack>
    </SectionContainer>
  );
}
