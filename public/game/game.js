const BOARD = document.getElementById('board');
const LEVEL_DISPLAY = document.getElementById('level-display');
const NEXT_BTN = document.getElementById('next-level-btn');
const WIN_OVERLAY = document.getElementById('win-overlay');

// Game Config
let currentLevel = 1;
let unlockedLevel = 1; // Tracks progression
const SNAP_THRESHOLD = 20; // pixels
let pieces = [];
let groups = {}; // groupId: [pieceIds]
let nextGroupId = 1;

// Audio System
let isMuted = false;
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playSound(type) {
    if (isMuted) return;
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    if (type === 'snap') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
    } else if (type === 'drag') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(300, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.05);
    } else if (type === 'win') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(400, audioCtx.currentTime);
        osc.frequency.setValueAtTime(600, audioCtx.currentTime + 0.1);
        osc.frequency.setValueAtTime(800, audioCtx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.5);
    }
}

// Level Configs
const LEVELS = {
    1: { rows: 3, cols: 3, image: 'https://picsum.photos/seed/level1/600/400' },
    2: { rows: 4, cols: 4, image: 'https://picsum.photos/seed/level2/600/400' },
    3: { rows: 5, cols: 5, image: 'https://picsum.photos/seed/level3/600/400' }
};

class Piece {
    constructor(id, col, row, width, height, imageUrl, totalCols, totalRows) {
        this.id = id;
        this.col = col;
        this.row = row;
        this.width = width;
        this.height = height;
        
        // Correct position relative to top-left of the merged puzzle
        this.correctX = col * width;
        this.correctY = row * height;
        
        // Current actual position on board
        this.x = 0;
        this.y = 0;
        
        this.groupId = null;
        
        // DOM Element
        this.el = document.createElement('div');
        this.el.className = 'piece-container';
        this.el.id = `piece-${id}`;
        this.el.style.width = `${width}px`;
        this.el.style.height = `${height}px`;

        this.inner = document.createElement('div');
        this.inner.className = 'piece-inner';
        
        this.front = document.createElement('div');
        this.front.className = 'piece-front';
        this.front.style.backgroundImage = `url(${imageUrl})`;
        this.front.style.backgroundSize = `${totalCols * width}px ${totalRows * height}px`;
        this.front.style.backgroundPosition = `-${this.correctX}px -${this.correctY}px`;
        
        this.back = document.createElement('div');
        this.back.className = 'piece-back';
        
        this.inner.appendChild(this.front);
        this.inner.appendChild(this.back);
        this.el.appendChild(this.inner);
        
        BOARD.appendChild(this.el);
        this.bindEvents();
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
        gsap.set(this.el, { x: this.x, y: this.y });
    }

    bindEvents() {
        this.el.addEventListener('pointerdown', handlePointerDown);
    }
}

// Global Drag & Game State
let draggingGroup = null; // ID of the group currently being dragged
let dragOffsets = {}; // pieceId -> { dx, dy }
let startPointer = { x: 0, y: 0 };
let isMemorizing = false;

