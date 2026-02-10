import { ISelectOptions } from '../../components';

export function getNumberOptions(
  max: number = 99,
  min: number = 0,
  step: number = 1
): ISelectOptions[] {
  if (typeof max !== 'number') max = +max;
  if (typeof min !== 'number') min = +min;
  if (typeof step !== 'number') step = +step;
  const numbers = [];
  for (let i: number = min; i <= max; i += step) {
    numbers.push(i);
  }
  return numbers.map(int => ({ label: int.toString(), value: int }));
}
