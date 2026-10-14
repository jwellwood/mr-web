import { useTranslation } from 'react-i18next';
import { CustomTypography, SectionContainer } from '../../../../components';
import { IListItem, TextList } from '../../../../components/lists';
import { parseTimestamp } from '../../../../utils/dates/parseTimestamp';
import AddGoalscorers from '../../../goalscorers/containers/AddGoalscorers';
import { RESULT_STATUS } from '../../constants';
import ConfirmResult from '../../containers/ConfirmResult';
import SubmitResult from '../../containers/SubmitResult';
import { T_FETCH_RESULT } from '../../graphql';
import { useResultAdmin } from '../../hooks/useResultAdmin';

interface Props {
  result?: T_FETCH_RESULT['result'];
}

export default function ResultAdmin({ result }: Props) {
  const { t } = useTranslation('results');
  const {
    submittedByTeam,
    confirmedByTeam,
    homeTeam,
    awayTeam,
    resultStatus,
    homeGoals,
    awayGoals,
    homeGoalscorers,
    awayGoalscorers,
    createdBy,
    createdAt,
    updatedBy,
    updatedAt,
  } = result || {};

  const { isAdminToEither, isHomeTeamAdmin, isAwayTeamAdmin, isOrgAuth } = useResultAdmin(
    homeTeam?._id,
    awayTeam?._id
  );

  const isConfirmingTeamAdmin = () => {
    if (resultStatus === RESULT_STATUS.SUBMITTED) {
      if (submittedByTeam?._id === homeTeam?._id) {
        return isAwayTeamAdmin;
      } else if (submittedByTeam?._id === awayTeam?._id) {
        return isHomeTeamAdmin;
      }
    }
    return false;
  };
  const showSubmit = isAdminToEither && (resultStatus === RESULT_STATUS.PENDING || !resultStatus);
  const showConfirm =
    (isConfirmingTeamAdmin() && resultStatus === RESULT_STATUS.SUBMITTED) ||
    (isOrgAuth && resultStatus === RESULT_STATUS.DISPUTED);
  const showAddGoalscorers =
    isAdminToEither &&
    (resultStatus === RESULT_STATUS.SUBMITTED || resultStatus === RESULT_STATUS.CONFIRMED);

  const showHomeAddGoalscorers =
    (showAddGoalscorers && isHomeTeamAdmin && homeGoals) ||
    (isOrgAuth && showAddGoalscorers && homeGoals);
  const showAwayAddGoalscorers =
    (showAddGoalscorers && isAwayTeamAdmin && awayGoals) ||
    (isOrgAuth && showAddGoalscorers && awayGoals);

  const getSecondTeamActionLabel = () => {
    if (resultStatus === RESULT_STATUS.DISPUTED) {
      return t('ADMIN.DISPUTED_BY');
    } else {
      return t('ADMIN.CONFIRMED_BY');
    }
  };

  const userName = (userName: string) => (
    <CustomTypography bold color="data">
      {userName}
    </CustomTypography>
  );

  const statusItems: IListItem[] = [
    {
      label: t('ADMIN.SUBMITTED_BY'),
      value: userName(submittedByTeam?.admin?.username || '-'),
      secondary: (
        <>{submittedByTeam?.timestamp ? parseTimestamp(String(submittedByTeam?.timestamp)) : '-'}</>
      ),
    },
    {
      label: getSecondTeamActionLabel(),
      value: userName(confirmedByTeam?.admin?.username || '-'),
      secondary: (
        <>{confirmedByTeam?.timestamp ? parseTimestamp(String(confirmedByTeam?.timestamp)) : '-'}</>
      ),
    },
  ];

  const listItems: IListItem[] = [
    {
      label: t('ADMIN.CREATED_BY'),
      value: userName(createdBy?.username || '-'),
      secondary: <>{createdAt ? parseTimestamp(String(createdAt)) : '-'}</>,
    },
    {
      label: t('ADMIN.LAST_UPDATED'),
      value: userName(updatedBy?.username || '-'),
      secondary: <>{updatedAt ? parseTimestamp(String(updatedAt)) : '-'}</>,
    },
  ];

  return (
    <SectionContainer title={t('ADMIN.TITLE')}>
      <SectionContainer>
        <TextList data={statusItems} />
      </SectionContainer>
      {isOrgAuth && (
        <SectionContainer>
          <TextList data={listItems} />
        </SectionContainer>
      )}
      {showSubmit && (
        <SubmitResult
          homeTeamName={homeTeam?.teamName}
          awayTeamName={awayTeam?.teamName}
          homeGoals={homeGoals!}
          awayGoals={awayGoals!}
        />
      )}
      {showConfirm && <ConfirmResult />}
      {showHomeAddGoalscorers ? (
        <AddGoalscorers
          side="HOME"
          teamId={homeTeam?._id}
          teamName={homeTeam?.teamName}
          teamGoals={homeGoals}
          currentGoalscorers={homeGoalscorers}
        />
      ) : null}
      {showAwayAddGoalscorers ? (
        <AddGoalscorers
          side="AWAY"
          teamId={awayTeam?._id}
          teamName={awayTeam?.teamName}
          teamGoals={awayGoals}
          currentGoalscorers={awayGoalscorers}
        />
      ) : null}
    </SectionContainer>
  );
}
