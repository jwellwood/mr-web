import { ICellStyleByIndex } from '../../../../../components/tables/types';
import { BACKGROUND_STYLE, BORDER_STYLE } from '../../../../../constants';

const { STATIC } = BACKGROUND_STYLE;

export const styles: ICellStyleByIndex[] = [
  { index: 0, border: BORDER_STYLE.STANDARD, background: STATIC },
  { index: 1, border: BORDER_STYLE.STANDARD, textAlign: 'left' },
];
