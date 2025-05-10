import { getSum } from './getSum';

export function mapReduce<T>(arr: T[], stat?: keyof T): number {
  return arr.map((elem) => +(elem[stat as keyof T] || 0)).reduce(getSum, 0);

}
