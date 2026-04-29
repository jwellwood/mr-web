import { CustomTypography } from '../../../../components';
import { theme } from '../../../../theme';
import { RESULT_STATUS } from '../../constants';
import { isDateInPast } from '../../helpers/isDateInPast';

interface Props {
  resultStatus?: keyof typeof RESULT_STATUS | null;
  goals?: number;
  date?: string;
}

export default function ResultScoreBox({ resultStatus, goals, date }: Props) {
  const getBorderColor = (resultStatus: string | null | undefined): string | null => {
    const s = String(resultStatus ?? '').toLowerCase();
    if (s.includes('submit')) return theme.palette.info.main;
    if (s.includes('dispute')) return theme.palette.error.main;
    if (s.includes('pending') || !resultStatus) return theme.palette.warning.main;
    return null;
  };

  const renderGoals = (goals: number | undefined, borderColor: string | null) => {
    const display = resultStatus === RESULT_STATUS.PENDING || !date ? '-' : String(goals);
    if (!borderColor) {
      return (
        <CustomTypography bold color="data">
          {display}
        </CustomTypography>
      );
    }
    return (
      <span
        style={{
          border: `2px solid ${borderColor}`,
          borderRadius: 4,
          padding: '0 6px',
          display: 'inline-block',
        }}
      >
        <CustomTypography bold>{display}</CustomTypography>
      </span>
    );
  };

  const isPast = date ? isDateInPast(date) : false;
  const borderColor = isPast ? getBorderColor(resultStatus) : null;
  return renderGoals(isPast ? goals : undefined, borderColor);
}
