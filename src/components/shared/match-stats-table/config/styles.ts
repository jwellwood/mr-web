import { BORDER_STYLE } from '../../../../constants';
import { ICellStyleByIndex } from '../../../../components/tables/types';

export const styles: ICellStyleByIndex[] = [
  { index: 0, border: BORDER_STYLE.STANDARD },
  { index: 3, border: BORDER_STYLE.STANDARD },
  { index: 5, border: BORDER_STYLE.STANDARD },
] as const;
