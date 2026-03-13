/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   JigMerge â€” Game Engine
   Grid-based swap + merge puzzle
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

// â”€â”€ DOM References â”€â”€
const BOARD = document.getElementById('board');
const LEVEL_DISPLAY = document.getElementById('game-level-title');
const NEXT_BTN = document.getElementById('next-level-btn');
const WIN_OVERLAY = document.getElementById('win-overlay');
const MOVE_COUNT_EL = document.getElementById('move-count');
const TIMER_EL = document.getElementById('timer-display');
const REF_IMAGE_EL = document.getElementById('ref-image');
const MODE_DISPLAY_EL = document.getElementById('mode-display');
const COIN_AMOUNT_EL = document.getElementById('coin-amount');
const COINS_TOTAL_GAME_EL = document.getElementById('coins-total-game');
const WIN_TIME_EL = document.getElementById('win-time');
const WIN_COINS_EL = document.getElementById('win-coins');
const WIN_BONUS_LINE_EL = document.getElementById('win-bonus-line');
const WIN_STARS_EL = document.getElementById('win-stars');
const MERGE_STATUS_EL = document.getElementById('merge-status');
const MERGE_FEEDBACK_EL = document.getElementById('merge-feedback');
const BEST_STARS_EL = document.getElementById('best-stars');
const BEST_TIME_EL = document.getElementById('best-time');
const SHOP_GRID_EL = document.getElementById('shop-grid');
const SIDEBAR_TABS = document.querySelectorAll('.sidebar-tab');
const COMING_SOON_PREVIEW_EL = document.getElementById('coming-soon-preview');
const COMING_SOON_COPY_EL = document.getElementById('coming-soon-copy');
const GAME_SIDEBAR_EL = document.getElementById('game-sidebar');
const SIDEBAR_TOGGLE_EL = document.getElementById('sidebar-toggle');
const SIDEBAR_HOVER_ZONE_EL = document.getElementById('sidebar-hover-zone');
const SIDEBAR_EDGE_HINT_EL = document.getElementById('sidebar-edge-hint');
const PERKS_SIDEBAR_EL = document.getElementById('perks-sidebar');
const PERKS_SIDEBAR_TOGGLE_EL = document.getElementById('perks-sidebar-toggle');
const PERKS_HOVER_ZONE_EL = document.getElementById('perks-hover-zone');
const PERKS_EDGE_HINT_EL = document.getElementById('perks-edge-hint');
const MOBILE_PANEL_BACKDROP_EL = document.getElementById('mobile-panel-backdrop');
const MOBILE_SIDEBAR_TRIGGER_EL = document.getElementById('mobile-sidebar-trigger');
const MOBILE_PERKS_TRIGGER_EL = document.getElementById('mobile-perks-trigger');
const SIDEBAR_MODE_EL = document.getElementById('sidebar-mode');
const SIDEBAR_MOVES_EL = document.getElementById('sidebar-moves');
const SIDEBAR_TIME_EL = document.getElementById('sidebar-time');
const SIDEBAR_MERGE_EL = document.getElementById('sidebar-merge');

// â”€â”€ Game Config â”€â”€
let currentCategory = 1;
let currentPuzzleIndex = 0;
let unlockedLevel = 1;
let pieces = [];
let groups = {};        // groupId â†’ [pieceIds]
let nextGroupId = 1;
let grid = [];          // 2D array: grid[row][col] = pieceId
let gridRows = 0;
let gridCols = 0;
let pieceW = 0;
let pieceH = 0;

// â”€â”€ Stats â”€â”€
let moveCount = 0;
let timerSeconds = 0;
let timerInterval = null;
let topZIndex = 10;
let isZenMode = false;
let isPeekActive = false;
let peekTimeout = null;
let mergeFeedbackTimeout = null;
let comingSoonInterval = null;
let sidebarHideTimer = null;
let sidebarExpandedWidth = 220;
let sidebarPinnedOpen = false;
let perksSidebarExpandedWidth = 180;
let perksSidebarHideTimer = null;
let perksSidebarPinnedOpen = false;

// Viewport height logic removed in favor of CSS 100% height

const SHOP_TEASERS = [
    { title: 'Golden frame board', copy: 'A warm carved border skin with soft glow edges.' },
    { title: 'Lantern peek boost', copy: 'Longer peeks and gentler guide cues for tricky sets.' },
    { title: 'Mossy lodge theme', copy: 'A forest table skin with matching sounds and particles.' },
];

const THEMES = [
    {
        id: 'cozy-hearth',
        name: 'Cozy Hearth',
        price: 0,
        note: 'Warm carved wood and candlelight.',
        tokens: {
            '--theme-bg': '#2a1b14',
            '--theme-bg-soft': '#432b20',
            '--theme-surface': '#5a3927',
            '--theme-surface-2': 'rgba(255, 248, 239, 0.08)',
            '--theme-panel': 'rgba(50, 32, 23, 0.88)',
            '--theme-panel-2': 'rgba(28, 18, 13, 0.68)',
            '--theme-wood-light': '#d7ab77',
            '--theme-wood-main': '#a56a3f',
            '--theme-wood-dark': '#5b3825',
            '--theme-accent': '#e8bf73',
            '--theme-accent-2': '#c97e4b',
            '--theme-success': '#85b67d',
            '--theme-star': '#f3d48b',
            '--theme-text': '#fff8ef',
            '--theme-text-soft': 'rgba(255, 248, 239, 0.72)',
            '--theme-text-dim': 'rgba(255, 248, 239, 0.45)',
            '--theme-border': 'rgba(232, 191, 115, 0.24)',
            '--theme-border-strong': 'rgba(232, 191, 115, 0.44)',
        },
    },
    {
        id: 'mossy-lodge',
        name: 'Mossy Lodge',
        price: 45,
        note: 'Softer greens and pine wood for a forest nook.',
        tokens: {
            '--theme-bg': '#1e241d',
            '--theme-bg-soft': '#324034',
            '--theme-surface': '#495441',
            '--theme-surface-2': 'rgba(242, 246, 236, 0.08)',
            '--theme-panel': 'rgba(28, 34, 27, 0.9)',
            '--theme-panel-2': 'rgba(22, 27, 21, 0.72)',
            '--theme-wood-light': '#bfa883',
            '--theme-wood-main': '#7a6147',
            '--theme-wood-dark': '#433428',
            '--theme-accent': '#b8cd8c',
            '--theme-accent-2': '#8fa56e',
            '--theme-success': '#8fc28c',
            '--theme-star': '#e8d69a',
            '--theme-text': '#f4f0e6',
            '--theme-text-soft': 'rgba(244, 240, 230, 0.72)',
            '--theme-text-dim': 'rgba(244, 240, 230, 0.45)',
            '--theme-border': 'rgba(184, 205, 140, 0.24)',
            '--theme-border-strong': 'rgba(184, 205, 140, 0.4)',
        },
    },
    {
        id: 'dawn-parlor',
        name: 'Dawn Parlor',
        price: 70,
        note: 'Rosy paper walls with creamy maple trim.',
        tokens: {
            '--theme-bg': '#302121',
            '--theme-bg-soft': '#53393a',
            '--theme-surface': '#6f5149',
            '--theme-surface-2': 'rgba(255, 243, 239, 0.09)',
            '--theme-panel': 'rgba(55, 37, 34, 0.9)',
            '--theme-panel-2': 'rgba(36, 24, 22, 0.72)',
            '--theme-wood-light': '#d6b199',
            '--theme-wood-main': '#a97962',
            '--theme-wood-dark': '#65483d',
            '--theme-accent': '#f1bf9c',
            '--theme-accent-2': '#d79071',
            '--theme-success': '#93ba9f',
            '--theme-star': '#f3dcb0',
            '--theme-text': '#fff5f0',
            '--theme-text-soft': 'rgba(255, 245, 240, 0.74)',
            '--theme-text-dim': 'rgba(255, 245, 240, 0.45)',
            '--theme-border': 'rgba(241, 191, 156, 0.24)',
            '--theme-border-strong': 'rgba(241, 191, 156, 0.44)',
        },
    },
];

const STORAGE_KEY = 'jigmerge_progress_v2';
const defaultProgress = {
    coins: 0,
    unlockedLevel: 1,
    zenMode: false,
    activeTheme: 'cozy-hearth',
    ownedThemes: ['cozy-hearth'],
    lastPlayed: { category: 1, puzzleIndex: 0 },
    bestScores: {},
};

let playerProgress = loadProgress();
unlockedLevel = playerProgress.unlockedLevel || 1;
isZenMode = !!playerProgress.zenMode;

function getRequestedStart() {
    const params = new URLSearchParams(window.location.search);
    const collection = Number.parseInt(params.get('collection') || '', 10);
    const puzzle = Number.parseInt(params.get('puzzle') || '0', 10);
    const hasCollection = Number.isInteger(collection) && collection >= 1 && collection <= Object.keys(LEVELS).length;
    const hasPuzzle = Number.isInteger(puzzle) && puzzle >= 0;

    if (!hasCollection) return null;

    const images = window.LEVEL_IMAGES ? window.LEVEL_IMAGES[collection] : null;
    const maxPuzzles = images ? images.length : 0;
    if (!maxPuzzles) return null;

    return {
        category: collection,
        puzzleIndex: hasPuzzle ? Math.min(puzzle, maxPuzzles - 1) : 0,
    };
}

let requestedStart = null;

function loadProgress() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return { ...defaultProgress };
        const parsed = JSON.parse(raw);
        return {
            ...defaultProgress,
            ...parsed,
            ownedThemes: parsed.ownedThemes || ['cozy-hearth'],
            lastPlayed: {
                ...defaultProgress.lastPlayed,
                ...(parsed.lastPlayed || {}),
            },
            bestScores: parsed.bestScores || {},
        };
    } catch (error) {
        console.warn('Failed to load progress', error);
        return { ...defaultProgress };
    }
}

function saveProgress() {
    playerProgress.unlockedLevel = unlockedLevel;
    playerProgress.zenMode = isZenMode;
    playerProgress.lastPlayed = { category: currentCategory, puzzleIndex: currentPuzzleIndex };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(playerProgress));
}

