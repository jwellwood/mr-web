export function sortArr<T>(
  arr: T[],
  stat: keyof T
): T[] {
  return [...arr].sort((a, b) => {
      const aVal = Number(a[stat])
      const bVal = Number(b[stat])

      return aVal - bVal

  });
}