function initLevel(levelNum) {
    WIN_OVERLAY.classList.add('hidden');
    BOARD.innerHTML = '';
    pieces = [];
    groups = {};
    nextGroupId = 1;
    LEVEL_DISPLAY.innerText = levelNum;

    const config = LEVELS[levelNum] || LEVELS[3];
    const { rows, cols, image } = config;
    
    // Base puzzle size maxing out at 600x400 to fit on screen
    const puzzleWidth = 600;
    const puzzleHeight = 400;
    const pieceWidth = puzzleWidth / cols;
    const pieceHeight = puzzleHeight / rows;

    // Create pool of valid grid slots
    let slots = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            slots.push({ x: c * pieceWidth, y: r * pieceHeight });
        }
    }
    
    // Shuffle slots
    for (let i = slots.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [slots[i], slots[j]] = [slots[j], slots[i]];
    }

    let idCounter = 1;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const piece = new Piece(idCounter, c, r, pieceWidth, pieceHeight, image, cols, rows);
            
            // Assign from shuffled slots
            const slot = slots.pop();
            
            // Start pieces in their CORRECT solved positions for the Memorize phase
            piece.setPosition(piece.correctX, piece.correctY);
            
            // Target slots for when the game actually starts
            piece.targetX = slot.x;
            piece.targetY = slot.y;
            
            // Show the front image initially
            piece.inner.classList.add('flipped');
            
            // Initially, each piece is its own group
            const gId = nextGroupId++;
            piece.groupId = gId;
            groups[gId] = [piece.id];
            
            pieces.push(piece);
            idCounter++;
        }
    }
    
    // Begin Memorize Phase
    isMemorizing = true;
    const memorizeOverlay = document.getElementById('memorize-overlay');
    memorizeOverlay.classList.remove('hidden');

    // Wait 3 seconds, then shatter and deal
    setTimeout(() => {
        memorizeOverlay.classList.add('hidden');
        
        const tl = gsap.timeline();
        
        // Face down (hide image) slightly before they move
        tl.add(() => {
            pieces.forEach(p => p.inner.classList.remove('flipped'));
        });

        pieces.forEach((piece, index) => {
            tl.to(piece.el, {
                x: piece.targetX,
                y: piece.targetY,
                duration: 0.4,
                ease: "power2.out",
                onComplete: () => {
                    piece.setPosition(piece.targetX, piece.targetY);
                    playSound('snap');
                }
            }, index * 0.05); // Fast, sequential scatter
        });
        
        // Once all are distributed, flip them back over to begin the game
        tl.add(() => {
            pieces.forEach(p => p.inner.classList.add('flipped'));
            isMemorizing = false; // Unlock interactions
        }, "+=0.2");

    }, 3000);
}

function handlePointerDown(e) {
    if (isMemorizing) return;
    if (e.button !== 0 && e.type !== 'touchstart') return; // Only left click or touch
    
    // We must find the closest piece-container because e.target might be the front/back card face
    const pieceEl = e.target.closest('.piece-container');
    if (!pieceEl) return;

    const pieceId = parseInt(pieceEl.id.split('-')[1]);
    const piece = pieces.find(p => p.id === pieceId);
    if (!piece) return;

    // Elevate group
    draggingGroup = piece.groupId;
    const groupPieceIds = groups[draggingGroup];
    if (!groupPieceIds) return;

    playSound('drag');

    // Record start pointer
    startPointer.x = e.clientX;
    startPointer.y = e.clientY;

    groupPieceIds.forEach(id => {
        const p = pieces.find(p => p.id === id);
        p.el.classList.add('dragging');
        p.el.style.zIndex = 1000;
        
        // Offset between current piece position and pointer
        dragOffsets[p.id] = {
            dx: p.x - startPointer.x,
            dy: p.y - startPointer.y
        };
    });

    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);
    document.addEventListener('pointercancel', handlePointerUp);
}

function handlePointerMove(e) {
    if (!draggingGroup) return;

    const pointerX = e.clientX;
    const pointerY = e.clientY;
    const groupPieceIds = groups[draggingGroup];

    // Unconstrained smooth dragging (no bounding constraints)
    groupPieceIds.forEach(id => {
        const p = pieces.find(p => p.id === id);
        const propX = pointerX + dragOffsets[p.id].dx;
        const propY = pointerY + dragOffsets[p.id].dy;
        p.setPosition(propX, propY);
    });
}

