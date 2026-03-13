'use client';

import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';

type GameEmbedActionsProps = {
  targetId: string;
  shareUrl?: string;
};

export default function GameEmbedActions({ targetId, shareUrl = '/play' }: GameEmbedActionsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    return () => {
      document.body.classList.remove('embed-expanded-open');
      document.getElementById(targetId)?.classList.remove('embed-expanded');
    };
  }, [targetId]);

  async function handleFullscreen() {
    const target = document.getElementById(targetId);
    if (!target) return;

    const fullscreenTarget = target as HTMLElement & {
      webkitRequestFullscreen?: () => Promise<void> | void;
    };

    const fullscreenDocument = document as Document & {
      webkitExitFullscreen?: () => Promise<void> | void;
      webkitFullscreenElement?: Element | null;
    };

    const activeFullscreenEl = document.fullscreenElement || fullscreenDocument.webkitFullscreenElement;
    const canUseNativeFullscreen = Boolean(
      fullscreenTarget.requestFullscreen || fullscreenTarget.webkitRequestFullscreen,
    );

    if (!canUseNativeFullscreen) {
      const nextExpanded = !target.classList.contains('embed-expanded');
      target.classList.toggle('embed-expanded', nextExpanded);
      document.body.classList.toggle('embed-expanded-open', nextExpanded);
      setIsExpanded(nextExpanded);
      return;
    }

    if (activeFullscreenEl) {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if (fullscreenDocument.webkitExitFullscreen) {
        await fullscreenDocument.webkitExitFullscreen();
      }

      setIsExpanded(false);
      return;
    }

    if (fullscreenTarget.requestFullscreen) {
      await fullscreenTarget.requestFullscreen();
      setIsExpanded(true);
      return;
    }

    if (fullscreenTarget.webkitRequestFullscreen) {
      await fullscreenTarget.webkitRequestFullscreen();
      setIsExpanded(true);
    }
  }

  useEffect(() => {
    function syncExpandedState() {
      const fullscreenDocument = document as Document & {
        webkitFullscreenElement?: Element | null;
      };

      const target = document.getElementById(targetId);
      const isNativeFullscreen = Boolean(
        target && (document.fullscreenElement === target || fullscreenDocument.webkitFullscreenElement === target),
      );
      const isCssExpanded = Boolean(target?.classList.contains('embed-expanded'));

      setIsExpanded(isNativeFullscreen || isCssExpanded);
    }

    document.addEventListener('fullscreenchange', syncExpandedState);
    document.addEventListener('webkitfullscreenchange', syncExpandedState as EventListener);

    return () => {
      document.removeEventListener('fullscreenchange', syncExpandedState);
      document.removeEventListener('webkitfullscreenchange', syncExpandedState as EventListener);
    };
  }, [targetId]);

  async function handleShare() {
    const url = new URL(shareUrl, window.location.origin).toString();
    const shareData = {
      title: 'JigMerge',
      text: 'Play JigMerge online.',
      url,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        return;
      }
    }

    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(url);
    }
  }

  const actionRowStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.75rem',
    flexWrap: 'wrap',
    marginTop: '1rem',
  };

  const buttonStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    minWidth: '160px',
    padding: '0.9rem 1.1rem',
    borderRadius: '999px',
    border: '1px solid var(--border-light)',
    background: 'var(--bg-card)',
    color: 'var(--text-primary)',
    fontWeight: 600,
    cursor: 'pointer',
    boxShadow: 'var(--shadow-sm)',
  };

  const iconStyle: CSSProperties = {
    width: '16px',
    height: '16px',
    flexShrink: 0,
  };

  return (
    <div style={actionRowStyle}>
      <button type="button" onClick={handleFullscreen} style={buttonStyle}>
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 3H5a2 2 0 0 0-2 2v3" />
          <path d="M16 3h3a2 2 0 0 1 2 2v3" />
          <path d="M8 21H5a2 2 0 0 1-2-2v-3" />
          <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
        </svg>
        <span>{isExpanded ? 'Exit Fullscreen' : 'Fullscreen'}</span>
      </button>
      <button type="button" onClick={handleShare} style={buttonStyle}>
        <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <path d="M8.59 13.51 15.42 17.49" />
          <path d="M15.41 6.51 8.59 10.49" />
        </svg>
        <span>Share</span>
      </button>
    </div>
  );
}