function getTheme(themeId) {
    return THEMES.find((theme) => theme.id === themeId) || THEMES[0];
}

function applyTheme(themeId) {
    const theme = getTheme(themeId);
    Object.entries(theme.tokens).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);
    });
    playerProgress.activeTheme = theme.id;
    saveProgress();
}

function isThemeOwned(themeId) {
    return playerProgress.ownedThemes.includes(themeId);
}

function purchaseTheme(themeId) {
    const theme = getTheme(themeId);
    if (isThemeOwned(theme.id)) {
        applyTheme(theme.id);
        renderShop();
        return;
    }
    if (playerProgress.coins < theme.price) return;
    playerProgress.coins -= theme.price;
    playerProgress.ownedThemes.push(theme.id);
    updateCoinDisplays();
    applyTheme(theme.id);
    renderShop();
}

function puzzleKey(categoryId, puzzleIndex) {
    return `${categoryId}:${puzzleIndex}`;
}

function getBestScore(categoryId, puzzleIndex) {
    return playerProgress.bestScores[puzzleKey(categoryId, puzzleIndex)] || null;
}

function updateCoinDisplays() {
    if (COIN_AMOUNT_EL) COIN_AMOUNT_EL.textContent = playerProgress.coins;
    if (COINS_TOTAL_GAME_EL) COINS_TOTAL_GAME_EL.textContent = playerProgress.coins;
}

function updateModeLabels() {
    const modeLabel = isZenMode ? 'Zen' : 'Flow';
    if (MODE_DISPLAY_EL) MODE_DISPLAY_EL.textContent = modeLabel;
    if (SIDEBAR_MODE_EL) SIDEBAR_MODE_EL.textContent = modeLabel;

    const zenLabel = `ZEN MODE: ${isZenMode ? 'ON' : 'OFF'}`;
    const zenStatus = document.getElementById('zen-status');
    const menuBtn = document.getElementById('zen-toggle-menu');
    const settingsBtn = document.getElementById('toggle-zen-btn');
    if (zenStatus) zenStatus.textContent = isZenMode ? 'ON' : 'OFF';
    if (menuBtn) menuBtn.textContent = zenLabel;
    if (settingsBtn) settingsBtn.textContent = zenLabel;
}

function formatTime(totalSeconds) {
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

function getLevelPar(categoryId) {
    const config = LEVELS[categoryId] || LEVELS[1];
    const cells = config.rows * config.cols;
    return {
        speed: Math.max(35, Math.round(cells * 4.5)),
        great: Math.max(55, Math.round(cells * 6.5)),
        relaxed: Math.max(90, Math.round(cells * 9)),
        moveTarget: Math.max(cells + 2, Math.round(cells * 1.8)),
    };
}

function getCollectionCompletion() {
    const total = Object.values(window.LEVEL_IMAGES || {}).reduce((sum, list) => sum + list.length, 0);
    const completed = Object.keys(playerProgress.bestScores).length;
    if (!total) return '0%';
    return `${Math.round((completed / total) * 100)}%`;
}

function updateCollectionProgress() {
    const progressEl = document.getElementById('collection-progress');
    if (progressEl) progressEl.textContent = getCollectionCompletion();
}

function updateBestScorePanel(categoryId, puzzleIndex) {
    const best = getBestScore(categoryId, puzzleIndex);
    if (BEST_STARS_EL) BEST_STARS_EL.textContent = best ? `${'â˜…'.repeat(best.stars)}${'â˜†'.repeat(3 - best.stars)}` : 'New';
    if (BEST_TIME_EL) BEST_TIME_EL.textContent = best && best.bestTime > 0 ? formatTime(best.bestTime) : '--:--';
}

function renderShop() {
    if (!SHOP_GRID_EL) return;
    SHOP_GRID_EL.innerHTML = '';
    THEMES.forEach((theme) => {
        const owned = isThemeOwned(theme.id);
        const active = playerProgress.activeTheme === theme.id;
        const card = document.createElement('article');
        card.className = 'shop-item';
        const previewStyle = Object.entries(theme.tokens)
            .map(([key, value]) => `${key}:${value}`)
            .join(';');
        card.innerHTML = `
            <div class="shop-item-preview" style="${previewStyle}; background:
                radial-gradient(circle at 20% 20%, color-mix(in srgb, var(--theme-accent) 40%, transparent) 0%, transparent 32%),
                linear-gradient(180deg, var(--theme-bg-soft), var(--theme-bg));"></div>
            <div class="shop-item-meta">
                <strong>${theme.name}</strong>
                <span class="shop-price">${theme.price === 0 ? 'Free' : `${theme.price}*`}</span>
            </div>
            <p class="shop-item-note">${theme.note}</p>
        `;
        const actionBtn = document.createElement('button');
        actionBtn.className = 'wood-btn small';
        actionBtn.textContent = active ? 'Equipped' : owned ? 'Use Theme' : 'Unlock';
        actionBtn.disabled = active;
        actionBtn.addEventListener('click', () => {
            playSound('click');
            purchaseTheme(theme.id);
        });
        card.appendChild(actionBtn);
        SHOP_GRID_EL.appendChild(card);
    });
}

function startComingSoonRotation() {
    if (!COMING_SOON_PREVIEW_EL || !COMING_SOON_COPY_EL) return;
    let teaserIndex = 0;

    const renderTeaser = () => {
        const teaser = SHOP_TEASERS[teaserIndex];
        COMING_SOON_PREVIEW_EL.textContent = teaser.title;
        COMING_SOON_COPY_EL.textContent = teaser.copy;
        teaserIndex = (teaserIndex + 1) % SHOP_TEASERS.length;
    };

    renderTeaser();
    clearInterval(comingSoonInterval);
    comingSoonInterval = setInterval(renderTeaser, 2800);
}

function getMergeTier(groupSize) {
    if (groupSize >= 10) return 4;
    if (groupSize >= 6) return 3;
    if (groupSize >= 3) return 2;
    if (groupSize >= 2) return 1;
    return 0;
}

function clearMergeTierClasses(piece) {
    piece.el.classList.remove('merge-tier-1', 'merge-tier-2', 'merge-tier-3', 'merge-tier-4', 'merge-flash');
}

function updateMergeStatus(groupSize = 1) {
    if (!MERGE_STATUS_EL) return;
    let mergeLabel = 'Warm-up';
    if (groupSize >= 10) mergeLabel = 'Grand Merge';
    else if (groupSize >= 6) mergeLabel = 'Cozy Chain';
    else if (groupSize >= 3) mergeLabel = 'Nice Merge';
    else if (groupSize >= 2) mergeLabel = 'Linked';
    MERGE_STATUS_EL.textContent = mergeLabel;
    if (SIDEBAR_MERGE_EL) SIDEBAR_MERGE_EL.textContent = mergeLabel;
}

function showMergeFeedback(message) {
    if (!MERGE_FEEDBACK_EL) return;
    MERGE_FEEDBACK_EL.textContent = message;
    MERGE_FEEDBACK_EL.classList.remove('hidden');
    gsap.killTweensOf(MERGE_FEEDBACK_EL);
    gsap.fromTo(MERGE_FEEDBACK_EL, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.18 });
    clearTimeout(mergeFeedbackTimeout);
    mergeFeedbackTimeout = setTimeout(() => {
        gsap.to(MERGE_FEEDBACK_EL, {
            y: -8,
            opacity: 0,
            duration: 0.22,
            onComplete: () => MERGE_FEEDBACK_EL.classList.add('hidden'),
        });
    }, 900);
}

function celebrateMergeGrowth(groupSize, groupIds) {
    const tier = getMergeTier(groupSize);
    if (!tier) return;
    const message = tier === 4 ? 'Grand merge' : tier === 3 ? 'Cozy chain' : tier === 2 ? 'Nice merge' : 'Tiles linked';
    showMergeFeedback(message);
    updateMergeStatus(groupSize);
    groupIds.forEach((id) => {
        const piece = pieces.find((item) => item.id === id);
        if (!piece) return;
        clearMergeTierClasses(piece);
        piece.el.classList.add(`merge-tier-${tier}`, 'merge-flash');
        setTimeout(() => piece.el.classList.remove('merge-flash'), 420);
    });
    gsap.fromTo(
        groupIds.map((id) => pieces.find((item) => item.id === id)?.el).filter(Boolean),
        { scale: 1 },
        { scale: 1.03 + tier * 0.01, duration: 0.16, yoyo: true, repeat: 1, ease: 'power1.out' }
    );
}

function triggerPeek() {
    if (isMemorizing || !pieces.length || isPeekActive || !REF_IMAGE_EL) return;
    playSound('click');
    isPeekActive = true;
    const peekStatus = document.getElementById('peek-status');
    if (peekStatus) peekStatus.textContent = 'OPEN';
    REF_IMAGE_EL.classList.add('peeking');
    gsap.fromTo(REF_IMAGE_EL, { scale: 1 }, { scale: 1.06, duration: 0.18, yoyo: true, repeat: 1 });
    clearTimeout(peekTimeout);
    peekTimeout = setTimeout(() => {
        isPeekActive = false;
        REF_IMAGE_EL.classList.remove('peeking');
        if (peekStatus) peekStatus.textContent = '2s';
    }, 1800);
}

function toggleZenMode() {
    isZenMode = !isZenMode;
    stopTimer();
    updateModeLabels();
    updateTimerDisplay();
    saveProgress();
    if (!WIN_OVERLAY.classList.contains('hidden') || !pieces.length || isMemorizing) return;
    if (!isZenMode) startTimer();
}

function getRewardSummary(categoryId) {
    const par = getLevelPar(categoryId);
    const efficientMoves = moveCount <= par.moveTarget;
    let stars = 1;
    let speedBonus = 0;
    let bonusLabel = 'Relaxed clear';

    if (!isZenMode) {
        if (timerSeconds <= par.speed && efficientMoves) {
            stars = 3;
            speedBonus = 12;
            bonusLabel = 'Swift and smooth';
        } else if (timerSeconds <= par.great) {
            stars = 2;
            speedBonus = 6;
            bonusLabel = 'Steady rhythm';
        } else {
            bonusLabel = 'Calm finish';
        }
    } else {
        stars = efficientMoves ? 2 : 1;
        bonusLabel = efficientMoves ? 'Zen efficiency' : 'Zen clear';
    }

    const baseCoins = 8 + Math.round((par.moveTarget || 10) / 4);
    return {
        stars,
        speedBonus,
        coins: baseCoins + speedBonus,
        bonusLabel,
        efficientMoves,
    };
}

