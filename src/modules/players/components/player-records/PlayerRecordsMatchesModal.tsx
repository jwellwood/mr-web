import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { useTranslation } from 'react-i18next';
import { CustomButton } from '../../../../components/buttons';
import { PresentationModal } from '../../../../components/modals';
import { CustomTypography } from '../../../../components/typography';
import type { T_PLAYER_MATCH_WITH_RECORD } from '../../graphql';
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

export default function PlayerRecordsMatchesModal({ record, title, query }: Props) {
  const { t } = useTranslation('players');
  return (
    <PresentationModal
      title={`${t('MOST')} ${title}`}
      buttonElement={
        <CustomButton variant="text">
          <CustomTypography bold color="primary" size="xs">
            {t('TABLES.BUTTONS.MATCHES')}
          </CustomTypography>
        </CustomButton>
      }
    >
      <PlayerRecordsMatchesContent record={record} query={query} />
    </PresentationModal>
  );
}
