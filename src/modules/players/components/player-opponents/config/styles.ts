import { ICellStyleByIndex } from '../../../../../components/tables/types';
import { BACKGROUND_STYLE, BORDER_STYLE } from '../../../../../constants';

const { STATIC } = BACKGROUND_STYLE;
const { STANDARD } = BORDER_STYLE;

export const styles: ICellStyleByIndex[] = [
  {
    index: 0,
    border: STANDARD,
    background: STATIC,
  },
  {
    index: 1,
    border: STANDARD,
  },
  { index: 4, border: STANDARD },
  { index: 7, border: STANDARD },
] as const;