function renderWinStars(stars) {
    if (!WIN_STARS_EL) return;
    WIN_STARS_EL.querySelectorAll('[data-star]').forEach((starEl, index) => {
        starEl.style.opacity = index < stars ? '1' : '0.25';
        starEl.style.transform = index < stars ? 'scale(1)' : 'scale(0.92)';
    });
}

function persistWinResult(categoryId, puzzleIndex, result) {
    const key = puzzleKey(categoryId, puzzleIndex);
    const previous = playerProgress.bestScores[key];
    const bestTime = previous ? Math.min(previous.bestTime, timerSeconds || previous.bestTime) : timerSeconds;
    playerProgress.bestScores[key] = {
        stars: Math.max(previous?.stars || 0, result.stars),
        bestTime,
        bestMoves: previous ? Math.min(previous.bestMoves, moveCount) : moveCount,
        zenCleared: !!isZenMode || !!previous?.zenCleared,
    };
    playerProgress.coins += result.coins;
    unlockedLevel = Math.max(unlockedLevel, Math.min(categoryId + 1, Object.keys(LEVELS).length));
    saveProgress();
    updateCoinDisplays();
    updateCollectionProgress();
}

// â”€â”€ Audio System â”€â”€
class SoundEngine {
    constructor() {
        this.ctx = null;
        this.enabled = true;
        this.initialized = false;
        this.sfxVolume = 0.4;
    }

    init() {
        if (this.initialized) return;
        try {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
            this.initialized = true;
        } catch {
            console.warn('Web Audio API not supported');
        }
    }

    _tone({ freq, type = 'sine', duration = 0.18, volume = 0.2, delay = 0, attack = 0.02, release = 0.18, detune = 0, lowpass = 1800 }) {
        if (!this.ctx || !this.enabled) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(lowpass, this.ctx.currentTime + delay);
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + delay);
        osc.detune.setValueAtTime(detune, this.ctx.currentTime + delay);
        gain.gain.setValueAtTime(0.0001, this.ctx.currentTime + delay);
        gain.gain.exponentialRampToValueAtTime(volume * this.sfxVolume, this.ctx.currentTime + delay + attack);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + delay + duration + release);
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + delay);
        osc.stop(this.ctx.currentTime + delay + duration + release);
    }

    pickup() {
        this._tone({ freq: 392, type: 'sine', duration: 0.08, volume: 0.12, attack: 0.01, release: 0.08, lowpass: 1200 });
        this._tone({ freq: 523, type: 'triangle', duration: 0.06, volume: 0.08, delay: 0.03, attack: 0.01, release: 0.06, lowpass: 1400 });
    }

    drop() {
        this._tone({ freq: 246.94, type: 'sine', duration: 0.1, volume: 0.11, attack: 0.01, release: 0.12, lowpass: 900 });
        this._tone({ freq: 196, type: 'triangle', duration: 0.08, volume: 0.06, delay: 0.015, attack: 0.01, release: 0.08, lowpass: 700 });
    }

    merge() {
        this._tone({ freq: 392, type: 'triangle', duration: 0.11, volume: 0.12, attack: 0.01, release: 0.1, lowpass: 1400 });
        this._tone({ freq: 493.88, type: 'sine', duration: 0.12, volume: 0.08, delay: 0.05, attack: 0.01, release: 0.12, lowpass: 1700 });
        this._tone({ freq: 587.33, type: 'sine', duration: 0.16, volume: 0.07, delay: 0.1, attack: 0.02, release: 0.14, lowpass: 1900 });
    }

    win() {
        const notes = [392, 493.88, 587.33, 783.99];
        notes.forEach((freq, i) => {
            this._tone({ freq, type: 'triangle', duration: 0.18, volume: 0.11, delay: i * 0.12, attack: 0.02, release: 0.18, lowpass: 1600 });
            this._tone({ freq: freq * 1.25, type: 'sine', duration: 0.16, volume: 0.05, delay: i * 0.12 + 0.04, attack: 0.01, release: 0.16, lowpass: 2100 });
        });
    }

    click() {
        this._tone({ freq: 523.25, type: 'sine', duration: 0.045, volume: 0.06, attack: 0.005, release: 0.05, lowpass: 1300 });
    }
}

const soundEngine = new SoundEngine();

function playSound(type) {
    soundEngine.init();
    if (type === 'snap') soundEngine.merge();
    else if (type === 'drag') soundEngine.pickup();
    else if (type === 'win') soundEngine.win();
    else if (type === 'drop') soundEngine.drop();
    else if (type === 'click') soundEngine.click();
}

function safePlaySound(type) {
    try {
        playSound(type);
    } catch (error) {
        console.warn('Sound playback failed', error);
    }
}

