import { ISelectOptions } from '../../../components/inputs/SelectInput';

export const getMinutesOptions = (matchLength: string | number = 90) => {
  if (typeof matchLength !== 'number') {
    matchLength = +matchLength;
  }
  const options: ISelectOptions[] = [];

  for (let i = 0; i <= matchLength; i += 5) {
    options.push({ label: String(i), value: i });
  }
  return options;
};
