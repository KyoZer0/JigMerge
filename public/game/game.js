/* ═══════════════════════════════════════════
   JigMerge — Game Engine
   Grid-based swap + merge puzzle
   ═══════════════════════════════════════════ */

// ── DOM References ──
const BOARD = document.getElementById('board');
const LEVEL_DISPLAY = document.getElementById('game-level-title');
const NEXT_BTN = document.getElementById('next-level-btn');
const WIN_OVERLAY = document.getElementById('win-overlay');
const MOVE_COUNT_EL = document.getElementById('move-count');
const TIMER_EL = document.getElementById('timer-display');
const REF_IMAGE_EL = document.getElementById('ref-image');

// ── Game Config ──
let currentCategory = 1;
let currentPuzzleIndex = 0;
let unlockedLevel = 1;
let pieces = [];
let groups = {};        // groupId → [pieceIds]
let nextGroupId = 1;
let grid = [];          // 2D array: grid[row][col] = pieceId
let gridRows = 0;
let gridCols = 0;
let pieceW = 0;
let pieceH = 0;

// ── Stats ──
let moveCount = 0;
let timerSeconds = 0;
let timerInterval = null;
let topZIndex = 10;

// ── Audio System ──
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
        } catch (e) {
            console.warn('Web Audio API not supported');
        }
    }

    _note(freq, type, duration, volume, delay = 0) {
        if (!this.ctx || !this.enabled) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + delay);
        gain.gain.setValueAtTime(volume * this.sfxVolume, this.ctx.currentTime + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + delay + duration);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + delay);
        osc.stop(this.ctx.currentTime + delay + duration);
    }

    pickup() {
        this._note(880, 'sine', 0.12, 0.3);
        this._note(1320, 'sine', 0.08, 0.15, 0.03);
    }

    drop() {
        this._note(220, 'sine', 0.15, 0.35);
        this._note(165, 'triangle', 0.1, 0.2, 0.02);
    }

    merge() {
        this._note(523, 'sine', 0.2, 0.3);
        this._note(659, 'sine', 0.2, 0.25, 0.08);
        this._note(784, 'sine', 0.3, 0.2, 0.16);
    }

    win() {
        const notes = [523, 659, 784, 1047, 1319, 1568];
        notes.forEach((freq, i) => {
            this._note(freq, 'sine', 0.35, 0.25, i * 0.1);
            this._note(freq * 1.5, 'triangle', 0.25, 0.1, i * 0.1 + 0.05);
        });
    }

    click() {
        this._note(600, 'sine', 0.06, 0.15);
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

// ── Confetti System ──
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

// ── Level Configs ──
// Each level folder has ~20 images. We pick a random one each play.
function buildLevels() {
    const levels = {};
    // Levels 1-7: 3×3 (easy)
    for (let i = 1; i <= 7; i++) {
        levels[i] = { rows: 3, cols: 3, folder: `level${i}` };
    }
    // Levels 8-13: 6×6 (medium)
    for (let i = 8; i <= 13; i++) {
        levels[i] = { rows: 6, cols: 6, folder: `level${i}` };
    }
    // Levels 14-19: 9×9 (hard)
    for (let i = 14; i <= 19; i++) {
        levels[i] = { rows: 9, cols: 9, folder: `level${i}` };
    }
    return levels;
}

const LEVELS = buildLevels();

// Helper: format standard names for puzzles inside a category
function getPuzzleName(categoryId, index) {
    if (window.LEVEL_IMAGES && window.LEVEL_IMAGES[categoryId]) {
        let name = window.LEVEL_IMAGES[categoryId][index];
        if (name) {
            // Remove extension and capitalize words
            name = name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
            return name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        }
    }
    return `Puzzle ${index + 1}`;
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

// ── Piece Class ──
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
        // Use natural image dimensions for background-size — no scaling
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

// ── Drag State ──
let draggingGroup = null;
let dragOffsets = {};
let startPointer = { x: 0, y: 0 };
let isMemorizing = false;
let boardRect = null;

// ── Timer ──
function startTimer() {
    stopTimer();
    timerSeconds = 0;
    updateTimerDisplay();
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
    const m = Math.floor(timerSeconds / 60).toString().padStart(2, '0');
    const s = (timerSeconds % 60).toString().padStart(2, '0');
    TIMER_EL.textContent = `${m}:${s}`;
}

function updateMoveCount() {
    if (MOVE_COUNT_EL) MOVE_COUNT_EL.textContent = moveCount;
}

// ── Grid Helpers ──
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

// ── Init Level ──
function initLevel(categoryId, puzzleIndex) {
    WIN_OVERLAY.classList.add('hidden');
    BOARD.innerHTML = '';
    pieces = [];
    groups = {};
    nextGroupId = 1;
    moveCount = 0;
    topZIndex = 10;
    updateMoveCount();
    
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

    // Size the board to the image dimensions, capped to fit viewport
    // Max board area: leave space for header and sidebar
    const maxBoardW = 500;
    const maxBoardH = 600;

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
    const borderSize = 4;
    BOARD.style.width = `${boardW + borderSize * 2}px`;
    BOARD.style.height = `${boardH + borderSize * 2}px`;

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

// ── Pointer Handlers ──
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

// ── Merge Logic (Grid-Based) ──
function checkAllMerges() {
    let oldMergedCount = 0;
    Object.values(groups).forEach(g => { if (g.length > 1) oldMergedCount += g.length; });

    // Reset all groups 
    groups = {};
    nextGroupId = 1;
    pieces.forEach(p => {
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

    let newMergedCount = 0;
    Object.values(groups).forEach(g => { if (g.length > 1) newMergedCount += g.length; });

    if (newMergedCount > oldMergedCount) {
        playSound('snap');
        // brief flash on the newly snapped pieces isn't strictly necessary or could be tricky to isolate easily.
        // We'll just rely on the sound. 
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
    if (typeof isTutorialActive !== 'undefined' && isTutorialActive) return;
    setTimeout(() => {
        const remainingGroups = Object.keys(groups);
        if (remainingGroups.length === 1) {
            const finalGroup = groups[remainingGroups[0]];
            if (finalGroup.length === pieces.length) {
                stopTimer();
                playSound('win');
                
                // Update win card stats
                const winMoves = document.getElementById('win-moves');
                if (winMoves) winMoves.textContent = moveCount;
                
                WIN_OVERLAY.classList.remove('hidden');
                gsap.fromTo('.win-modal', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' });
                
                if (!confetti) confetti = new ConfettiSystem(document.getElementById('confetti-canvas'));
                confetti.burst(120);
            }
        }
    }, 200);
}

// ── Screen Routing ──
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
}

function showCategorySelect() {
    MAIN_MENU.classList.add('hidden');
    GAME_HEADER.classList.add('hidden');
    BOARD.classList.add('hidden');
    LEVEL_SELECT.classList.remove('hidden');
    if (GAME_AREA) GAME_AREA.classList.add('hidden');
    
    document.getElementById('level-screen-title').innerText = 'LEVELS';
    document.getElementById('level-screen-subtitle').style.display = 'none';
    
    PUZZLE_GRID.classList.add('hidden');
    CATEGORY_GRID.classList.remove('hidden');
    
    generateCategoryGrid();
}

function showGame() {
    MAIN_MENU.classList.add('hidden');
    LEVEL_SELECT.classList.add('hidden');
    GAME_HEADER.classList.remove('hidden');
    BOARD.classList.remove('hidden');
    if (GAME_AREA) GAME_AREA.classList.remove('hidden');
}

// ── Level Grids ──
function generateCategoryGrid() {
    CATEGORY_GRID.innerHTML = '';
    const totalLevels = Object.keys(LEVELS).length;

    for (let i = 1; i <= totalLevels; i++) {
        const btn = document.createElement('button');
        btn.className = 'wood-btn level-btn';

        const config = LEVELS[i];
        const sizeLabel = `${config.rows}×${config.cols}`;
        
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
            btn.innerHTML = `
                <div style="${imgStyle}"></div>
                <span style="font-size: 14px; letter-spacing: 0;">Level ${i}</span>
                <span class="stars-mini" style="font-size: 10px; letter-spacing: 0; margin-bottom: 0;">${count} Puzzles</span>
            `;
            btn.addEventListener('click', () => showPuzzleSelect(i));
        }
        CATEGORY_GRID.appendChild(btn);
    }
}

function showPuzzleSelect(categoryId) {
    document.getElementById('level-screen-title').innerText = `LEVEL ${categoryId}`;
    document.getElementById('level-screen-subtitle').style.display = 'block';
    
    CATEGORY_GRID.classList.add('hidden');
    PUZZLE_GRID.classList.remove('hidden');
    
    generatePuzzleGrid(categoryId);
}

// ── UI Wiring ──

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
const closeShopBtn = document.getElementById('close-shop-btn');
const shopOverlay = document.getElementById('shop-overlay');

if (openShopBtn && shopOverlay) {
    openShopBtn.addEventListener('click', () => {
        playSound('click');
        shopOverlay.classList.remove('hidden');
    });
}
if (closeShopBtn && shopOverlay) {
    closeShopBtn.addEventListener('click', () => {
        playSound('click');
        shopOverlay.classList.add('hidden');
    });
}

// Powerups (UI Only)
['btn-hint', 'btn-freeze', 'btn-autosolve'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
        btn.addEventListener('click', () => {
            playSound('click');
            alert('Power-ups coming soon!');
        });
    }
});

// Update Menu button bindings
const homeBtn = document.getElementById('home-btn');
if (homeBtn) {
    homeBtn.addEventListener('click', () => {
        playSound('click');
        showMainMenu();
    });
}

const pauseBtn = document.getElementById('pause-btn');
if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
        playSound('click');
        showCategorySelect();
    });
}

