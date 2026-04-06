import { CustomTypography } from '../../../components';
import { APP_ICONS, AppIcon, AppIconType } from '../../../components/icons';
import { RESULT_STATUS, ResultStatusType } from '../constants';

interface Props {
  resultStatus?: ResultStatusType | null;
  isComplete?: boolean;
  display?: 'icon' | 'text' | 'both';
}

export default function ResultStatus({ resultStatus, isComplete, display = 'both' }: Props) {
  const status = (resultStatus as ResultStatusType) || RESULT_STATUS.PENDING;

  const spec: { icon: AppIconType; color: string; label: string } =
    status === RESULT_STATUS.CONFIRMED || isComplete
      ? { icon: APP_ICONS.CONFIRMED, color: 'success', label: 'CONFIRMED' }
      : status === RESULT_STATUS.DISPUTED
        ? { icon: APP_ICONS.DISPUTED, color: 'error', label: 'DISPUTED' }
        : status === RESULT_STATUS.SUBMITTED
          ? { icon: APP_ICONS.SUBMITTED, color: 'info', label: 'SUBMITTED' }
          : { icon: APP_ICONS.PENDING, color: 'warning', label: 'PENDING' };

  if (display === 'icon') return <AppIcon icon={spec.icon} color={spec.color} />;

  if (display === 'text')
    return (
      <CustomTypography color={spec.color} bold>
        {spec.label || '-'}
      </CustomTypography>
    );

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <AppIcon icon={spec.icon} color={spec.color} />
      <CustomTypography color={spec.color} bold>
        {spec.label || '-'}
      </CustomTypography>
    </span>
  );
}
