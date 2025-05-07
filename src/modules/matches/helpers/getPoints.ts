export const getPoints = (teamGoals: number, opponentGoals: number): number => {
  let points = 1;
  if (teamGoals > opponentGoals) {
    points = 3;
  }
  if (opponentGoals > teamGoals) {
    points = 0;
  }
  return points;
};
