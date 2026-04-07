import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, showAlert } from '../store';

export const useCopy = (text: string) => {
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
      dispatch(showAlert({ text: 'Text copied to clipboard', type: 'success' }));
    } catch {
      dispatch(showAlert({ text: 'Failed to copy text to clipboard', type: 'error' }));
    }
  };

  return { copied, onCopy };
};