function handlePointerUp(e) {
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
    
    // Base drop calculation on the first piece of the group
    const primaryPiece = movedPieces[0];
    
    // The exact origin slot of primary piece before the drag started
    const startX = startPointer.x + dragOffsets[primaryPiece.id].dx;
    const startY = startPointer.y + dragOffsets[primaryPiece.id].dy;
    const startCol = Math.round(startX / primaryPiece.width);
    const startRow = Math.round(startY / primaryPiece.height);

    // Where the primary piece is hovering over right now
    const hoverCol = Math.round(primaryPiece.x / primaryPiece.width);
    const hoverRow = Math.round(primaryPiece.y / primaryPiece.height);

    // Delta of the move
    const colOff = hoverCol - startCol;
    const rowOff = hoverRow - startRow;
    
    if (colOff === 0 && rowOff === 0) {
        // Did not move a grid slot. Snap back to original slots.
        bounceBack(movedPieces);
        return;
    }

    const levelConfig = LEVELS[currentLevel] || LEVELS[3];
    const maxCols = levelConfig.cols;
    const maxRows = levelConfig.rows;

    const dragSet = new Set(movedPieceIds);
    let moves_map = [];
    
    for (const p of movedPieces) {
        // Original slot of this piece
        const oc = Math.round((startPointer.x + dragOffsets[p.id].dx) / p.width);
        const or = Math.round((startPointer.y + dragOffsets[p.id].dy) / p.height);
        
        // Intended slot of this piece
        const nc = oc + colOff;
        const nr = or + rowOff;

        if (nc < 0 || nc >= maxCols || nr < 0 || nr >= maxRows) {
            // Out of bounds, abort move
            bounceBack(movedPieces);
            return;
        }

        moves_map.push({ piece: p, oc, or, nc, nr });
    }

    // Now figure out what slots the group is trying to move into, and what slots it leaves behind
    const newGridSpots = moves_map.map(m => `${m.nc},${m.nr}`);
    const oldGridSpots = moves_map.map(m => `${m.oc},${m.or}`);

    const newGridSet = new Set(newGridSpots);

    // Find pieces that currently occupy the slots we want to move into AND are not part of our moving group
    const displacedPieces = [];
    newGridSpots.forEach(ns => {
        const [c, r] = ns.split(',').map(Number);
        const occupant = pieces.find(p => {
             const pc = Math.round(p.x / p.width);
             const pr = Math.round(p.y / p.height);
             return pc === c && pr === r && !dragSet.has(p.id);
        });
        if (occupant) displacedPieces.push(occupant);
    });

    // Find the slots being abandoned by the group that won't be covered by another piece of the group
    const freedSpots = oldGridSpots.filter(spot => !newGridSet.has(spot));

    if (displacedPieces.length !== freedSpots.length) {
        // Can't swap cleanly if it's not a 1:1 shape/size match
        bounceBack(movedPieces);
        return;
    }

    playSound('snap');

    // Execute the swap!
    
    // 1. Move the dragged pieces tracking to new grid slots
    for (const m of moves_map) {
        const tgtX = m.nc * m.piece.width;
        const tgtY = m.nr * m.piece.height;
        gsap.to(m.piece.el, { x: tgtX, y: tgtY, duration: 0.2, onComplete: () => m.piece.setPosition(tgtX, tgtY) });
    }

    // 2. Move displaced pieces into freed slots
    for (let i = 0; i < displacedPieces.length; i++) {
        const dp = displacedPieces[i];
        const [fc, fr] = freedSpots[i].split(',').map(Number);
        const tgtX = fc * dp.width;
        const tgtY = fr * dp.height;
        gsap.to(dp.el, { x: tgtX, y: tgtY, duration: 0.2, onComplete: () => dp.setPosition(tgtX, tgtY) });
    }

    // Check merges after animation
    const affectedGroupIds = new Set();
    affectedGroupIds.add(movedGroupId);
    displacedPieces.forEach(p => affectedGroupIds.add(p.groupId));
    
    setTimeout(() => {
        affectedGroupIds.forEach(gid => checkMerges(gid));
    }, 250);
}

