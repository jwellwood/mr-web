import { BACKGROUND_STYLE, BORDER_STYLE } from '../../../../../constants';

const { STATIC } = BACKGROUND_STYLE;
const { STANDARD } = BORDER_STYLE;

export const styles = [
  { index: 0, background: STATIC, textColor: 'label' },
  { index: 1, background: STATIC },
  { index: 2, background: STATIC },
  { index: 3, background: STATIC },
  {
    index: 4,
    background: STATIC,
    border: STANDARD,
  },
] as const;
