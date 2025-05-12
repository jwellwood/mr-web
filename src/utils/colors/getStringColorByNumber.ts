export function getStringColorByNumber(number: number | string): string {
  let color: string;
  if (typeof number !== 'number' && number) number = +number;
  switch (number) {
    case 3:
      color = 'success';
      break;
    case 1:
      color = 'warning';
      break;
    case 0:
      color = 'error';
      break;
    default:
      color = 'secondary';
  }
  return color;
}
