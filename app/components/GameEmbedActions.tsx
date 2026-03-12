'use client';

import type { CSSProperties } from 'react';

type GameEmbedActionsProps = {
  targetId: string;
  shareUrl?: string;
};

export default function GameEmbedActions({ targetId, shareUrl = '/play' }: GameEmbedActionsProps) {
  async function handleFullscreen() {
    const target = document.getElementById(targetId);
    if (!target) return;

    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }

    if (target.requestFullscreen) {
      await target.requestFullscreen();
    }
  }

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
        <span>Fullscreen</span>
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
