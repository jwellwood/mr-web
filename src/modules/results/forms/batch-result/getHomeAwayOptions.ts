import { ISelectOptions } from '../../../../components';

export const getHomeAwayOptions = (
  currentHome: string,
  currentAway: string,
  teamOptions: ISelectOptions[],
  excludedTeams?: string[]
) => {
  const excl = excludedTeams || [];
  const homeOptions = teamOptions.filter(team => {
    const teammName = String(team.value);
    if (teammName === currentHome) return true; // keep currently selected value
    if (teammName === currentAway) return false; // prevent selecting same as away in this row
    if (excl.includes(teammName)) return false; // exclude teams used in other rows
    return true;
  });

  const awayOptions = teamOptions.filter(team => {
    const teammName = String(team.value);
    if (teammName === currentAway) return true;
    if (teammName === currentHome) return false;
    if (excl.includes(teammName)) return false;
    return true;
  });
  return { homeOptions, awayOptions };
};
