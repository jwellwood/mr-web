import { ApolloError } from '@apollo/client';
import { DataError } from '../../../../../components';
import { CustomButton } from '../../../../../components/buttons';
import LinksList from '../../../../../components/lists/links-list/LinksList';
import { IListItem } from '../../../../../components/lists/types';
import { PresentationModal } from '../../../../../components/modals';
import { CustomTypography } from '../../../../../components/typography';
import { parseDate } from '../../../../../utils/helpers';
import { T_PLAYER_MATCH_WITH_RECORD } from '../../../types';

interface Props {
  data?: T_PLAYER_MATCH_WITH_RECORD;
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
  const { stats } = data || {};
  const listData: IListItem[] =
    stats?.map(item => {
      const labelColor =
        item.teamGoals > item.opponentGoals
          ? 'primary'
          : item.teamGoals === item.opponentGoals
            ? 'warning'
            : 'error';
      return {
        label: (
          <CustomTypography bold color="data">
            {item.opponent}
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
        link: `/org/${orgId}/team/${teamId}/match/${item._id}`,
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
