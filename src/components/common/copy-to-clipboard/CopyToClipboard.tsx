'use client';

import { FC, useState } from 'react';

import { useToast } from '@/hooks/use-toast/useToast';
import { useTranslation } from '@/hooks/use-translation/useTranslation';

import { Copy } from '../icons/actions/Copy';

type Props = {
  text: string;
};

export const CopyToClipboard: FC<Props> = ({ text }) => {
  const [isCopied, setCopied] = useState(false);
  const { t } = useTranslation();
  const { showToast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
      showToast(t('states.copied'), 'success');
    } catch (_err) {
      showToast(t('states.error'), 'error');
    }
  };

  return (
    <button
      type={'button'}
      onClick={handleCopy}
      disabled={isCopied}
      className="group cursor-pointer"
    >
      <Copy className="w-4 h-4 fill-primary-content group-hover:fill-divider duration-300" />
    </button>
  );
};
