import { useTranslation } from 'react-i18next';
import { SectionContainer } from '../../../components';
import { IListItem, TextList } from '../../../components/lists';
import { useAuth, useCustomParams } from '../../../hooks';
import { RESULT_STATUS } from '../constants';
import AddGoalscorers from '../containers/AddGoalscorers';
import ConfirmResult from '../containers/ConfirmResult';
import SubmitResult from '../containers/SubmitResult';
import { T_FETCH_RESULT } from '../graphql';
import ResultStatus from './ResultStatus';

interface Props {
  result?: T_FETCH_RESULT['result'];
}

export default function ResultAdmin({ result }: Props) {
  const { orgId } = useCustomParams();
  const { t } = useTranslation('results');
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
  const { isOrgAuth } = useAuth('', orgId);
  const isAdminToEither = Boolean(isHomeTeamAdmin || isAwayTeamAdmin || isOrgAuth);

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
      return t('ADMIN.DISPUTED_BY');
    } else {
      return t('ADMIN.CONFIRMED_BY');
    }
  };

  const submissionTeamName =
    resultStatus === RESULT_STATUS.CONFIRMED && !submittedByTeam?.teamName
      ? 'Admin'
      : submittedByTeam?.teamName || '-';
  const confirmationTeamName =
    resultStatus === RESULT_STATUS.CONFIRMED && !confirmedByTeam?.teamName
      ? 'Admin'
      : confirmedByTeam?.teamName || '-';

  const listItems: IListItem[] = [
    {
      label: t('ADMIN.SUBMITTED_BY'),
      value: submissionTeamName,
    },
    {
      label: getSecondTeamActionLabel(),
      value: confirmationTeamName,
    },
    {
      label: t('ADMIN.STATUS'),
      value: <ResultStatus resultStatus={resultStatus} isComplete={!!isComplete} display="text" />,
    },
  ];

  return (
    <SectionContainer title={t('ADMIN.TITLE')}>
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
      {showAddGoalscorers && isHomeTeamAdmin && (
        <AddGoalscorers
          side="HOME"
          teamId={homeTeam?._id}
          teamName={homeTeam?.teamName}
          teamGoals={homeGoals}
        />
      )}
      {showAddGoalscorers && isAwayTeamAdmin && (
        <AddGoalscorers
          side="AWAY"
          teamId={awayTeam?._id}
          teamName={awayTeam?.teamName}
          teamGoals={awayGoals}
        />
      )}
      {showAddGoalscorers && isOrgAuth && !isHomeTeamAdmin && !isAwayTeamAdmin && (
        <>
          <AddGoalscorers
            side="HOME"
            teamId={homeTeam?._id}
            teamName={homeTeam?.teamName}
            teamGoals={homeGoals}
          />
          <AddGoalscorers
            side="AWAY"
            teamId={awayTeam?._id}
            teamName={awayTeam?.teamName}
            teamGoals={awayGoals}
          />
        </>
      )}
    </SectionContainer>
  );
}
