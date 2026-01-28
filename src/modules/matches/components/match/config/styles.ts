import { ICellStyleByIndex } from '../../../../../components/tables/types';
import { BACKGROUND_STYLE, BORDER_STYLE } from '../../../../../constants';

const { STATIC } = BACKGROUND_STYLE;
const { STANDARD } = BORDER_STYLE;

export const styles: ICellStyleByIndex[] = [
  { index: 0, background: STATIC },
  { index: 1, background: STATIC },
  {
    index: 2,
    background: STATIC,
    border: STANDARD,
  },
  {
    index: 5,
    border: STANDARD,
  },
];
