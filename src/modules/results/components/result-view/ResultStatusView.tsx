import { useTranslation } from 'react-i18next';
import { SectionContainer } from '../../../../components';
import { IListItem, TextList } from '../../../../components/lists';
import { RESULT_STATUS } from '../../constants';
import { T_FETCH_RESULT } from '../../graphql';
import ResultStatus from '../ResultStatus';

interface Props {
  result?: T_FETCH_RESULT['result'];
}

export default function ResultStatusView({ result }: Props) {
  const { t } = useTranslation('results');
  const { submittedByTeam, confirmedByTeam, resultStatus } = result || {};

  const status = result?.resultStatus as string;

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
      value: <ResultStatus resultStatus={resultStatus} display="text" />,
    },
  ];

  return (
    <SectionContainer title={t('HEADERS.STATUS')}>
      <TextList data={listItems} />
    </SectionContainer>
  );
}