function bounceBack(movedPiecesObj) {
    movedPiecesObj.forEach(mp => {
        const origX = startPointer.x + dragOffsets[mp.id].dx;
        const origY = startPointer.y + dragOffsets[mp.id].dy;
        const sx = Math.round(origX / mp.width) * mp.width;
        const sy = Math.round(origY / mp.height) * mp.height;
        gsap.to(mp.el, { x: sx, y: sy, duration: 0.2, ease: "back.out(1.5)", onComplete: () => mp.setPosition(sx, sy) });
    });
    playSound('drag');
}

function checkMerges(groupIdToCheck) {
    if (!groups[groupIdToCheck]) return;
    
    const groupPieceIds = groups[groupIdToCheck];
    const groupPiecesObj = groupPieceIds.map(id => pieces.find(p => p.id === id));
    
    let merged = false;
    const otherGroupIds = Object.keys(groups).filter(gId => parseInt(gId) !== groupIdToCheck);

    for (const targetGroupId of otherGroupIds) {
        const targetPieceIds = groups[targetGroupId];
        const targetPiecesObj = targetPieceIds.map(id => pieces.find(p => p.id === id));

        let matchFound = false;

        for (const mp of groupPiecesObj) {
            for (const tp of targetPiecesObj) {
                // Logical correct offset in puzzle
                const expectedOffsetX = mp.correctX - tp.correctX;
                const expectedOffsetY = mp.correctY - tp.correctY;

                // Actual current physical offset
                const actualOffsetX = mp.x - tp.x;
                const actualOffsetY = mp.y - tp.y;

                // If physical and logical match closely (snapped adjacent relative position)
                if (Math.abs(expectedOffsetX - actualOffsetX) < 5 && Math.abs(expectedOffsetY - actualOffsetY) < 5) {
                    const colDiff = Math.abs(mp.col - tp.col);
                    const rowDiff = Math.abs(mp.row - tp.row);
                    if ((colDiff === 1 && rowDiff === 0) || (colDiff === 0 && rowDiff === 1)) {
                        matchFound = true;
                        break;
                    }
                }
            }
            if (matchFound) break;
        }

        if (matchFound) {
            merged = true;
            playSound('snap');
            const targetGroupInt = parseInt(targetGroupId);
            
            groupPiecesObj.forEach(mp => {
                // Flash the card face for visual feedback
                mp.el.classList.add('merge-flash');
                setTimeout(() => mp.el.classList.remove('merge-flash'), 400);
                
                mp.groupId = targetGroupInt;
                if (!groups[targetGroupInt].includes(mp.id)) {
                    groups[targetGroupInt].push(mp.id);
                }
            });
            
            delete groups[groupIdToCheck];
            // Recursively check until no more merges occur in this chain
            setTimeout(() => checkMerges(targetGroupInt), 100);
            break; 
        }
    }

    checkWinCondition();
}

