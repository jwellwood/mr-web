import { ISelectOptions } from '../../../../components';

export const getHomeAwayOptions = (
  currentHome: string,
  currentAway: string,
  teamOptions: ISelectOptions[],
  excludedTeams?: string[]
) => {
  const excl = excludedTeams || [];
  const homeOptions = teamOptions.filter(o => {
    const v = String(o.value);
    if (v === currentHome) return true; // keep currently selected value
    if (v === currentAway) return false; // prevent selecting same as away in this row
    if (excl.includes(v)) return false; // exclude teams used in other rows
    return true;
  });

  const awayOptions = teamOptions.filter(o => {
    const v = String(o.value);
    if (v === currentAway) return true;
    if (v === currentHome) return false;
    if (excl.includes(v)) return false;
    return true;
  });
  return { homeOptions, awayOptions };
};
