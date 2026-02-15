import { PresentationModal } from '../../../../components/modals';
import { CustomTypography } from '../../../../components/typography';
import RecordPlayers from '../../components/squad-records/RecordPlayers';
import SquadTopStreaks from '../../containers/SquadTopStreaks';
import { T_FETCH_SQUAD_STREAKS_QUERY } from '../../types';

export const rows = (data?: T_FETCH_SQUAD_STREAKS_QUERY['streaks']) => {
  const { played, goals, assists, combined } = data || {
    goals: { value: 0, players: [] },
    assists: { value: 0, players: [] },
    combined: { value: 0, players: [] },
    played: { value: 0, players: [] },
  };
  const tableData = data
    ? [
        {
          label: 'Played',
          value: played?.value,
          playerNames: played?.players.map(p => ({ name: p.playerName, id: p.playerId })),
        },
        {
          label: 'Goals',
          value: goals?.value,
          playerNames: goals?.players.map(p => ({ name: p.playerName, id: p.playerId })),
        },
        {
          label: 'Assists',
          value: assists?.value,
          playerNames: assists?.players.map(p => ({ name: p.playerName, id: p.playerId })),
        },
        {
          label: 'Combined',
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
          title={`Top 10 - ${item.label} Streaks`}
          buttonElement={
            <CustomTypography bold size="xs" color="primary">
              Top 10
            </CustomTypography>
          }
        >
          <SquadTopStreaks streakType={item.label.toLowerCase()} />
        </PresentationModal>
      ),
    };
  });
};