const backToMainBtn = document.getElementById('back-to-main-btn');
// Overriding old behavior
if (backToMainBtn) {
    backToMainBtn.removeEventListener('click', showMainMenu);
    backToMainBtn.addEventListener('click', () => {
        playSound('click');
        if (!PUZZLE_GRID.classList.contains('hidden')) {
            showCategorySelect();
        } else {
            showMainMenu();
        }
    });
}


function generatePuzzleGrid(categoryId) {
    PUZZLE_GRID.innerHTML = '';
    
    const images = window.LEVEL_IMAGES ? window.LEVEL_IMAGES[categoryId] : null;
    const maxPuzzles = images ? images.length : 0;
    
    if (maxPuzzles === 0) {
        PUZZLE_GRID.innerHTML = '<p class="wood-text" style="grid-column: 1/-1; text-align: center;">No puzzles found in this level.</p>';
        return;
    }

    const config = LEVELS[categoryId];

    for (let i = 0; i < maxPuzzles; i++) {
        const btn = document.createElement('button');
        btn.className = 'wood-btn level-btn puzzle-btn';
        
        const puzzleName = getPuzzleName(categoryId, i);
        // Small thumbnail of the puzzle image
        const imgUrl = `/levels/${config.folder}/${encodeURIComponent(images[i])}`;

        btn.innerHTML = `
            <div style="width: 100%; flex: 1; min-height: 0; background-image: url('${imgUrl}'); background-size: contain; background-repeat: no-repeat; background-position: center; border-radius: 6px; margin-bottom: 6px;"></div>
            <span style="font-size: 14px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; width: 100%; text-align: center; letter-spacing: 0;">${puzzleName}</span>
        `;
        
        btn.addEventListener('click', () => {
            currentCategory = categoryId;
            currentPuzzleIndex = i;
            showGame();
            setTimeout(() => initLevel(categoryId, i), 100);
        });
        
        PUZZLE_GRID.appendChild(btn);
    }
}