// â”€â”€ Confetti System â”€â”€
class ConfettiSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.running = false;
        this.colors = ['#e8614d', '#22c55e', '#6366f1', '#eab308', '#f97316', '#ec4899', '#14b8a6'];
    }

    resize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    burst(count = 80) {
        this.resize();
        this.particles = [];
        const cx = this.canvas.width / 2;
        const cy = this.canvas.height * 0.35;

        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
            const speed = 3 + Math.random() * 6;
            this.particles.push({
                x: cx,
                y: cy,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 3,
                size: 4 + Math.random() * 6,
                color: this.colors[Math.floor(Math.random() * this.colors.length)],
                rotation: Math.random() * 360,
                rotSpeed: (Math.random() - 0.5) * 12,
                gravity: 0.12 + Math.random() * 0.08,
                friction: 0.98,
                opacity: 1,
                shape: Math.random() > 0.5 ? 'rect' : 'circle',
            });
        }

        if (!this.running) {
            this.running = true;
            this._animate();
        }
    }

    _animate() {
        if (!this.running) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        let alive = 0;
        for (const p of this.particles) {
            p.vy += p.gravity;
            p.vx *= p.friction;
            p.vy *= p.friction;
            p.x += p.vx;
            p.y += p.vy;
            p.rotation += p.rotSpeed;
            p.opacity -= 0.008;

            if (p.opacity <= 0) continue;
            alive++;

            this.ctx.save();
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate((p.rotation * Math.PI) / 180);
            this.ctx.globalAlpha = p.opacity;
            this.ctx.fillStyle = p.color;

            if (p.shape === 'rect') {
                this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
            } else {
                this.ctx.beginPath();
                this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
                this.ctx.fill();
            }
            this.ctx.restore();
        }

        if (alive > 0) {
            requestAnimationFrame(() => this._animate());
        } else {
            this.running = false;
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    stop() {
        this.running = false;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
let confetti = null;

// â”€â”€ Level Configs â”€â”€
// Each level folder has ~20 images. We pick a random one each play.
function buildLevels() {
    const levels = {};
    // Levels 1-7: 3Ã—3 (easy)
    for (let i = 1; i <= 7; i++) {
        levels[i] = { rows: 3, cols: 3, folder: `level${i}` };
    }
    // Levels 8-13: 6Ã—6 (medium)
    for (let i = 8; i <= 13; i++) {
        levels[i] = { rows: 6, cols: 6, folder: `level${i}` };
    }
    // Levels 14-19: 9Ã—9 (hard)
    for (let i = 14; i <= 19; i++) {
        levels[i] = { rows: 9, cols: 9, folder: `level${i}` };
    }
    return levels;
}

const LEVELS = buildLevels();
requestedStart = getRequestedStart();

// Helper: format standard names for puzzles inside a category
function getPuzzleName(categoryId, index) {
    const categoryLabel = String(categoryId).padStart(2, '0');
    const puzzleLabel = String(index + 1).padStart(2, '0');
    return `Puzzle ${categoryLabel}-${puzzleLabel}`;
}

// Get specific image from the level folder
function getSelectedImage(categoryId, puzzleIndex) {
    const config = LEVELS[categoryId];
    if (!config) return `https://picsum.photos/seed/jm${categoryId}/540/540`;
    
    const images = window.LEVEL_IMAGES ? window.LEVEL_IMAGES[categoryId] : null;
    if (images && images.length > puzzleIndex) {
        return `/levels/${config.folder}/${encodeURIComponent(images[puzzleIndex])}`;
    }

    // Fallback
    return `/levels/${config.folder}/1.png`;
}

function getAvailableBoardArea() {
    const boardWrap = BOARD.closest('.board-wrap');
    if (!boardWrap) {
        return { width: 500, height: 600 };
    }

    if (isMobileSidebarMode()) {
        const mobileStage = BOARD.closest('.board-stage');
        if (mobileStage) {
            const stageRect = mobileStage.getBoundingClientRect();
            const drawerBar = mobileStage.querySelector('.mobile-drawer-bar');
            const drawerHeight = drawerBar ? drawerBar.getBoundingClientRect().height : 0;
            const stageStyles = window.getComputedStyle(mobileStage);
            const stageGap = parseFloat(stageStyles.rowGap || stageStyles.gap || '0');
            const boardStyles = window.getComputedStyle(boardWrap);
            const paddingX = parseFloat(boardStyles.paddingLeft || '0') + parseFloat(boardStyles.paddingRight || '0');
            const paddingY = parseFloat(boardStyles.paddingTop || '0') + parseFloat(boardStyles.paddingBottom || '0');

            return {
                width: Math.max(180, boardWrap.clientWidth - paddingX - 24),
                height: Math.max(180, stageRect.height - drawerHeight - stageGap - paddingY - 24),
            };
        }
    }

    const styles = window.getComputedStyle(boardWrap);
    const paddingX = parseFloat(styles.paddingLeft || '0') + parseFloat(styles.paddingRight || '0');
    const paddingY = parseFloat(styles.paddingTop || '0') + parseFloat(styles.paddingBottom || '0');
    const width = Math.max(180, boardWrap.clientWidth - paddingX - 28);
    const height = Math.max(180, boardWrap.clientHeight - paddingY - 28);

    return { width, height };
}

function fitBoardToViewport() {
    if (!BOARD || !pieces.length) return;

    const availableArea = getAvailableBoardArea();
    const boardWidth = BOARD.offsetWidth;
    const boardHeight = BOARD.offsetHeight;
    if (!boardWidth || !boardHeight) return;

    const scale = Math.min(1, availableArea.width / boardWidth, availableArea.height / boardHeight);
    BOARD.style.transform = scale < 1 ? `scale(${scale})` : 'scale(1)';
}

// â”€â”€ Piece Class â”€â”€
class Piece {
    constructor(id, col, row, width, height, imageUrl, backImageUrl, totalCols, totalRows, imgW, imgH) {
        this.id = id;
        this.correctCol = col;
        this.correctRow = row;
        this.currentCol = col;  // Will be shuffled
        this.currentRow = row;
        this.width = width;
        this.height = height;
        this.groupId = null;

        // Correct pixel position in solved puzzle
        this.correctX = col * width;
        this.correctY = row * height;

        // Current pixel position (derived from grid)
        this.x = 0;
        this.y = 0;

        // DOM
        this.el = document.createElement('div');
        this.el.className = 'piece-container';
        this.el.id = `piece-${id}`;
        this.el.style.width = `${width}px`;
        this.el.style.height = `${height}px`;

        this.inner = document.createElement('div');
        this.inner.className = 'piece-inner';

        this.front = document.createElement('div');
        this.front.className = 'piece-front';
        this.front.style.backgroundImage = `url("${imageUrl}")`;
        // Use natural image dimensions for background-size â€” no scaling
        this.front.style.backgroundSize = `${imgW}px ${imgH}px`;
        this.front.style.backgroundPosition = `-${this.correctX}px -${this.correctY}px`;

        this.back = document.createElement('div');
        this.back.className = 'piece-back';
        this.back.style.backgroundImage = `url("${backImageUrl}")`;
        this.back.style.backgroundSize = 'cover';
        this.back.style.backgroundPosition = 'center';

        this.inner.appendChild(this.front);
        this.inner.appendChild(this.back);
        this.el.appendChild(this.inner);

        BOARD.appendChild(this.el);
        this.el.addEventListener('pointerdown', handlePointerDown);
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
        gsap.set(this.el, { x: this.x, y: this.y });
    }

    setGridPosition(col, row) {
        this.currentCol = col;
        this.currentRow = row;
        this.setPosition(col * this.width, row * this.height);
    }

    animateToGrid(col, row, duration = 0.25) {
        this.currentCol = col;
        this.currentRow = row;
        const tgtX = col * this.width;
        const tgtY = row * this.height;
        return gsap.to(this.el, {
            x: tgtX, y: tgtY,
            duration,
            ease: 'power2.out',
            onComplete: () => { this.x = tgtX; this.y = tgtY; }
        });
    }
}

// â”€â”€ Drag State â”€â”€
let draggingGroup = null;
let dragOffsets = {};
let startPointer = { x: 0, y: 0 };
let isMemorizing = false;
let boardRect = null;

// â”€â”€ Timer â”€â”€
function startTimer() {
    stopTimer();
    timerSeconds = 0;
    updateTimerDisplay();
    if (isZenMode) return;
    timerInterval = setInterval(() => {
        timerSeconds++;
        updateTimerDisplay();
    }, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function updateTimerDisplay() {
    if (!TIMER_EL) return;
    const timeText = isZenMode ? 'Zen' : formatTime(timerSeconds);
    TIMER_EL.textContent = timeText;
    if (SIDEBAR_TIME_EL) SIDEBAR_TIME_EL.textContent = timeText;
}

function updateMoveCount() {
    if (MOVE_COUNT_EL) MOVE_COUNT_EL.textContent = moveCount;
    if (SIDEBAR_MOVES_EL) SIDEBAR_MOVES_EL.textContent = moveCount;
}

// â”€â”€ Grid Helpers â”€â”€
function buildGrid(rows, cols) {
    grid = [];
    for (let r = 0; r < rows; r++) {
        grid[r] = [];
        for (let c = 0; c < cols; c++) {
            grid[r][c] = null;
        }
    }
}

function getPieceAt(col, row) {
    if (row < 0 || row >= gridRows || col < 0 || col >= gridCols) return null;
    const pid = grid[row][col];
    if (pid == null) return null;
    return pieces.find(p => p.id === pid);
}

// â”€â”€ Init Level â”€â”€
function initLevel(categoryId, puzzleIndex) {
    WIN_OVERLAY.classList.add('hidden');
    BOARD.innerHTML = '';
    pieces = [];
    groups = {};
    nextGroupId = 1;
    moveCount = 0;
    topZIndex = 10;
    updateMoveCount();
    currentCategory = categoryId;
    currentPuzzleIndex = puzzleIndex;
    saveProgress();
    updateModeLabels();
    updateCollectionProgress();
    updateBestScorePanel(categoryId, puzzleIndex);
    updateMergeStatus(1);
    openSidebarPanel('reference-panel', false);
    
    const puzzleName = getPuzzleName(categoryId, puzzleIndex);
    LEVEL_DISPLAY.innerText = `Level ${categoryId} - ${puzzleName}`;

    const config = LEVELS[categoryId] || LEVELS[1];
    gridRows = config.rows;
    gridCols = config.cols;

    const imageUrl = getSelectedImage(categoryId, puzzleIndex);

    // Load image to get natural dimensions
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
        const imgW = img.naturalWidth;
        const imgH = img.naturalHeight;
        setupBoard(categoryId, config, imageUrl, imgW, imgH);
    };
    img.onerror = () => {
        // Fallback: use default dimensions
        setupBoard(categoryId, config, imageUrl, 540, 540);
    };
    img.src = imageUrl;
}

function setupBoard(levelNum, config, imageUrl, imgW, imgH) {
    const { rows, cols } = config;

    const availableArea = getAvailableBoardArea();
    const maxBoardW = availableArea.width;
    const maxBoardH = availableArea.height;

    let boardW = imgW;
    let boardH = imgH;

    // Scale down if needed to fit viewport, maintaining aspect ratio
    if (boardW > maxBoardW || boardH > maxBoardH) {
        const scaleW = maxBoardW / boardW;
        const scaleH = maxBoardH / boardH;
        const scale = Math.min(scaleW, scaleH);
        boardW = Math.floor(boardW * scale);
        boardH = Math.floor(boardH * scale);
    }

    // Make board dimensions divisible by grid size
    boardW = Math.floor(boardW / cols) * cols;
    boardH = Math.floor(boardH / rows) * rows;

    pieceW = boardW / cols;
    pieceH = boardH / rows;

    // Board sizing (add border)
    const borderSize = 8;
    BOARD.style.width = `${boardW + borderSize * 2}px`;
    BOARD.style.height = `${boardH + borderSize * 2}px`;
    BOARD.style.transform = 'scale(1)';

    // Set reference image
    if (REF_IMAGE_EL) {
        REF_IMAGE_EL.style.backgroundImage = `url("${imageUrl}")`;
        REF_IMAGE_EL.style.backgroundSize = 'contain';
        REF_IMAGE_EL.style.backgroundRepeat = 'no-repeat';
        REF_IMAGE_EL.style.backgroundPosition = 'center';
    }

    buildGrid(rows, cols);

    // Create all pieces
    let idCounter = 1;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const redBack = 'Assets/jigmerge_back_card_red.png';
            const blueBack = 'Assets/jigmerge_back_card_blue.png';
            const backImageUrl = (r + c) % 2 === 0 ? redBack : blueBack;

            const piece = new Piece(
                idCounter, c, r,
                pieceW, pieceH,
                imageUrl, backImageUrl,
                cols, rows,
                boardW, boardH  // Use board dimensions for backgroundSize
            );

            const gId = nextGroupId++;
            piece.groupId = gId;
            groups[gId] = [piece.id];

            pieces.push(piece);
            idCounter++;
        }
    }

    // Place pieces in correct positions for memorize phase
    pieces.forEach(p => {
        grid[p.correctRow][p.correctCol] = p.id;
        p.setGridPosition(p.correctCol, p.correctRow);
        p.el.style.zIndex = topZIndex;
        p.inner.classList.add('flipped'); // Show image
    });

    fitBoardToViewport();

    // Memorize phase
    isMemorizing = true;
    const memorizeOverlay = document.getElementById('memorize-overlay');
    memorizeOverlay.classList.remove('hidden');

    setTimeout(() => {
        memorizeOverlay.classList.add('hidden');

        // Shuffle pieces on the grid
        shuffleGrid();

        // Face-down first
        pieces.forEach(p => p.inner.classList.remove('flipped'));

        // Wait 2s before starting shuffle animation
        setTimeout(() => {
            // Animate to shuffled positions
            const tl = gsap.timeline();
            pieces.forEach((piece, index) => {
                tl.add(() => {
                    piece.animateToGrid(piece.currentCol, piece.currentRow, 0.3);
                    playSound('snap');
                }, index * 0.04);
            });

            // Flip back and start game
            tl.add(() => {
                pieces.forEach(p => p.inner.classList.add('flipped'));
                isMemorizing = false;
                fitBoardToViewport();
                startTimer();
            }, '+=0.3');
        }, 2000);

    }, 3000);
}

function shuffleGrid() {
    // Fisher-Yates shuffle of grid positions
    const positions = [];
    for (let r = 0; r < gridRows; r++) {
        for (let c = 0; c < gridCols; c++) {
            positions.push({ col: c, row: r });
        }
    }

    // Shuffle
    for (let i = positions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [positions[i], positions[j]] = [positions[j], positions[i]];
    }

    // Ensure no piece is in its correct position (derangement)
    // Simple check: if any piece would be in correct spot, swap with next
    const pieceList = [...pieces];
    for (let i = 0; i < pieceList.length; i++) {
        const pos = positions[i];
        if (pieceList[i].correctCol === pos.col && pieceList[i].correctRow === pos.row) {
            // Swap with next (wrap around)
            const swapIdx = (i + 1) % positions.length;
            [positions[i], positions[swapIdx]] = [positions[swapIdx], positions[i]];
        }
    }

    // Assign shuffled positions
    buildGrid(gridRows, gridCols);
    for (let i = 0; i < pieceList.length; i++) {
        const p = pieceList[i];
        const pos = positions[i];
        p.currentCol = pos.col;
        p.currentRow = pos.row;
        grid[pos.row][pos.col] = p.id;
    }
}

// â”€â”€ Pointer Handlers â”€â”€
function handlePointerDown(e) {
    if (isMemorizing) return;
    if (e.button !== 0 && e.type !== 'touchstart') return;

    const pieceEl = e.target.closest('.piece-container');
    if (!pieceEl) return;

    const pieceId = parseInt(pieceEl.id.split('-')[1]);
    const piece = pieces.find(p => p.id === pieceId);
    if (!piece) return;

    draggingGroup = piece.groupId;
    const groupPieceIds = groups[draggingGroup];
    if (!groupPieceIds) return;

    playSound('drag');

    topZIndex += 10; // increase significantly to ensure group is on top

    // Cache board rect for coordinate conversion
    boardRect = BOARD.getBoundingClientRect();

    startPointer.x = e.clientX;
    startPointer.y = e.clientY;

    // Store each piece's original grid position and pixel offset from pointer
    dragOffsets = {};
    groupPieceIds.forEach(id => {
        const p = pieces.find(p => p.id === id);
        p.el.classList.add('dragging');
        p.el.style.zIndex = topZIndex;
        dragOffsets[p.id] = {
            dx: p.x - (e.clientX - boardRect.left),
            dy: p.y - (e.clientY - boardRect.top),
            origCol: p.currentCol,
            origRow: p.currentRow
        };
    });

    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);
    document.addEventListener('pointercancel', handlePointerUp);
}

function handlePointerMove(e) {
    if (!draggingGroup) return;

    const groupPieceIds = groups[draggingGroup];
    const boardX = e.clientX - boardRect.left;
    const boardY = e.clientY - boardRect.top;

    groupPieceIds.forEach(id => {
        const p = pieces.find(p => p.id === id);
        const propX = boardX + dragOffsets[p.id].dx;
        const propY = boardY + dragOffsets[p.id].dy;
        p.x = propX;
        p.y = propY;
        gsap.set(p.el, { x: propX, y: propY });
    });
}

function handlePointerUp() {
    document.removeEventListener('pointermove', handlePointerMove);
    document.removeEventListener('pointerup', handlePointerUp);
    document.removeEventListener('pointercancel', handlePointerUp);

    if (!draggingGroup) return;

    const groupPieceIds = groups[draggingGroup];
    groupPieceIds.forEach(id => {
        const p = pieces.find(p => p.id === id);
        p.el.classList.remove('dragging');
    });

    handleDrop(draggingGroup);

    draggingGroup = null;
    dragOffsets = {};
}

function handleDrop(movedGroupId) {
    const movedPieceIds = groups[movedGroupId];
    const movedPieces = movedPieceIds.map(id => pieces.find(p => p.id === id));
    const primaryPiece = movedPieces[0];

    // Where the primary piece is now (snap to nearest grid cell)
    const hoverCol = Math.round(primaryPiece.x / pieceW);
    const hoverRow = Math.round(primaryPiece.y / pieceH);

    const deltaCol = hoverCol - dragOffsets[primaryPiece.id].origCol;
    const deltaRow = hoverRow - dragOffsets[primaryPiece.id].origRow;

    if (deltaCol === 0 && deltaRow === 0) {
        bounceBack(movedPieces);
        return;
    }

    const moveMap = [];
    const targetCells = [];
    const originCells = [];
    
    for (const p of movedPieces) {
        const origCol = dragOffsets[p.id].origCol;
        const origRow = dragOffsets[p.id].origRow;
        const newCol = origCol + deltaCol;
        const newRow = origRow + deltaRow;

        // Bounds check
        if (newCol < 0 || newCol >= gridCols || newRow < 0 || newRow >= gridRows) {
            bounceBack(movedPieces);
            return;
        }
        
        moveMap.push({ piece: p, origCol, origRow, newCol, newRow });
        targetCells.push({ col: newCol, row: newRow });
        originCells.push({ col: origCol, row: origRow });
    }

    const newCellsSet = new Set(targetCells.map(c => `${c.col},${c.row}`));
    const origCellsSet = new Set(originCells.map(c => `${c.col},${c.row}`));

    const displacedPieces = [];
    for (const cell of targetCells) {
        const key = `${cell.col},${cell.row}`;
        if (origCellsSet.has(key)) continue;

        const occupant = getPieceAt(cell.col, cell.row);
        if (occupant && !movedPieceIds.includes(occupant.id)) {
            displacedPieces.push(occupant);
        }
    }

    const freedCells = originCells.filter(c => !newCellsSet.has(`${c.col},${c.row}`));

    if (displacedPieces.length !== freedCells.length) {
        bounceBack(movedPieces);
        return;
    }

    // --- Atomic Grid Update ---
    for (const m of moveMap) {
        grid[m.origRow][m.origCol] = null;
    }
    for (const dp of displacedPieces) {
        grid[dp.currentRow][dp.currentCol] = null;
    }

    for (let i = 0; i < displacedPieces.length; i++) {
        const dp = displacedPieces[i];
        const fc = freedCells[i];
        grid[fc.row][fc.col] = dp.id;
        dp.animateToGrid(fc.col, fc.row, 0.2);
        dp.el.style.zIndex = topZIndex - 1;
    }

    for (const m of moveMap) {
        grid[m.newRow][m.newCol] = m.piece.id;
        m.piece.animateToGrid(m.newCol, m.newRow, 0.2);
    }

    playSound('snap');
    moveCount++;
    updateMoveCount();

    setTimeout(() => {
        checkAllMerges();
    }, 280);
}

function bounceBack(movedPieces) {
    movedPieces.forEach(p => {
        const origCol = dragOffsets[p.id] ? dragOffsets[p.id].origCol : p.currentCol;
        const origRow = dragOffsets[p.id] ? dragOffsets[p.id].origRow : p.currentRow;
        p.animateToGrid(origCol, origRow, 0.2);
    });
    playSound('drag');
}

// â”€â”€ Merge Logic (Grid-Based) â”€â”€
function checkAllMerges() {
    const oldGroupSizes = {};
    Object.entries(groups).forEach(([, pieceIds]) => {
        pieceIds.forEach((id) => {
            oldGroupSizes[id] = pieceIds.length;
        });
    });

    // Reset all groups 
    groups = {};
    nextGroupId = 1;
    pieces.forEach(p => {
        clearMergeTierClasses(p);
        p.groupId = nextGroupId++;
        groups[p.groupId] = [p.id];
    });

    // Rebuild groups based on current adjacency
    let merged = true;
    while (merged) {
        merged = false;
        for (let r = 0; r < gridRows; r++) {
            for (let c = 0; c < gridCols; c++) {
                const piece = getPieceAt(c, r);
                if (!piece) continue;

                // Check right neighbor
                if (c + 1 < gridCols) {
                    const neighbor = getPieceAt(c + 1, r);
                    if (neighbor && neighbor.groupId !== piece.groupId && shouldMerge(piece, neighbor)) {
                        mergeGroupsSilent(piece.groupId, neighbor.groupId);
                        merged = true;
                    }
                }
                // Check bottom neighbor
                if (r + 1 < gridRows) {
                    const neighbor = getPieceAt(c, r + 1);
                    if (neighbor && neighbor.groupId !== piece.groupId && shouldMerge(piece, neighbor)) {
                        mergeGroupsSilent(piece.groupId, neighbor.groupId);
                        merged = true;
                    }
                }
            }
        }
    }

    let didGrow = false;
    let biggestGroup = 1;
    Object.values(groups).forEach((groupIds) => {
        const size = groupIds.length;
        biggestGroup = Math.max(biggestGroup, size);
        groupIds.forEach((id) => {
            const piece = pieces.find((item) => item.id === id);
            if (!piece) return;
            const tier = getMergeTier(size);
            if (tier) piece.el.classList.add(`merge-tier-${tier}`);
        });
        const previousLargest = Math.max(...groupIds.map((id) => oldGroupSizes[id] || 1));
        if (size > previousLargest && size > 1) {
            didGrow = true;
            celebrateMergeGrowth(size, groupIds);
        }
    });

    updateMergeStatus(biggestGroup);

    if (didGrow) {
        playSound('snap');
    }

    checkWinCondition();
}

function shouldMerge(pieceA, pieceB) {
    const currentDeltaCol = pieceB.currentCol - pieceA.currentCol;
    const currentDeltaRow = pieceB.currentRow - pieceA.currentRow;

    const correctDeltaCol = pieceB.correctCol - pieceA.correctCol;
    const correctDeltaRow = pieceB.correctRow - pieceA.correctRow;

    return currentDeltaCol === correctDeltaCol && currentDeltaRow === correctDeltaRow;
}

function mergeGroupsSilent(groupIdA, groupIdB) {
    if (groupIdA === groupIdB) return;
    if (!groups[groupIdA] || !groups[groupIdB]) return;

    // Merge B into A
    const piecesB = groups[groupIdB].map(id => pieces.find(p => p.id === id));
    piecesB.forEach(p => {
        p.groupId = groupIdA;
        if (!groups[groupIdA].includes(p.id)) {
            groups[groupIdA].push(p.id);
        }
    });

    delete groups[groupIdB];
}

function checkWinCondition() {
    setTimeout(() => {
        const remainingGroups = Object.keys(groups);
        if (remainingGroups.length === 1) {
            const finalGroup = groups[remainingGroups[0]];
            if (finalGroup.length === pieces.length) {
                stopTimer();
                playSound('win');
                const reward = getRewardSummary(currentCategory, currentPuzzleIndex);
                persistWinResult(currentCategory, currentPuzzleIndex, reward);
                
                // Update win card stats
                const winMoves = document.getElementById('win-moves');
                if (winMoves) winMoves.textContent = moveCount;
                if (WIN_TIME_EL) WIN_TIME_EL.textContent = isZenMode ? 'ZEN' : formatTime(timerSeconds);
                if (WIN_COINS_EL) WIN_COINS_EL.textContent = reward.coins;
                if (WIN_BONUS_LINE_EL) WIN_BONUS_LINE_EL.textContent = reward.speedBonus
                    ? `${reward.bonusLabel} +${reward.speedBonus} bonus`
                    : reward.bonusLabel;
                renderWinStars(reward.stars);
                
                WIN_OVERLAY.classList.remove('hidden');
                gsap.fromTo('.win-modal', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' });
                
                if (!confetti) confetti = new ConfettiSystem(document.getElementById('confetti-canvas'));
                confetti.burst(120);
            }
        }
    }, 200);
}

// â”€â”€ Screen Routing â”€â”€
const MAIN_MENU = document.getElementById('main-menu');
const GAME_HEADER = document.getElementById('game-header');
const LEVEL_SELECT = document.getElementById('level-select-screen');
const CATEGORY_GRID = document.getElementById('category-grid');
const PUZZLE_GRID = document.getElementById('puzzle-grid');
const GAME_AREA = document.getElementById('game-area');

NEXT_BTN.addEventListener('click', () => {
    playSound('click');
    let nextPuzzle = currentPuzzleIndex + 1;
    
    // Check if we reached the end of the category
    const images = window.LEVEL_IMAGES ? window.LEVEL_IMAGES[currentCategory] : null;
    const maxPuzzles = images ? images.length : 20;
    
    if (nextPuzzle >= maxPuzzles) {
        currentCategory++;
        nextPuzzle = 0;
        if (currentCategory > Object.keys(LEVELS).length) {
            currentCategory = 1;
            showCategorySelect(); // reached end of game
            return;
        }
    }
    
    currentPuzzleIndex = nextPuzzle;
    if (currentCategory > unlockedLevel) unlockedLevel = currentCategory;
    
    showGame();
    setTimeout(() => initLevel(currentCategory, currentPuzzleIndex), 100);
});

function showMainMenu() {
    MAIN_MENU.classList.remove('hidden');
    GAME_HEADER.classList.add('hidden');
    BOARD.classList.add('hidden');
    LEVEL_SELECT.classList.add('hidden');
    WIN_OVERLAY.classList.add('hidden');
    if (GAME_AREA) GAME_AREA.classList.add('hidden');
    stopTimer();
    updateModeLabels();
    updateCoinDisplays();
    updateCollectionProgress();
}

function showCategorySelect() {
    MAIN_MENU.classList.add('hidden');
    GAME_HEADER.classList.add('hidden');
    BOARD.classList.add('hidden');
    LEVEL_SELECT.classList.remove('hidden');
    if (GAME_AREA) GAME_AREA.classList.add('hidden');
    
    document.getElementById('level-screen-title').innerText = 'LEVELS';
    document.getElementById('level-screen-subtitle').style.display = 'block';
    document.getElementById('level-screen-subtitle').textContent = 'Pick a collection';
    
    PUZZLE_GRID.classList.add('hidden');
    PUZZLE_GRID.classList.remove('collection-groups');
    CATEGORY_GRID.classList.remove('hidden');
    
    generateCategoryGrid();
    updateCollectionProgress();
}

function showGame() {
    MAIN_MENU.classList.add('hidden');
    LEVEL_SELECT.classList.add('hidden');
    GAME_HEADER.classList.remove('hidden');
    BOARD.classList.remove('hidden');
    if (GAME_AREA) GAME_AREA.classList.remove('hidden');
    updateModeLabels();
    updateCoinDisplays();
    openSidebarPanel('reference-panel', false);
    setTimeout(syncSidebarBehavior, 60);
}

// â”€â”€ Level Grids â”€â”€
function generateCategoryGrid() {
    CATEGORY_GRID.innerHTML = '';
    const totalLevels = Object.keys(LEVELS).length;

    for (let i = 1; i <= totalLevels; i++) {
        const btn = document.createElement('button');
        btn.className = 'wood-btn level-btn';

        const config = LEVELS[i];
        const sizeLabel = `${config.rows}Ã—${config.cols}`;
        
        // Check puzzle count
        const images = window.LEVEL_IMAGES ? window.LEVEL_IMAGES[i] : null;
        const count = images ? images.length : 20;

        const lockSvg = `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`;

        if (i > unlockedLevel) {
            btn.classList.add('locked');
            btn.innerHTML = `
                <div style="width: 100%; flex: 1; min-height: 0; display: flex; align-items: center; justify-content: center; background-color: rgba(0,0,0,0.1); border-radius: 6px; margin-bottom: 4px;">
                    ${lockSvg}
                </div>
                <span style="font-size: 14px; letter-spacing: 0;">Level ${i}</span>
                <span class="level-size" style="font-size: 10px; letter-spacing: 0;">${sizeLabel}</span>
            `;
        } else {
            const firstImgUrl = images && images.length > 0 ? `/levels/${config.folder}/${encodeURIComponent(images[0])}` : '';
            const imgStyle = firstImgUrl ? `background-image: url('${firstImgUrl}'); background-size: contain; background-repeat: no-repeat; background-position: center; border-radius: 6px; width: 100%; flex: 1; min-height: 0; margin-bottom: 4px;` : `width: 100%; flex: 1; min-height: 0; background-color: rgba(0,0,0,0.1); border-radius: 6px; margin-bottom: 4px;`;
            const completedInLevel = Object.keys(playerProgress.bestScores).filter(key => key.startsWith(`${i}:`)).length;
            btn.innerHTML = `
                <div style="${imgStyle}"></div>
                <span style="font-size: 14px; letter-spacing: 0;">Level ${i}</span>
                <span class="stars-mini" style="font-size: 10px; letter-spacing: 0; margin-bottom: 0;">${completedInLevel}/${count} cleared</span>
            `;
            btn.addEventListener('click', () => showPuzzleSelect(i));
        }
        CATEGORY_GRID.appendChild(btn);
    }
}

function showPuzzleSelect(categoryId) {
    document.getElementById('level-screen-title').innerText = `COLLECTION ${String(categoryId).padStart(2, '0')}`;
    document.getElementById('level-screen-subtitle').style.display = 'block';
    document.getElementById('level-screen-subtitle').textContent = 'Choose a puzzle set';
    
    CATEGORY_GRID.classList.add('hidden');
    PUZZLE_GRID.classList.remove('hidden');
    
    generatePuzzleGrid(categoryId);
}

function generatePuzzleGrid(categoryId) {
    if (!PUZZLE_GRID) return;

    const config = LEVELS[categoryId] || LEVELS[1];
    const images = window.LEVEL_IMAGES ? (window.LEVEL_IMAGES[categoryId] || []) : [];
    const firstImageUrl = images.length > 0
        ? `/levels/${config.folder}/${encodeURIComponent(images[0])}`
        : '';
    const isLastPlayed = playerProgress.lastPlayed?.category === categoryId;

    PUZZLE_GRID.innerHTML = '';
    PUZZLE_GRID.classList.add('collection-groups');

    const group = document.createElement('section');
    group.className = 'puzzle-group';
    group.innerHTML = `
        <div class="puzzle-group-header">
            <div>
                <div class="puzzle-group-title">Collection ${String(categoryId).padStart(2, '0')}</div>
                <div class="puzzle-group-meta">${config.rows}x${config.cols} board</div>
            </div>
            ${isLastPlayed ? '<span class="last-played-pill">Last played</span>' : ''}
        </div>
        <div class="puzzle-group-cover">
            <div class="puzzle-group-cover-thumb"${firstImageUrl ? ` style="background-image:url('${firstImageUrl}')"` : ''}></div>
            <div class="puzzle-group-cover-meta">
                <div class="puzzle-group-title">Puzzle Set</div>
                <div class="puzzle-group-desc">Pick any puzzle in this collection and rebuild the full image by swapping tiles into place.</div>
            </div>
        </div>
    `;

    const gridEl = document.createElement('div');
    gridEl.className = 'puzzle-group-grid';

    if (!images.length) {
        const emptyState = document.createElement('p');
        emptyState.className = 'sidebar-hint';
        emptyState.textContent = 'No puzzles are available in this collection yet.';
        group.appendChild(emptyState);
        PUZZLE_GRID.appendChild(group);
        return;
    }

    images.forEach((imageName, index) => {
        const btn = document.createElement('button');
        btn.className = 'wood-btn level-btn';

        const thumbUrl = `/levels/${config.folder}/${encodeURIComponent(imageName)}`;
        const best = getBestScore(categoryId, index);
        const starLabel = best ? `${'★'.repeat(best.stars)}${'☆'.repeat(3 - best.stars)}` : 'New';
        const puzzleLabel = String(index + 1).padStart(2, '0');

        btn.innerHTML = `
            <div style="width:100%;flex:1;min-height:0;background-image:url('${thumbUrl}');background-size:contain;background-repeat:no-repeat;background-position:center;border-radius:6px;margin-bottom:4px;"></div>
            <span style="font-size:14px;letter-spacing:0;">Puzzle ${puzzleLabel}</span>
            <span class="stars-mini" style="font-size:10px;letter-spacing:0;">${starLabel}</span>
        `;

        btn.addEventListener('click', () => {
            playSound('click');
            currentCategory = categoryId;
            currentPuzzleIndex = index;
            showGame();
            setTimeout(() => initLevel(categoryId, index), 100);
        });

        gridEl.appendChild(btn);
    });

    group.appendChild(gridEl);
    PUZZLE_GRID.appendChild(group);
}

// â”€â”€ UI Wiring â”€â”€

// Sound & Volume Toggles
const soundToggleMenu = document.getElementById('sound-toggle-menu');
const soundToggleGame = document.getElementById('sound-toggle-game');
const volumeSliderMenu = document.getElementById('volume-slider-menu');
const volumeSliderGame = document.getElementById('volume-slider-game');
let isMuted = false;

function toggleMute(e) {
    // prevent clicking volume slider from triggering mute
    if (e.target.tagName.toLowerCase() === 'input') return;
    
    isMuted = !isMuted;
    soundEngine.enabled = !isMuted;
    
    // Update icons
    const iconState = isMuted 
        ? `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line>`
        : `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>`;
        
    if (soundToggleMenu) document.getElementById('sound-icon-menu').innerHTML = iconState;
    if (soundToggleGame) document.getElementById('sound-icon-game').innerHTML = iconState;
}

if (soundToggleMenu) soundToggleMenu.addEventListener('click', (e) => { toggleMute(e); playSound('click'); });
if (soundToggleGame) soundToggleGame.addEventListener('click', (e) => { toggleMute(e); playSound('click'); });

function updateVolume(e) {
    const val = e.target.value;
    soundEngine.sfxVolume = parseFloat(val);
    if (volumeSliderMenu && e.target !== volumeSliderMenu) volumeSliderMenu.value = val;
    if (volumeSliderGame && e.target !== volumeSliderGame) volumeSliderGame.value = val;
}

if (volumeSliderMenu) volumeSliderMenu.addEventListener('input', updateVolume);
if (volumeSliderGame) volumeSliderGame.addEventListener('input', updateVolume);

// Shop
const openShopBtn = document.getElementById('open-shop');
const openShopMenuBtn = document.getElementById('open-shop-menu');
const closeShopBtn = document.getElementById('close-shop-btn');
const shopOverlay = document.getElementById('shop-overlay');
const openShopSideBtn = document.getElementById('btn-open-shop-side');

if (openShopBtn && shopOverlay) {
    openShopBtn.addEventListener('click', () => {
        playSound('click');
        renderShop();
        shopOverlay.classList.remove('hidden');
    });
}
if (openShopMenuBtn && shopOverlay) {
    openShopMenuBtn.addEventListener('click', () => {
        playSound('click');
        renderShop();
        shopOverlay.classList.remove('hidden');
    });
}
if (openShopSideBtn && shopOverlay) {
    openShopSideBtn.addEventListener('click', () => {
        playSound('click');
        renderShop();
        shopOverlay.classList.remove('hidden');
    });
}
if (closeShopBtn && shopOverlay) {
    closeShopBtn.addEventListener('click', () => {
        playSound('click');
        shopOverlay.classList.add('hidden');
    });
}

const peekBtn = document.getElementById('btn-peek');
if (peekBtn) peekBtn.addEventListener('click', triggerPeek);

SIDEBAR_TABS.forEach((tab) => {
    tab.addEventListener('click', () => {
        playSound('click');
        const panelId = tab.getAttribute('data-sidebar-panel');
        openSidebarPanel(panelId);
    });
});

function openSidebarPanel(panelId, forceExpand = true) {
    if (!GAME_SIDEBAR_EL) return;
    if (forceExpand) expandSidebar(true);
    SIDEBAR_TABS.forEach((tab) => {
        tab.classList.toggle('active', tab.getAttribute('data-sidebar-panel') === panelId);
    });
    document.querySelectorAll('.sidebar-panel').forEach((panel) => {
        panel.classList.toggle('active', panel.id === panelId);
    });
}

function isSidebarAutoMode() {
    return !!(window.matchMedia && window.matchMedia('(hover: hover)').matches);
}

function isMobileSidebarMode() {
    return !!(window.matchMedia && window.matchMedia('(max-width: 780px)').matches);
}

function syncMobileBackdrop() {
    if (!MOBILE_PANEL_BACKDROP_EL || !GAME_AREA) return;
    const isOpen = GAME_AREA.classList.contains('mobile-sidebar-open') || GAME_AREA.classList.contains('mobile-perks-open');
    MOBILE_PANEL_BACKDROP_EL.classList.toggle('hidden', !isOpen);
}

function syncMobileDrawerTriggers() {
    if (!GAME_AREA) return;
    const sidebarOpen = GAME_AREA.classList.contains('mobile-sidebar-open');
    const perksOpen = GAME_AREA.classList.contains('mobile-perks-open');

    if (MOBILE_SIDEBAR_TRIGGER_EL) {
        MOBILE_SIDEBAR_TRIGGER_EL.classList.toggle('is-active', sidebarOpen);
        MOBILE_SIDEBAR_TRIGGER_EL.setAttribute('aria-expanded', sidebarOpen ? 'true' : 'false');
    }

    if (MOBILE_PERKS_TRIGGER_EL) {
        MOBILE_PERKS_TRIGGER_EL.classList.toggle('is-active', perksOpen);
        MOBILE_PERKS_TRIGGER_EL.setAttribute('aria-expanded', perksOpen ? 'true' : 'false');
    }
}

function closeMobilePanels() {
    if (!GAME_AREA) return;
    GAME_AREA.classList.remove('mobile-sidebar-open', 'mobile-perks-open');
    syncMobileBackdrop();
    syncMobileDrawerTriggers();
}

function updateSidebarWidthCache() {
    if (!GAME_SIDEBAR_EL) return sidebarExpandedWidth;
    const width = Math.max(220, Math.round(GAME_SIDEBAR_EL.scrollWidth || GAME_SIDEBAR_EL.getBoundingClientRect().width || sidebarExpandedWidth));
    sidebarExpandedWidth = width;
    return sidebarExpandedWidth;
}

function updatePerksSidebarWidthCache() {
    if (!PERKS_SIDEBAR_EL) return perksSidebarExpandedWidth;
    const width = Math.max(180, Math.round(PERKS_SIDEBAR_EL.scrollWidth || PERKS_SIDEBAR_EL.getBoundingClientRect().width || perksSidebarExpandedWidth));
    perksSidebarExpandedWidth = width;
    return perksSidebarExpandedWidth;
}

function clearSidebarHideTimer() {
    clearTimeout(sidebarHideTimer);
    sidebarHideTimer = null;
}

function clearPerksSidebarHideTimer() {
    clearTimeout(perksSidebarHideTimer);
    perksSidebarHideTimer = null;
}

function expandSidebar(immediate = false) {
    if (!GAME_SIDEBAR_EL || !GAME_AREA) return;
    clearSidebarHideTimer();
    GAME_SIDEBAR_EL.classList.remove('collapsed');
    GAME_AREA.classList.remove('sidebar-hidden');

    if (isMobileSidebarMode()) {
        GAME_AREA.classList.add('mobile-sidebar-open');
        GAME_AREA.classList.remove('mobile-perks-open');
        gsap.killTweensOf(GAME_SIDEBAR_EL);
        gsap.set(GAME_SIDEBAR_EL, { clearProps: 'x,opacity,pointerEvents' });
        syncMobileBackdrop();
        syncMobileDrawerTriggers();
        return;
    }

    if (!isSidebarAutoMode()) {
        gsap.set(GAME_SIDEBAR_EL, { clearProps: 'x,opacity,pointerEvents' });
        gsap.set(GAME_AREA, { '--right-sidebar-width': `${sidebarExpandedWidth}px` });
        return;
    }

    const width = updateSidebarWidthCache();
    gsap.killTweensOf([GAME_SIDEBAR_EL, GAME_AREA]);
    gsap.to(GAME_AREA, {
        '--right-sidebar-width': `${width}px`,
        duration: immediate ? 0.18 : 0.24,
        ease: 'power2.out',
    });
    gsap.to(GAME_SIDEBAR_EL, {
        x: 0,
        opacity: 1,
        pointerEvents: 'auto',
        duration: immediate ? 0.18 : 0.24,
        ease: 'power2.out',
    });
}

function collapseSidebar(immediate = false) {
    if (!GAME_SIDEBAR_EL || !GAME_AREA) return;
    if (isMobileSidebarMode()) {
        GAME_AREA.classList.remove('mobile-sidebar-open');
        syncMobileBackdrop();
        syncMobileDrawerTriggers();
        return;
    }
    if (!isSidebarAutoMode() || sidebarPinnedOpen) return;
    clearSidebarHideTimer();
    updateSidebarWidthCache();
    GAME_SIDEBAR_EL.classList.add('collapsed');
    GAME_AREA.classList.add('sidebar-hidden');
    gsap.killTweensOf([GAME_SIDEBAR_EL, GAME_AREA]);
    gsap.to(GAME_AREA, {
        '--right-sidebar-width': '0px',
        duration: immediate ? 0.2 : 0.28,
        ease: 'power2.inOut',
    });
    gsap.to(GAME_SIDEBAR_EL, {
        x: sidebarExpandedWidth + 18,
        opacity: 0.2,
        pointerEvents: 'none',
        duration: immediate ? 0.2 : 0.28,
        ease: 'power2.inOut',
    });
}

function scheduleSidebarCollapse() {
    if (!isSidebarAutoMode() || sidebarPinnedOpen) return;
    clearSidebarHideTimer();
    sidebarHideTimer = setTimeout(() => collapseSidebar(), 280);
}

function expandPerksSidebar(immediate = false) {
    if (!PERKS_SIDEBAR_EL || !GAME_AREA) return;
    clearPerksSidebarHideTimer();
    PERKS_SIDEBAR_EL.classList.remove('collapsed');
    GAME_AREA.classList.remove('perks-sidebar-hidden');

    if (isMobileSidebarMode()) {
        GAME_AREA.classList.add('mobile-perks-open');
        GAME_AREA.classList.remove('mobile-sidebar-open');
        gsap.killTweensOf(PERKS_SIDEBAR_EL);
        gsap.set(PERKS_SIDEBAR_EL, { clearProps: 'x,opacity,pointerEvents' });
        syncMobileBackdrop();
        syncMobileDrawerTriggers();
        return;
    }

    const width = updatePerksSidebarWidthCache();
    gsap.killTweensOf([PERKS_SIDEBAR_EL, GAME_AREA]);
    gsap.to(GAME_AREA, {
        '--left-sidebar-width': `${width}px`,
        duration: immediate ? 0.18 : 0.24,
        ease: 'power2.out',
    });
    gsap.to(PERKS_SIDEBAR_EL, {
        x: 0,
        opacity: 1,
        pointerEvents: 'auto',
        duration: immediate ? 0.18 : 0.24,
        ease: 'power2.out',
    });
}

function collapsePerksSidebar(immediate = false) {
    if (!PERKS_SIDEBAR_EL || !GAME_AREA) return;
    if (isMobileSidebarMode()) {
        GAME_AREA.classList.remove('mobile-perks-open');
        syncMobileBackdrop();
        syncMobileDrawerTriggers();
        return;
    }
    if (!isSidebarAutoMode() || perksSidebarPinnedOpen) return;
    clearPerksSidebarHideTimer();
    const width = updatePerksSidebarWidthCache();
    PERKS_SIDEBAR_EL.classList.add('collapsed');
    GAME_AREA.classList.add('perks-sidebar-hidden');
    gsap.killTweensOf([PERKS_SIDEBAR_EL, GAME_AREA]);
    gsap.to(GAME_AREA, {
        '--left-sidebar-width': '0px',
        duration: immediate ? 0.2 : 0.28,
        ease: 'power2.inOut',
    });
    gsap.to(PERKS_SIDEBAR_EL, {
        x: -(width + 18),
        opacity: 0.2,
        pointerEvents: 'none',
        duration: immediate ? 0.2 : 0.28,
        ease: 'power2.inOut',
    });
}

function schedulePerksSidebarCollapse() {
    if (!isSidebarAutoMode() || perksSidebarPinnedOpen) return;
    clearPerksSidebarHideTimer();
    perksSidebarHideTimer = setTimeout(() => collapsePerksSidebar(), 280);
}

function syncSidebarBehavior() {
    if (!GAME_SIDEBAR_EL || !GAME_AREA) return;
    clearSidebarHideTimer();

    if (isMobileSidebarMode()) {
        GAME_SIDEBAR_EL.classList.remove('collapsed');
        GAME_AREA.classList.add('sidebar-hidden', 'perks-sidebar-hidden');
        gsap.killTweensOf([GAME_SIDEBAR_EL, PERKS_SIDEBAR_EL, GAME_AREA]);
        gsap.set(GAME_SIDEBAR_EL, { clearProps: 'x,opacity,pointerEvents' });
        if (PERKS_SIDEBAR_EL) gsap.set(PERKS_SIDEBAR_EL, { clearProps: 'x,opacity,pointerEvents' });
        gsap.set(GAME_AREA, { '--left-sidebar-width': '0px', '--right-sidebar-width': '0px' });
        closeMobilePanels();
        return;
    }

    if (isSidebarAutoMode()) {
        updateSidebarWidthCache();
        if (sidebarPinnedOpen) expandSidebar(true);
        else collapseSidebar(true);
    } else {
        sidebarPinnedOpen = true;
        perksSidebarPinnedOpen = true;
        GAME_SIDEBAR_EL.classList.remove('collapsed');
        if (PERKS_SIDEBAR_EL) PERKS_SIDEBAR_EL.classList.remove('collapsed');
        GAME_AREA.classList.remove('sidebar-hidden', 'perks-sidebar-hidden');
        gsap.killTweensOf([GAME_SIDEBAR_EL, PERKS_SIDEBAR_EL, GAME_AREA]);
        gsap.set(GAME_SIDEBAR_EL, { clearProps: 'x,opacity,pointerEvents' });
        if (PERKS_SIDEBAR_EL) gsap.set(PERKS_SIDEBAR_EL, { clearProps: 'x,opacity,pointerEvents' });
        gsap.set(GAME_AREA, {
            '--left-sidebar-width': `${updatePerksSidebarWidthCache()}px`,
            '--right-sidebar-width': `${updateSidebarWidthCache()}px`,
        });
    }
}

function syncAppViewportHeight() {
    const height = window.innerHeight || document.documentElement.clientHeight;
    document.documentElement.style.setProperty('--app-height', `${height}px`);
}

function syncSoundControls() {
    const settingsSoundBtn = document.getElementById('toggle-sound-btn');
    if (settingsSoundBtn) {
        settingsSoundBtn.textContent = `SOUND: ${isMuted ? 'OFF' : 'ON'}`;
    }
    if (volumeSliderMenu) {
        volumeSliderMenu.value = String(soundEngine.sfxVolume);
    }
}

const startBtn = document.getElementById('start-btn');
const browseBtn = document.getElementById('browse-btn');
const backToMainBtn = document.getElementById('back-to-main-btn');
const pauseBtn = document.getElementById('pause-btn');
const settingsBtn = document.getElementById('settings-btn');
const settingsOverlay = document.getElementById('settings-overlay');
const closeSettingsBtn = document.getElementById('close-settings-btn');
const toggleSoundBtn = document.getElementById('toggle-sound-btn');
const toggleZenBtn = document.getElementById('toggle-zen-btn');
const zenToggleMenuBtn = document.getElementById('zen-toggle-menu');
const levelSelectBtn = document.getElementById('level-select-btn');

function openSettings() {
    if (!settingsOverlay) return;
    syncSoundControls();
    updateModeLabels();
    settingsOverlay.classList.remove('hidden');
}

function closeSettings() {
    if (!settingsOverlay) return;
    settingsOverlay.classList.add('hidden');
}

function startCurrentGame(selection = requestedStart || playerProgress.lastPlayed || defaultProgress.lastPlayed) {
    if (!selection) {
        showCategorySelect();
        return;
    }

    currentCategory = selection.category;
    currentPuzzleIndex = selection.puzzleIndex;
    showGame();
    setTimeout(() => initLevel(currentCategory, currentPuzzleIndex), 100);
}

if (startBtn) {
    startBtn.addEventListener('click', () => {
        safePlaySound('click');
        startCurrentGame();
    });
}

if (browseBtn) {
    browseBtn.addEventListener('click', () => {
        safePlaySound('click');
        showCategorySelect();
    });
}

if (backToMainBtn) {
    backToMainBtn.addEventListener('click', () => {
        safePlaySound('click');
        showMainMenu();
    });
}

if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
        safePlaySound('click');
        showCategorySelect();
    });
}

