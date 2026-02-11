import { StatSkeleton, CustomSkeleton } from '../../../../../../components/loaders';
import { PresentationModal } from '../../../../../../components/modals';
import { CustomTypography } from '../../../../../../components/typography';
import SquadTopStreaks from '../../../../containers/SquadTopStreaks';
import { T_FETCH_SQUAD_STREAKS_QUERY } from '../../../../types';
import RecordPlayers from '../../RecordPlayers';

export const rows = (data?: T_FETCH_SQUAD_STREAKS_QUERY['streaks'], loading?: boolean) => {
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
      label: (
        <CustomTypography color="label" bold size="xs">
          {item.label}
        </CustomTypography>
      ),
      value: loading ? <StatSkeleton /> : item.value,
      players: loading ? (
        <CustomSkeleton width="100px" />
      ) : (
        <RecordPlayers names={item.playerNames || []} loading={loading} />
      ),
      more: loading ? (
        <CustomSkeleton width="20px" />
      ) : (
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
