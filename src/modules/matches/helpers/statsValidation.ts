import { ITempMatch, ITempMatchPlayers } from '../types';

export const validateStats = (
  match: ITempMatch,
  players: ITempMatchPlayers[]
): {
  isValid: boolean;
  validationArray: readonly {
    label: 'Starters' | 'Goals' | 'Assists' | 'Own Goals' | 'Conceded';
    value: number;
    isValid: boolean;
    isExact: boolean;
    total: number;
  }[];
} => {
  const { teamGoals, opponentGoals } = match;

  const getTotalArray = (type: keyof ITempMatchPlayers) => {
    return players.map(player => +(player[type] || 0)).reduce((prev, curr) => prev + curr, 0);
  };

  const goals = getTotalArray('goals');
  const assists = getTotalArray('assists');
  const conceded = getTotalArray('conceded');
  const ownGoals = getTotalArray('ownGoals');

  const validateScored = (stat: number) => {
    return +stat <= +teamGoals;
  };
  const validateConceded = (stat: number) => {
    return +stat <= +opponentGoals;
  };

  const validationArray = [
    {
      label: 'Goals',
      value: goals,
      isValid: validateScored(goals) || false,
      isExact: +goals === +teamGoals,
      total: teamGoals,
    },
    {
      label: 'Assists',
      value: assists,
      isValid: validateScored(assists) || false,
      isExact: +assists === +teamGoals,
      total: teamGoals,
    },
    {
      label: 'Own Goals',
      value: ownGoals,
      isValid: validateConceded(ownGoals) || false,
      isExact: +ownGoals === +opponentGoals || false,
      total: opponentGoals,
    },
    {
      label: 'Conceded',
      value: conceded,
      isValid: validateConceded(conceded) || false,
      isExact: +conceded === +opponentGoals || false,
      total: opponentGoals,
    },
  ] as const;

  const isValid = validationArray.every(arr => arr.isValid);

  return { validationArray, isValid };
};
