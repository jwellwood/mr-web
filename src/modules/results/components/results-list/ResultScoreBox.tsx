import { CustomTypography } from '../../../../components';
import { RESULT_STATUS } from '../../constants';
import { isDateInPast } from '../../helpers/isDateInPast';

interface Props {
  resultStatus?: keyof typeof RESULT_STATUS | null;
  goals?: number;
  date?: string;
}

export default function ResultScoreBox({ resultStatus, goals, date }: Props) {
  const renderGoals = (goals: number | undefined) => {
    const display = resultStatus === RESULT_STATUS.PENDING || !date ? '-' : String(goals);
    return (
      <CustomTypography bold color="data">
        {display}
      </CustomTypography>
    );
  };

  const isPast = date ? isDateInPast(date) : false;

  return renderGoals(isPast ? goals : undefined);
}
