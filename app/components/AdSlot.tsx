'use client';

import { useEffect, useMemo, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface AdSlotProps {
  type?: 'banner' | 'sidebar' | 'in-content';
}

const slotMap = {
  banner: process.env.NEXT_PUBLIC_ADSENSE_SLOT_BANNER,
  sidebar: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR,
  'in-content': process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_CONTENT,
} as const;

function normalizePublisherId(value?: string) {
  if (!value) return '';
  return value.startsWith('ca-pub-') ? value : `ca-pub-${value}`;
}

export default function AdSlot({ type = 'banner' }: AdSlotProps) {
  const adPushed = useRef(false);
  const slot = slotMap[type];
  const publisherId = useMemo(
    () => normalizePublisherId(process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID),
    []
  );

  useEffect(() => {
    if (!slot || !publisherId || adPushed.current) return;
    (window.adsbygoogle = window.adsbygoogle || []).push({});
    adPushed.current = true;
  }, [slot, publisherId]);

  if (!slot || !publisherId) {
    return null;
  }

  return (
    <div className="ad-container" aria-label="Advertisement">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={publisherId}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
