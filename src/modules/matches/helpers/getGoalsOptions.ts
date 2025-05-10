import { ISelectOptions } from '../../../components/inputs/SelectInput';

export const getGoalsOptions = (goalsScored = 0) => {
  const options: ISelectOptions[] = [];

  for (let i = 0; i <= goalsScored; i++) {
    options.push({ label: String(i), value: i });
  }
  return options;
};
