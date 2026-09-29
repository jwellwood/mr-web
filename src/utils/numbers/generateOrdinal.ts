export const generateOrdinal = (
  n: number,
  locale = 'en',
  gender: 'masculine' | 'feminine' = 'masculine'
) => {
  if (locale.toLowerCase().startsWith('es')) {
    return gender === 'feminine' ? 'ª' : 'º';
  }

  const marker = ['th', 'st', 'nd', 'rd'];
  const value = n % 100;
  return marker[(value - 20) % 10] || marker[value] || marker[0];
};
