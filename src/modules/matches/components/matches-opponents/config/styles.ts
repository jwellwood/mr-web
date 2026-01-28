import { BACKGROUND_STYLE, BORDER_STYLE } from '../../../../../constants';

const { STATIC } = BACKGROUND_STYLE;
const { STANDARD } = BORDER_STYLE;

export const styles = [
  {
    index: 0,
    background: STATIC,
    border: STANDARD,
  },
  { index: 4, border: STANDARD },
  { index: 7, border: STANDARD },
  {
    index: 8,
    background: STATIC,
    border: STANDARD,
  },
  { index: 9, textColor: 'label' },
  { index: 10, textColor: 'label' },
] as const;
