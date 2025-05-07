export function generateOrdinals (num: number | string): string {
  if (typeof num !== 'number') {
    num = Number(num);
    if (isNaN(num)) {
      throw new Error('Invalid number');
    }
  }
  if (num < 50 && num > 0) {
    switch (num) {
      case 1:
      case 21:
      case 31:
      case 41:
        return 'st';
      case 2:
      case 22:
      case 32:
      case 42:
        return 'nd';
      case 3:
      case 23:
      case 33:
      case 43:
        return 'rd';
      default:
        return 'th';
    }
  }
  return '';
};
