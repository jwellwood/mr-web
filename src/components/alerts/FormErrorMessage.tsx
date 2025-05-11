import { CustomTypography } from '../typography';
import {form_error_text} from "../../i18n";
import { type FormError } from '../../types/form';

interface Props {
  error: FormError
}

function FormErrorMessage({ error }: Props) {
  console.log("FormErrorMessage")
  let message = form_error_text.default;
  const errType = typeof error === "string" ? error : "type" in error ? error.type : "";
  switch (errType) {
    case 'required':
      message = form_error_text.required;
      break;
    case 'minLength':
      message = form_error_text.short;
      break;
    case 'maxLength':
      message = form_error_text.long;
      break;
    case 'max':
      message = form_error_text.high;
      break;
    case 'min':
      message = form_error_text.low;
      break;
    case 'pattern':
      message = form_error_text.pattern;
      break;
    case 'validate':
      message = form_error_text.validate;
      break;
    default:
      break;
  }
  return (
    // <CustomTypography size="xs" color="error" role="alert">
      {message}
    // </CustomTypography>
  );
};

export default FormErrorMessage;
