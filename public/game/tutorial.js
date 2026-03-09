/* ═══════════════════════════════════════════
   JigMerge — Tutorial System (Persistent Hand)
   ═══════════════════════════════════════════ */

let isTutorialActive = false;
let tutorialStep = 0;

const getHand = () => document.getElementById('tutorial-hand');
const getBubble = () => document.getElementById('tutorial-bubble');

const TUTORIAL_MOVES = [
    { 
        pieceId: 1, 
        to: { c: 0, r: 0 },
        text: "Swipe this piece to the left!"
    },
    { 
        pieceId: 4, 
        to: { c: 0, r: 1 },
        text: "Now merge this one below it!"
    },
    {
        pieceId: 1, 
        to: { c: 1, r: 0 },
        isGroupMove: true,
        text: "Great! Now move the whole group!"
    }
];

function initTutorial() {
    console.log("Tutorial: Initializing...");
    isTutorialActive = true;
    tutorialStep = 0;
    
    currentCategory = 1;
    currentPuzzleIndex = 0;
    
    if (!window.isShuffleOverridden) {
        const oldShuffleGrid = window.shuffleGrid;
        window.shuffleGrid = function() {
            if (isTutorialActive) {
                console.log("Tutorial: Forcing scramble logic...");
                forceTutorialLayout();
            } else {
                oldShuffleGrid();
            }
        };
        window.isShuffleOverridden = true;
    }
    
    initLevel(1, 0);
}

function forceTutorialLayout() {
    buildGrid(3, 3);
    const layout = [
        [2, 1, 3],
        [5, 4, 6],
        [8, 7, 9]
    ];
    pieces.forEach(p => {
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                if (layout[r][c] === p.id) {
                    grid[r][c] = p.id;
                    p.currentCol = c;
                    p.currentRow = r;
                }
            }
        }
    });
    for (const key in groups) delete groups[key];
    pieces.forEach(p => {
        p.groupId = `group-${p.id}`;
        groups[p.groupId] = [p.id];
    });
}

if (window.tutorialTicker) clearInterval(window.tutorialTicker);
window.tutorialTicker = setInterval(() => {
    if (isTutorialActive && !isMemorizing && tutorialStep < TUTORIAL_MOVES.length) {
        const h = getHand();
        if (h && h.classList.contains('hidden')) {
            showTutorialStep();
        }
    }
}, 500);

function showTutorialStep() {
    const h = getHand();
    const b = getBubble();
    if (!h || !b) return;

    if (tutorialStep >= TUTORIAL_MOVES.length) {
        finishTutorial();
        return;
    }
    
    const move = TUTORIAL_MOVES[tutorialStep];
    const piece = pieces.find(p => p.id === move.pieceId);
    if (!piece) return;
    
    // Hand is in .board-wrap, so position relative to .board-wrap
    const wrapRect = h.parentElement.getBoundingClientRect();
    const pieceRect = piece.el.getBoundingClientRect();
    
    const startX = (pieceRect.left - wrapRect.left) + pieceRect.width / 2;
    const startY = (pieceRect.top - wrapRect.top) + pieceRect.height / 2;
    
    // Target position calculation - finding the board's screen position
    const boardRect = BOARD.getBoundingClientRect();
    const targetX = (boardRect.left - wrapRect.left) + (move.to.c * pieceW) + (pieceW / 2);
    const targetY = (boardRect.top - wrapRect.top) + (move.to.r * pieceH) + (pieceH / 2);
    
    const deltaX = targetX - startX;
    const deltaY = targetY - startY;
    
    h.style.left = `${startX}px`;
    h.style.top = `${startY}px`;
    h.classList.remove('hidden');
    
    b.textContent = move.text;
    b.classList.add('show');
    b.classList.remove('hidden');
    
    h.style.setProperty('--tx', `${deltaX}px`);
    h.style.setProperty('--ty', `${deltaY}px`);
    h.classList.add('hand-anim');
}

function hideHand() {
    const h = getHand();
    const b = getBubble();
    if (h) {
        h.classList.add('hidden');
        h.classList.remove('hand-anim');
    }
    if (b) {
        b.classList.remove('show');
        setTimeout(() => b.classList.add('hidden'), 400);
    }
}

function finishTutorial() {
    hideHand();
    isTutorialActive = false;
    localStorage.setItem('jigmerge_tutorial_done', 'true');
    const remainingGroups = Object.keys(groups);
    if (remainingGroups.length === 1 && groups[remainingGroups[0]].length === pieces.length) {
        setTimeout(() => checkWinCondition(), 800);
    }
}

const oldDown = window.handlePointerDown;
window.handlePointerDown = function(e) {
    if (isTutorialActive) {
        const pieceEl = e.target.closest('.piece-container');
        if (!pieceEl) return;
        const pieceId = parseInt(pieceEl.id.split('-')[1]);
        const move = TUTORIAL_MOVES[tutorialStep];
        const p = pieces.find(item => item.id === pieceId);
        if (move.isGroupMove) {
            const movePiece = pieces.find(item => item.id === move.pieceId);
            if (p.groupId !== movePiece.groupId) {
                gsap.to(pieceEl, { x: "+=5", repeat: 5, yoyo: true, duration: 0.05 });
                return;
            }
        } else if (pieceId !== move.pieceId) {
            gsap.to(pieceEl, { x: "+=5", repeat: 5, yoyo: true, duration: 0.05 });
            return;
        }
    }
    oldDown(e);
};

const oldDrop = window.handleDrop;
window.handleDrop = function(movedGroupId) {
    if (isTutorialActive) {
        const move = TUTORIAL_MOVES[tutorialStep];
        const movedPieceIds = groups[movedGroupId];
        const p = pieces.find(item => item.id === move.pieceId);
        if (!p || !movedPieceIds.includes(p.id)) {
            bounceBack(movedPieceIds.map(id => pieces.find(item => item.id === id)));
            return;
        }
        const hoverCol = Math.round(p.x / pieceW);
        const hoverRow = Math.round(p.y / pieceH);
        if (hoverCol === move.to.c && hoverRow === move.to.r) {
            tutorialStep++;
            hideHand();
            oldDrop(movedGroupId);
            if (tutorialStep >= TUTORIAL_MOVES.length) {
                setTimeout(finishTutorial, 1200);
            } else {
                setTimeout(showTutorialStep, 1000);
            }
            return;
        } else {
            bounceBack(movedPieceIds.map(id => pieces.find(item => item.id === id)));
            return;
        }
    }
    oldDrop(movedGroupId);
};
