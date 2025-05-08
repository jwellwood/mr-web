import {BackgroundStyles} from "../../../constants.ts";
import type {ICellStyleByIndex} from "../types.ts";
import {theme} from "../../../theme";
import {getOpaqueValue} from "../../../utils/colors/getOpaqueValue.ts";

export const getBackgroundColor = (
  item: [string, string | number | object],
  i: number,
  sortBy?: string,
  cellIndexStyles?: ICellStyleByIndex[]
) => {
  const staticBackground = theme.palette.secondary.dark;
  let backgroundColor = theme.palette.dark.main;
  const isSelected = item[0] === sortBy;
  const cellIndex = cellIndexStyles?.map((cell) => cell.index) ?? [];

  if (cellIndex.includes(i)) {
    backgroundColor =
      cellIndexStyles?.find((cell) => cell.index === i)?.background ||
      theme.palette.dark.main;
  }
  if (isSelected) {
    backgroundColor = getOpaqueValue(theme.palette.primary.main);
  }
  return backgroundColor === BackgroundStyles.STATIC
    ? staticBackground
    : backgroundColor;
};
