import { useQuery } from '@apollo/client/react';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { DataError } from '../../../../components/errors';
import { LinksList, type IListItem } from '../../../../components/lists';
import { CustomTypography } from '../../../../components/typography';
import { useCustomParams } from '../../../../hooks';
import { parseDate } from '../../../../utils';
import type { T_PLAYER_MATCH_WITH_RECORD } from '../../types';

type PlayerMatchRecordVars = {
  teamId: string;
  playerId: string;
  record: number;
};

interface Props {
  record: number;
  query: TypedDocumentNode<T_PLAYER_MATCH_WITH_RECORD, PlayerMatchRecordVars>;
}

export default function PlayerRecordsMatchesContent({ record, query }: Props) {
  const { teamId, playerId, orgId } = useCustomParams();

  const { data, loading, error } = useQuery(query, {
    variables: { teamId: teamId!, playerId: playerId!, record },
    skip: !record,
  });

  const listData: IListItem[] =
    data?.stats?.map(item => {
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

  return error ? (
    <DataError error={error} />
  ) : (
    <LinksList links={listData} loading={loading} rows={5} />
  );
}
