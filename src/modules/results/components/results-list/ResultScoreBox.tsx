import { CustomTypography } from '../../../../components';
import { RESULT_STATUS } from '../../constants';

interface Props {
  resultStatus?: keyof typeof RESULT_STATUS | null;
  goals?: number;
}

export default function ResultScoreBox({ resultStatus, goals }: Props) {
  const renderGoals = (goals: number | undefined) => {
    const display =
      resultStatus === RESULT_STATUS.PENDING || goals === undefined ? '-' : String(goals);
    return (
      <CustomTypography bold color="data">
        {display}
      </CustomTypography>
    );
  };

  return renderGoals(goals);
}
