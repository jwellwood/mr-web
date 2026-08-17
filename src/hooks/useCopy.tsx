import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { AppDispatch, showAlert } from '../store';

export const useCopy = (text: string) => {
  const { t } = useTranslation('hooks');
  const dispatch: AppDispatch = useDispatch();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;

    const timeout = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  const onCopy = async () => {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      dispatch(showAlert({ text: t('USE_COPY.SUCCESS'), type: 'success' }));
    } catch {
      dispatch(showAlert({ text: t('USE_COPY.ERROR'), type: 'error' }));
    }
  };

  return { copied, onCopy };
};
