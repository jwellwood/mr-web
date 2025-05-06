export const getOpaqueValue = (rgb: string, alpha = 0.2) => {
  const isHex = rgb[0] === '#';
  if (isHex) {
    alpha = alpha * 10;
    return `${rgb}${alpha}0`;
  }
  return `${rgb.split(')')[0]},${alpha})`;
};