function checkWinCondition() {
    setTimeout(() => {
        // If there's only 1 group left, and it has all pieces, Win!
        const remainingGroups = Object.keys(groups);
        if (remainingGroups.length === 1) {
            const finalGroup = groups[remainingGroups[0]];
            if (finalGroup.length === pieces.length) {
                playSound('win');
                WIN_OVERLAY.classList.remove('hidden');
                // Premium win effects
                gsap.fromTo('.win-modal', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" });
            }
        }
    }, 200); // slight delay to allow snap animation to finish
}

// Screen Routing Elements
const MAIN_MENU = document.getElementById('main-menu');
const GAME_HEADER = document.getElementById('game-header');
const LEVEL_SELECT = document.getElementById('level-select-screen');

// Logic for advancing levels (called from WinOverlay)
NEXT_BTN.addEventListener('click', () => {
    if (currentLevel === unlockedLevel) {
        unlockedLevel++;
        generateLevelGrid();
    }
    currentLevel++;
    if (currentLevel > Object.keys(LEVELS).length) {
        // Just for demo, loop back to start if we exceed max levels
        currentLevel = 1; 
    }
    initLevel(currentLevel);
});

// Routing Functions
function showMainMenu() {
    MAIN_MENU.classList.remove('hidden');
    GAME_HEADER.classList.add('hidden');
    BOARD.classList.add('hidden');
    LEVEL_SELECT.classList.add('hidden');
    WIN_OVERLAY.classList.add('hidden');
}

function showLevelSelect() {
    MAIN_MENU.classList.add('hidden');
    GAME_HEADER.classList.add('hidden');
    BOARD.classList.add('hidden');
    LEVEL_SELECT.classList.remove('hidden');
    generateLevelGrid();
}

// Generate Level Grid dynamically
function generateLevelGrid() {
    const grid = document.getElementById('level-grid');
    grid.innerHTML = '';
    
    // We assume 10 levels exist for progression purposes
    for (let i = 1; i <= 10; i++) {
        const btn = document.createElement('button');
        btn.className = 'wood-btn level-btn';
        const lockSvg = `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width: 16px; height: 16px;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`;
        const starSvgMini = `<svg class="icon-svg" viewBox="0 0 24 24" fill="var(--yellow-star)" stroke="var(--wood-dark)" stroke-width="2" stroke-linejoin="round" style="width: 14px; height: 14px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
        
        if (i > unlockedLevel) {
            btn.classList.add('locked');
            btn.innerHTML = `<span>${i}</span><span class="stars-mini" style="margin-top:2px">${lockSvg}</span>`;
        } else {
            // Check if level has stars (mocked as 3 for unlocked past levels)
            const stars = i < unlockedLevel ? `<div style="display:flex; gap:2px;">${starSvgMini}${starSvgMini}${starSvgMini}</div>` : '';
            btn.innerHTML = `<span>${i}</span><span class="stars-mini">${stars}</span>`;
            btn.addEventListener('click', () => {
                currentLevel = i;
                LEVEL_SELECT.classList.add('hidden');
                GAME_HEADER.classList.remove('hidden');
                BOARD.classList.remove('hidden');
                setTimeout(() => initLevel(currentLevel), 100);
            });
        }
        grid.appendChild(btn);
    }
}

// Main Menu Buttons
const START_BTN = document.getElementById('start-btn');
START_BTN.addEventListener('click', showLevelSelect);

document.getElementById('back-to-main-btn').addEventListener('click', showMainMenu);

// Pause / Home Button in-game
document.getElementById('pause-btn').addEventListener('click', () => {
    // Basic pause behavior: just return to Level Select
    BOARD.innerHTML = ''; // Clear ongoing game
    showLevelSelect();
});

// Modals
const SETTINGS_MODAL = document.getElementById('settings-overlay');
const SHOP_MODAL = document.getElementById('shop-overlay');

// All Shop buttons (there might be multiple if we added one to the Header later)
// main-menu bottom bar children (excluding the gear)
const uiBtns = document.querySelectorAll('.menu-bottom button'); 
uiBtns.forEach(btn => {
    if (btn.innerText === 'SHOP') {
        btn.addEventListener('click', () => SHOP_MODAL.classList.remove('hidden'));
    }
});
document.getElementById('close-shop-btn').addEventListener('click', () => {
    SHOP_MODAL.classList.add('hidden');
});

// Settings buttons (Main menu)
const settingsBtn = document.getElementById('settings-btn');
if (settingsBtn) {
    settingsBtn.addEventListener('click', () => SETTINGS_MODAL.classList.remove('hidden'));
}
document.getElementById('close-settings-btn').addEventListener('click', () => {
    SETTINGS_MODAL.classList.add('hidden');
});

// Settings Sound Toggle
const toggleSoundBtn = document.getElementById('toggle-sound-btn');
toggleSoundBtn.addEventListener('click', () => {
    isMuted = !isMuted;
    toggleSoundBtn.innerText = isMuted ? 'SOUND: OFF' : 'SOUND: ON';
    if (!isMuted) playSound('snap'); // Audio feedback
});

// Initialize on load
showMainMenu();
