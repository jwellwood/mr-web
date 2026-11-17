import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { ISelectOptions } from '../components';
import PositionText from '../components/typography/position-text/PositionText';
import { POSITIONS } from '../constants';

export const usePositionOptions = (includeEmpty = true): ISelectOptions[] => {
  const { t } = useTranslation('components');

  return useMemo(() => {
    const options: ISelectOptions[] = [
      {
        value: POSITIONS.GK,
        label: (
          <>
            {t('POSITION.GOALKEEPER')} <PositionText position={POSITIONS.GK} />
          </>
        ),
      },
      {
        value: POSITIONS.DF,
        label: (
          <>
            {t('POSITION.DEFENDER')} <PositionText position={POSITIONS.DF} />
          </>
        ),
      },
      {
        value: POSITIONS.MF,
        label: (
          <>
            {t('POSITION.MIDFIELDER')} <PositionText position={POSITIONS.MF} />
          </>
        ),
      },
      {
        value: POSITIONS.FW,
        label: (
          <>
            {t('POSITION.FORWARD')} <PositionText position={POSITIONS.FW} />
          </>
        ),
      },
    ];

    return includeEmpty ? [{ value: '', label: '' }, ...options] : options;
  }, [t, includeEmpty]);
};
