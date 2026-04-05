import { useTranslation } from 'react-i18next';
import { CustomTypography } from '../../typography';
import { TypedFormError } from '../types';

interface Props {
  error: TypedFormError;
}

export default function FormErrorMessage({ error }: Props) {
  const { t } = useTranslation('inputs');
  const message = error?.message || t(`VALIDATION.${error?.type || 'default'}`, error?.meta || {});

  return (
    <CustomTypography size="xs" color="error">
      {message}
    </CustomTypography>
  );
}
