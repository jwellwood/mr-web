import { form_error_text } from '../../../i18n';
import { CustomTypography } from '../../typography';
import { TypedFormError } from '../types';

interface Props {
  error: TypedFormError;
}

export default function FormErrorMessage({ error }: Props) {
  const message = error?.message || form_error_text.default;

  return (
    <CustomTypography size="xs" color="error">
      {message}
    </CustomTypography>
  );
}
