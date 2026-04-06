import type { TFunction } from 'i18next';
import { ColumnConfig } from '../../../../../components';

export const columns = (t: TFunction): readonly ColumnConfig[] =>
  [
    {
      id: 'position',
      label: '',
      styles: {
        width: 24,
      },
    },
    {
      id: 'nationality',
      type: 'nationality',
      label: '',
      styles: {
        width: 30,
      },
    },
    {
      id: 'image',
      type: 'image',
      label: '',
      styles: {
        width: 28,
      },
    },
    {
      id: 'name',
      type: 'link',
      label: '',
      styles: {
        align: 'left',
        border: true,
      },
    },
    {
      id: 'joined',
      label: t('TABLES.HEADERS.FROM'),
      styles: {
        width: 40,
        background: true,
      },
    },
    {
      id: 'left',
      label: t('TABLES.HEADERS.TO'),
      styles: {
        width: 40,
        background: true,
      },
    },
    {
      id: 'seasons',
      label: t('TABLES.HEADERS.SEASONS'),
      styles: {
        width: 20,
        background: true,
      },
    },
  ] as const;
