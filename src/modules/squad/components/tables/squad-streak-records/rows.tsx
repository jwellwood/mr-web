import type { TFunction } from 'i18next';
import { PresentationModal } from '../../../../../components/modals';
import { CustomTypography } from '../../../../../components/typography';
import RecordPlayers from '../../../components/squad-records/RecordPlayers';
import SquadTopStreaks from '../../../containers/SquadTopStreaks';
import { T_FETCH_SQUAD_STREAKS_QUERY } from '../../../graphql';

export const rows = (t: TFunction, data?: T_FETCH_SQUAD_STREAKS_QUERY['streaks']) => {
  const { played, goals, assists, combined } = data || {
    goals: { value: 0, players: [] },
    assists: { value: 0, players: [] },
    combined: { value: 0, players: [] },
    played: { value: 0, players: [] },
  };
  const tableData = data
    ? [
        {
          type: 'played',
          label: t('STREAKS.PLAYED'),
          value: played?.value,
          playerNames: played?.players.map(p => ({ name: p.playerName, id: p.playerId })),
        },
        {
          type: 'goals',
          label: t('STREAKS.GOALS'),
          value: goals?.value,
          playerNames: goals?.players.map(p => ({ name: p.playerName, id: p.playerId })),
        },
        {
          type: 'assists',
          label: t('STREAKS.ASSISTS'),
          value: assists?.value,
          playerNames: assists?.players.map(p => ({ name: p.playerName, id: p.playerId })),
        },
        {
          type: 'combined',
          label: t('STREAKS.COMBINED'),
          value: combined?.value,
          playerNames: combined?.players.map(p => ({ name: p.playerName, id: p.playerId })),
        },
      ]
    : [];

  return tableData.map(item => {
    return {
      label: item.label,
      value: item.value,
      players: <RecordPlayers names={item.playerNames || []} />,
      more: (
        <PresentationModal
          title={t('STREAKS.TOP_10_TITLE', { label: item.label })}
          buttonElement={
            <CustomTypography bold size="xs" color="primary">
              Top 10
            </CustomTypography>
          }
        >
          <SquadTopStreaks streakType={item.type} />
        </PresentationModal>
      ),
    };
  });
};
