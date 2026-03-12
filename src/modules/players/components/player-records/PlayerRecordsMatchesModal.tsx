import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { CustomButton } from '../../../../components/buttons';
import { PresentationModal } from '../../../../components/modals';
import { CustomTypography } from '../../../../components/typography';
import type { T_PLAYER_MATCH_WITH_RECORD } from '../../types';
import PlayerRecordsMatchesContent from './PlayerRecordsMatchesContent';

type PlayerMatchRecordVars = {
  teamId: string;
  playerId: string;
  record: number;
};

interface Props {
  record: number;
  title: string;
  query: TypedDocumentNode<T_PLAYER_MATCH_WITH_RECORD, PlayerMatchRecordVars>;
}

export default function xPlayerRecordsMatchesModal({ record, title, query }: Props) {
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
      <PlayerRecordsMatchesContent record={record} query={query} />
    </PresentationModal>
  );
}
