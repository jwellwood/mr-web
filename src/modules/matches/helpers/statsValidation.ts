import { IPlayerInMatch, ITempMatch } from '../../../types';
export const validateStats = (match: ITempMatch, players: IPlayerInMatch[]) => {
  const { teamGoals, opponentGoals, competition } = match;
  const { playersPerTeam, matchMinutes } = competition || {};

  const getTotalArray = (type: keyof IPlayerInMatch) => {
    return players
      .map((player) => +(player[type] || 0))
      .reduce((prev, curr) => prev + curr, 0);
  };
  const getTotalTrue = (type: keyof IPlayerInMatch) => {
    return players.filter((player) => player[type]).length;
  };

  const goals = getTotalArray('goals');
  const assists = getTotalArray('assists');
  const conceded = getTotalArray('conceded');
  const ownGoals = getTotalArray('ownGoals');
  const starters = getTotalTrue('isStarter');
  const mins = getTotalArray('minutes');
  const totalMins = (playersPerTeam || 0) * (matchMinutes || 0);

  const validateScored = (stat: number) => {
    return +stat <= +teamGoals;
  };
  const validateConceded = (stat: number) => {
    return +stat <= +opponentGoals;
  };

  const validationArray = [
    {
      label: 'Starters',
      value: starters,
      isValid: playersPerTeam && starters <= playersPerTeam,
      isExact: +starters === playersPerTeam,
      total: playersPerTeam,
    },
    {
      label: 'Minutes',
      value: mins,
      isValid: mins <= totalMins,
      isExact: +mins === totalMins,
      total: totalMins,
    },
    {
      label: 'Goals',
      value: goals,
      isValid: validateScored(goals),
      isExact: +goals === +teamGoals,
      total: teamGoals,
    },
    {
      label: 'Assists',
      value: assists,
      isValid: validateScored(assists),
      isExact: +assists === +teamGoals,
      total: teamGoals,
    },
    {
      label: 'Own Goals',
      value: ownGoals,
      isValid: validateConceded(ownGoals),
      isExact: +ownGoals === +opponentGoals,
      total: opponentGoals,
    },
    {
      label: 'Conceded',
      value: conceded,
      isValid: validateConceded(conceded),
      isExact: +conceded === +opponentGoals,
      total: opponentGoals,
    },
  ];

  const isValid = validationArray.every((arr) => arr.isValid);

  return { validationArray, isValid };
};
