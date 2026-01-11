export const getInitials = (name: string) => {
  const splitName = name.split(' ');
  const firstInitial = splitName[0] ? splitName[0][0] : '';
  const secondInitial = splitName?.[1] ? splitName[1]?.[0] : '';

  return `${firstInitial}${secondInitial}`;
};
