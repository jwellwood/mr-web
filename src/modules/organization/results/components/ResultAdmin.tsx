import { SectionContainer, CustomButton } from '../../../../components';
import { IListItem, TextList } from '../../../../components/lists';
import { useAuth } from '../../../../hooks';
import ConfirmResult from '../forms/confirm-result/ConfirmResult';
import SubmitResult from '../forms/submit-result/SubmitResult';
import { T_FETCH_RESULT } from '../graphql';
import { RESULT_STATUS } from '../types';

interface Props {
  result?: T_FETCH_RESULT['result'];
}

export default function ResultAdmin({ result }: Props) {
  const { submittedByTeam, confirmedByTeam, isComplete, homeTeam, awayTeam } = result || {};

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

  const listItems: IListItem[] = [
    {
      label: 'Submitted By',
      secondary: submittedByTeam ? submittedByTeam.teamName : 'N/A',
      value: showSubmit ? (
        <SubmitResult homeTeamName={homeTeam?.teamName} awayTeamName={awayTeam?.teamName} />
      ) : (
        ''
      ),
    },
    {
      label: 'Confirmed By',
      secondary: confirmedByTeam ? confirmedByTeam.teamName : 'N/A',
      value: showConfirm ? <ConfirmResult /> : '',
    },
    {
      label: 'Is Complete',
      secondary: isComplete ? 'Yes' : 'No',
      value: showAddGoalscorers ? (
        <CustomButton variant="outlined">Add Goalscorers</CustomButton>
      ) : (
        ''
      ),
    },
  ];

  return (
    <SectionContainer title="Admin">
      <TextList data={listItems} />
    </SectionContainer>
  );
}
