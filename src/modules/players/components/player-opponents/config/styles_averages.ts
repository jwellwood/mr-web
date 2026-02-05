import { ICellStyleByIndex } from '../../../../../components/tables/types';
import { BACKGROUND_STYLE, BORDER_STYLE } from '../../../../../constants';

const { STATIC } = BACKGROUND_STYLE;
const { STANDARD } = BORDER_STYLE;

export const styles_averages: ICellStyleByIndex[] = [
  {
    index: 0,
    border: STANDARD,
    background: STATIC,
  },
  { index: 1, border: STANDARD },
  { index: 3, textColor: 'label' },
  { index: 5, textColor: 'label' },
  { index: 7, border: STANDARD, textColor: 'label' },
  { index: 9, textColor: 'label' },
  { index: 11, textColor: 'label' },
  { index: 13, border: STANDARD, textColor: 'label' },
  { index: 15, textColor: 'label' },
  { index: 17, textColor: 'label' },
  { index: 19, border: STANDARD, textColor: 'label' },
  { index: 21, textColor: 'label' },
] as const;