if (levelSelectBtn) {
    levelSelectBtn.addEventListener('click', () => {
        safePlaySound('click');
        WIN_OVERLAY.classList.add('hidden');
        showCategorySelect();
    });
}

if (settingsBtn) {
    settingsBtn.addEventListener('click', () => {
        safePlaySound('click');
        openSettings();
    });
}

if (closeSettingsBtn) {
    closeSettingsBtn.addEventListener('click', () => {
        safePlaySound('click');
        closeSettings();
    });
}

if (toggleSoundBtn) {
    toggleSoundBtn.addEventListener('click', (event) => {
        toggleMute(event);
        syncSoundControls();
        safePlaySound('click');
    });
}

if (toggleZenBtn) {
    toggleZenBtn.addEventListener('click', () => {
        safePlaySound('click');
        toggleZenMode();
    });
}

if (zenToggleMenuBtn) {
    zenToggleMenuBtn.addEventListener('click', () => {
        safePlaySound('click');
        toggleZenMode();
    });
}

if (SIDEBAR_TOGGLE_EL) {
    SIDEBAR_TOGGLE_EL.addEventListener('click', () => {
        safePlaySound('click');
        sidebarPinnedOpen = !sidebarPinnedOpen;
        if (sidebarPinnedOpen) expandSidebar(true);
        else collapseSidebar(true);
    });
}

