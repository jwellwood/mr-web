import { ICellStyleByIndex } from '../../../../../../components/tables/types';
import { BACKGROUND_STYLE } from '../../../../../../constants';

const { STATIC } = BACKGROUND_STYLE;

export const styles: ICellStyleByIndex[] = [
  { index: 0, background: STATIC },
  { index: 2, textColor: 'label' },
];