// ── Menu Button Handlers ──
const START_BTN = document.getElementById('start-btn');
START_BTN.addEventListener('click', () => {
    const isTutorialDone = localStorage.getItem('jigmerge_tutorial_done') === 'true';
    if (!isTutorialDone) {
        showGame();
        initTutorial();
    } else {
        showCategorySelect();
    }
});

document.getElementById('back-to-main-btn').addEventListener('click', () => {
    // If we are looking at puzzles, go back to categories
    if (!PUZZLE_GRID.classList.contains('hidden')) {
        showCategorySelect();
    } else {
        showMainMenu();
    }
});

document.getElementById('pause-btn').addEventListener('click', () => {
    BOARD.innerHTML = '';
    stopTimer();
    showCategorySelect();
});

// Modals
const SETTINGS_MODAL = document.getElementById('settings-overlay');
const SHOP_MODAL = document.getElementById('shop-overlay');

const uiBtns = document.querySelectorAll('.menu-bottom button');
uiBtns.forEach(btn => {
    if (btn.innerText === 'SHOP') {
        btn.addEventListener('click', () => SHOP_MODAL.classList.remove('hidden'));
    }
});
document.getElementById('close-shop-btn').addEventListener('click', () => {
    SHOP_MODAL.classList.add('hidden');
});

const settingsBtn = document.getElementById('settings-btn');
if (settingsBtn) {
    settingsBtn.addEventListener('click', () => SETTINGS_MODAL.classList.remove('hidden'));
}
document.getElementById('close-settings-btn').addEventListener('click', () => {
    SETTINGS_MODAL.classList.add('hidden');
});

// Sound Toggle
const toggleSoundBtn = document.getElementById('toggle-sound-btn');
toggleSoundBtn.addEventListener('click', () => {
    isMuted = !isMuted;
    toggleSoundBtn.innerText = isMuted ? 'SOUND: OFF' : 'SOUND: ON';
    if (!isMuted) playSound('snap');
});

// ── Initialize ──
showMainMenu();
