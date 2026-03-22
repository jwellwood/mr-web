import { APP_ICONS, AppIcon } from '../../../components/icons';
import { RESULT_STATUS, ResultStatusType } from '../types';

interface Props {
  resultStatus: ResultStatusType;
}

export default function ResultStatus({ resultStatus }: Props) {
  if (resultStatus === RESULT_STATUS.CONFIRMED) {
    return <AppIcon icon={APP_ICONS.CONFIRMED} color="success" />;
  }
  if (resultStatus === RESULT_STATUS.DISPUTED) {
    return <AppIcon icon={APP_ICONS.DISPUTED} color="error" />;
  }
  if (resultStatus === RESULT_STATUS.SUBMITTED) {
    return <AppIcon icon={APP_ICONS.SUBMITTED} color="info" />;
  }
  return <AppIcon icon={APP_ICONS.PENDING} color="warning" />;
}
