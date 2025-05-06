import { ISelectOptions } from 'components/inputs/SelectInput';

export const getIntegers: Function = (
  max: number = 99,
  min: number = 0
): ISelectOptions[] => {
  if (typeof max !== 'number') max = +max;
  if (typeof min !== 'number') min = +min;
  const integers = [];
  for (let i: number = min; i <= max; i++) {
    integers.push(i);
  }
  return integers.map((int) => ({ label: int.toString(), value: int }));
};
