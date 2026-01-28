import { BACKGROUND_STYLE, BORDER_STYLE } from '../../../../../../constants';

const { STATIC } = BACKGROUND_STYLE;
const { STANDARD } = BORDER_STYLE;

export const styles = [
  { index: 0, background: STATIC, textColor: 'label', border: STANDARD },
  { index: 1, border: STANDARD },
  { index: 3, textColor: 'label' },
] as const;