if (PERKS_SIDEBAR_TOGGLE_EL) {
    PERKS_SIDEBAR_TOGGLE_EL.addEventListener('click', () => {
        safePlaySound('click');
        perksSidebarPinnedOpen = !perksSidebarPinnedOpen;
        if (perksSidebarPinnedOpen) expandPerksSidebar(true);
        else collapsePerksSidebar(true);
    });
}

if (SIDEBAR_HOVER_ZONE_EL) {
    SIDEBAR_HOVER_ZONE_EL.addEventListener('pointerenter', () => expandSidebar());
    SIDEBAR_HOVER_ZONE_EL.addEventListener('pointerleave', () => scheduleSidebarCollapse());
}

if (GAME_SIDEBAR_EL) {
    GAME_SIDEBAR_EL.addEventListener('pointerenter', () => clearSidebarHideTimer());
    GAME_SIDEBAR_EL.addEventListener('pointerleave', () => scheduleSidebarCollapse());
}

if (SIDEBAR_EDGE_HINT_EL) {
    SIDEBAR_EDGE_HINT_EL.addEventListener('click', () => {
        safePlaySound('click');
        expandSidebar(true);
    });
}

if (PERKS_HOVER_ZONE_EL) {
    PERKS_HOVER_ZONE_EL.addEventListener('pointerenter', () => expandPerksSidebar());
    PERKS_HOVER_ZONE_EL.addEventListener('pointerleave', () => schedulePerksSidebarCollapse());
}

