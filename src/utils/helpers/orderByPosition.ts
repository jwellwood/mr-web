export const orderByPosition = (data: any) => {
  const filterByPosition = (pos: string) =>
    data.filter((item) => item.position === pos);
  const newArray = [
    ...filterByPosition('GK'),
    ...filterByPosition('DF'),
    ...filterByPosition('MF'),
    ...filterByPosition('FW'),
  ];

  const other = data.filter((item) => !item.position);

  return [...newArray, ...other];
};
