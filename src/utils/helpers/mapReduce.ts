import { getSum } from './getSum';

export function mapReduce<T>(arr: T[], stat: keyof T): number {
  return arr.map((elem) => +elem[stat]).reduce(getSum, 0);

}
