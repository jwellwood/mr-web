import { CustomButton, SectionContainer } from '../../../components';
import { IListItem, TextList } from '../../../components/lists';
import { useAuth } from '../../../hooks';
import ResultStatus from '../components/ResultStatus';
import { RESULT_STATUS } from '../constants';
import ConfirmResult from '../forms/confirm-result/ConfirmResult';
import SubmitResult from '../forms/submit-result/SubmitResult';
import { T_FETCH_RESULT } from '../graphql';

interface Props {
  result?: T_FETCH_RESULT['result'];
}

export default function ResultAdmin({ result }: Props) {
  const {
    submittedByTeam,
    confirmedByTeam,
    isComplete,
    homeTeam,
    awayTeam,
    resultStatus,
    homeGoals,
    awayGoals,
  } = result || {};

  const { isTeamAuth: isHomeTeamAdmin } = useAuth(homeTeam?._id);
  const { isTeamAuth: isAwayTeamAdmin } = useAuth(awayTeam?._id);

  const isAdminToEither = Boolean(isHomeTeamAdmin || isAwayTeamAdmin);

  const status = result?.resultStatus as string;

  const isConfirmingTeamAdmin = () => {
    if (status === RESULT_STATUS.SUBMITTED) {
      if (submittedByTeam?._id === homeTeam?._id) {
        return isAwayTeamAdmin;
      } else if (submittedByTeam?._id === awayTeam?._id) {
        return isHomeTeamAdmin;
      }
    }
    return false;
  };
  const showSubmit = isAdminToEither && (status === RESULT_STATUS.PENDING || !status);
  const showConfirm = isConfirmingTeamAdmin() && status === RESULT_STATUS.SUBMITTED;
  const showAddGoalscorers =
    isAdminToEither && (status === RESULT_STATUS.SUBMITTED || status === RESULT_STATUS.CONFIRMED);

  const getSecondTeamActionLabel = () => {
    if (status === RESULT_STATUS.DISPUTED) {
      return 'Disputed By';
    } else {
      return 'Confirmed By';
    }
  };

  const listItems: IListItem[] = [
    {
      label: 'Submitted By',
      value: submittedByTeam ? submittedByTeam.teamName : '-',
    },
    {
      label: getSecondTeamActionLabel(),
      value: confirmedByTeam ? confirmedByTeam.teamName : '-',
    },
    {
      label: 'Status',
      value: <ResultStatus resultStatus={resultStatus} isComplete={!!isComplete} display="text" />,
    },
  ];

  return (
    <SectionContainer title="Admin">
      <TextList data={listItems} />
      {showSubmit && (
        <SubmitResult
          homeTeamName={homeTeam?.teamName}
          awayTeamName={awayTeam?.teamName}
          homeGoals={homeGoals}
          awayGoals={awayGoals}
        />
      )}
      {showConfirm && <ConfirmResult />}
      {showAddGoalscorers && <CustomButton>Add Goalscorers</CustomButton>}
    </SectionContainer>
  );
}
