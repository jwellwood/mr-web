export function filterer<T extends object>(arr: T[], stat?: keyof T): number {
  return arr.filter(elem => stat && elem[stat]).length;
}
