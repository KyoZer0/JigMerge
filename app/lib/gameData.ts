export interface GameSet {
  index: number;
  label: string;
  puzzleStart: number;
  puzzleCount: number;
  playHref: string;
}

export interface GameCollection {
  id: number;
  slug: string;
  name: string;
  shortName: string;
  badge: string;
  color: string;
  gridLabel: string;
  gridCols: number;
  gridRows: number;
  puzzleCount: number;
  difficulty: 'Starter' | 'Classic' | 'Expert';
  description: string;
  longDescription: string;
  sets: GameSet[];
}

function createSets(collectionId: number, puzzleCount: number): GameSet[] {
  const setSize = 4;
  const sets: GameSet[] = [];

  for (let puzzleStart = 0; puzzleStart < puzzleCount; puzzleStart += setSize) {
    const index = sets.length + 1;
    const currentSetSize = Math.min(setSize, puzzleCount - puzzleStart);
    sets.push({
      index,
      label: `Set ${index}`,
      puzzleStart,
      puzzleCount: currentSetSize,
      playHref: `/play?collection=${collectionId}&puzzle=${puzzleStart}`,
    });
  }

  return sets;
}

function buildCollection(id: number, gridCols: number, gridRows: number, puzzleCount: number): GameCollection {
  const isStarter = id <= 7;
  const isClassic = id >= 8 && id <= 13;
  const difficulty: GameCollection['difficulty'] = isStarter ? 'Starter' : isClassic ? 'Classic' : 'Expert';
  const badge = `Collection ${String(id).padStart(2, '0')}`;
  const gridLabel = `${gridCols}x${gridRows}`;

  const descriptions = {
    Starter: `A fast ${gridLabel} collection built for warm-ups, quick sessions, and learning the merge rhythm.`,
    Classic: `A fuller ${gridLabel} collection with denser boards and longer solve paths for steady runs.`,
    Expert: `A demanding ${gridLabel} collection that stretches memory, planning, and merge control.`,
  } as const;

  const longDescriptions = {
    Starter: `Collection ${String(id).padStart(2, '0')} uses the compact ${gridLabel} board from the live game. It is ideal when you want a short browser session, a clean introduction to swapping and merging, or a lower-pressure collection to revisit while chasing better clears.`,
    Classic: `Collection ${String(id).padStart(2, '0')} moves into the live game's larger ${gridLabel} layout. These boards keep the same rules as the smaller collections, but they ask for better pattern memory and more deliberate positioning before groups start to lock together.`,
    Expert: `Collection ${String(id).padStart(2, '0')} matches the large-format ${gridLabel} boards used in the embedded game. These runs are the closest thing JigMerge has to endurance mode: bigger surfaces, slower reveals, and a stronger reward for calm sequencing.`,
  } as const;

  const color = isStarter ? '#d97706' : isClassic ? '#0f766e' : '#b91c1c';

  return {
    id,
    slug: `collection-${String(id).padStart(2, '0')}`,
    name: badge,
    shortName: `C${String(id).padStart(2, '0')}`,
    badge,
    color,
    gridLabel,
    gridCols,
    gridRows,
    puzzleCount,
    difficulty,
    description: descriptions[difficulty],
    longDescription: longDescriptions[difficulty],
    sets: createSets(id, puzzleCount),
  };
}

export const gameCollections: GameCollection[] = [
  ...Array.from({ length: 7 }, (_, index) => buildCollection(index + 1, 3, 3, 20)),
  ...Array.from({ length: 6 }, (_, index) => buildCollection(index + 8, 6, 6, 20)),
  ...Array.from({ length: 5 }, (_, index) => buildCollection(index + 14, 9, 9, 20)),
  buildCollection(19, 9, 9, 7),
];

export const totalPuzzleCount = gameCollections.reduce((sum, collection) => sum + collection.puzzleCount, 0);

export const categories = gameCollections;

export function getCollectionBySlug(slug: string): GameCollection | undefined {
  return gameCollections.find((collection) => collection.slug === slug);
}

export function getCollectionById(id: number): GameCollection | undefined {
  return gameCollections.find((collection) => collection.id === id);
}

export function getPlayHref(collectionId: number, puzzle = 0): string {
  return `/play?collection=${collectionId}&puzzle=${puzzle}`;
}
