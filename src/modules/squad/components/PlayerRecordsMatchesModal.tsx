import { CustomTypography } from '../../../components/typography/index.ts';
import { parseDate } from '../../../utils/helpers/index.ts';
import { PresentationModal } from '../../../components/modals/index.ts';
import { CustomButton } from '../../../components/buttons/index.ts';
import LinksList from '../../../components/lists/links-list/LinksList.tsx';
import { IListItem } from '../../../components/lists/types.ts';
import { IPlayerRecordMatch } from '../types.ts';
import { ApolloError } from '@apollo/client';
import { DataError } from '../../../components/index.ts';

interface Props {
  data?: IPlayerRecordMatch[];
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
