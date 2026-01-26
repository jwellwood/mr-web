import { CustomTypography } from '../../../components/typography';
import { parseDate } from '../../../utils/helpers';
import { PresentationModal } from '../../../components/modals';
import { CustomButton } from '../../../components/buttons';
import LinksList from '../../../components/lists/links-list/LinksList';
import { IListItem } from '../../../components/lists/types';
import { ApolloError } from '@apollo/client';
import { DataError } from '../../../components';
import {
  FETCH_SQUAD_RECORD_ASSISTS_IN_MATCH_QUERY,
  FETCH_SQUAD_RECORD_GOALS_IN_MATCH_QUERY,
} from '../types';

type MostInMatchItem =
  | FETCH_SQUAD_RECORD_GOALS_IN_MATCH_QUERY['stats'][number]
  | FETCH_SQUAD_RECORD_ASSISTS_IN_MATCH_QUERY['stats'][number];

interface Props {
  data?: MostInMatchItem[];
  loading: boolean;
  orgId?: string;
  teamId?: string;
  title?: string;
  error?: ApolloError;
}

export default function PlayerRecordsMatchesModal({
  data,
  loading,
  orgId,
  teamId,
  title,
  error,
}: Props) {
  const listData: IListItem[] =
    data?.map(item => {
      const labelColor =
        item.teamGoals > item.opponentGoals
          ? 'primary'
          : item.teamGoals === item.opponentGoals
            ? 'warning'
            : 'error';
      return {
        label: (
          <CustomTypography bold color="data">
            {item.opponentName}
          </CustomTypography>
        ),
        secondary: (
          <CustomTypography color="label" size="xs">
            <CustomTypography color={labelColor} size="xs" bold>
              {item.teamGoals}-{item.opponentGoals}
            </CustomTypography>{' '}
            | {parseDate(item.date)}
          </CustomTypography>
        ),
        link: `/org/${orgId}/team/${teamId}/match/${item.matchId}`,
      };
    }) || [];

  return (
    <PresentationModal
      title={`Most ${title}`}
      buttonElement={
        <CustomButton variant="text">
          <CustomTypography bold color="primary" size="xs">
            Matches
          </CustomTypography>
        </CustomButton>
      }
    >
      {!error ? <LinksList links={listData} loading={loading} /> : <DataError error={error} />}
    </PresentationModal>
  );
}
