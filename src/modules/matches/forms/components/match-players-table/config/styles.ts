import { ICellStyleByIndex } from '../../../../../../components/tables/types';
import { BACKGROUND_STYLE, BORDER_STYLE } from '../../../../../../constants';

const { STANDARD } = BORDER_STYLE;
const { STATIC } = BACKGROUND_STYLE;

export const styles: ICellStyleByIndex[] = [
  { index: 0, border: STANDARD, background: STATIC },
  { index: 1, border: STANDARD },
  { index: 2, border: STANDARD },
  { index: 3, border: STANDARD },
  { index: 4, border: STANDARD },
  { index: 5, border: STANDARD },
  { index: 6, border: STANDARD },
  { index: 7, border: STANDARD },
  { index: 8, border: STANDARD },
  { index: 9, border: STANDARD },
  { index: 10, border: STANDARD },
  { index: 11, border: STANDARD },
  { index: 12, border: STANDARD },
  { index: 13, border: STANDARD },
] as const;
