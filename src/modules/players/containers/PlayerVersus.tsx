import React from 'react';
import MostGoalsAndAssistsByPlayer from './MostGoalsAndAssistsByPlayer';
import PlayerVsStats from './PlayerVsStats';

const PlayerVersus: React.FC = () => {
  return (
    <div>
      <MostGoalsAndAssistsByPlayer />
      <PlayerVsStats />
    </div>
  );
};

export default PlayerVersus;
