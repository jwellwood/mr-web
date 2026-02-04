import { CustomTypography } from '../../../../../../components';
import CustomSkeleton from '../../../../../../components/loaders/CustomSkeleton';
import StatSkeleton from '../../../../../../components/loaders/StatSkeleton';
import { PresentationModal } from '../../../../../../components/modals';
import SquadTopStreaks from '../../../../containers/SquadTopStreaks';
import { T_FETCH_SQUAD_STREAKS_QUERY } from '../../../../types';
import RecordPlayers from '../../RecordPlayers';

export const rows = (data?: T_FETCH_SQUAD_STREAKS_QUERY['streaks'], loading = false) => {
  const tableData = data
    ? [
        {
          label: 'Played',
          value: data.played?.value,
          playerNames: data.played?.players.map(p => ({ name: p.playerName, id: p.playerId })),
        },
        {
          label: 'Goals',
          value: data.goals?.value,
          playerNames: data.goals?.players.map(p => ({ name: p.playerName, id: p.playerId })),
        },
        {
          label: 'Assists',
          value: data.assists?.value,
          playerNames: data.assists?.players.map(p => ({ name: p.playerName, id: p.playerId })),
        },
        {
          label: 'Combined',
          value: data.combined?.value,
          playerNames: data.combined?.players.map(p => ({ name: p.playerName, id: p.playerId })),
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