if (PERKS_SIDEBAR_EL) {
    PERKS_SIDEBAR_EL.addEventListener('pointerenter', () => clearPerksSidebarHideTimer());
    PERKS_SIDEBAR_EL.addEventListener('pointerleave', () => schedulePerksSidebarCollapse());
}

if (PERKS_EDGE_HINT_EL) {
    PERKS_EDGE_HINT_EL.addEventListener('click', () => {
        safePlaySound('click');
        expandPerksSidebar(true);
    });
}

if (MOBILE_SIDEBAR_TRIGGER_EL) {
    MOBILE_SIDEBAR_TRIGGER_EL.addEventListener('click', () => {
        safePlaySound('click');
        if (GAME_AREA?.classList.contains('mobile-sidebar-open')) collapseSidebar(true);
        else expandSidebar(true);
    });
}

if (MOBILE_PERKS_TRIGGER_EL) {
    MOBILE_PERKS_TRIGGER_EL.addEventListener('click', () => {
        safePlaySound('click');
        if (GAME_AREA?.classList.contains('mobile-perks-open')) collapsePerksSidebar(true);
        else expandPerksSidebar(true);
    });
}

if (MOBILE_PANEL_BACKDROP_EL) {
    MOBILE_PANEL_BACKDROP_EL.addEventListener('click', closeMobilePanels);
}

window.addEventListener('resize', () => {
    syncAppViewportHeight();
    syncSidebarBehavior();
    fitBoardToViewport();
});

applyTheme(playerProgress.activeTheme || 'cozy-hearth');
updateCoinDisplays();
updateModeLabels();
updateCollectionProgress();
renderShop();
startComingSoonRotation();
syncAppViewportHeight();
syncSoundControls();
syncSidebarBehavior();

startCurrentGame(requestedStart || playerProgress.lastPlayed || defaultProgress.lastPlayed);
