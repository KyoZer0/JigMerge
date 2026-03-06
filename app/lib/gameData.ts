export interface GameLevel {
  id: number;
  title: string;
  gridSize: string;
  gridCols: number;
  gridRows: number;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert' | 'Master';
  imageKeyword: string;
}

export interface GameCategory {
  slug: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  longDescription: string;
  levels: GameLevel[];
}

export const categories: GameCategory[] = [
  {
    slug: 'animals',
    name: 'Animals',
    icon: '🦁',
    color: '#ef4444',
    description: 'Adorable wildlife puzzles featuring animals from around the world.',
    longDescription: 'Dive into the wild kingdom with our animal puzzle collection! From majestic lions to playful dolphins, each puzzle brings you closer to nature.',
    levels: [
      { id: 1, title: 'Dog & Cat', gridSize: '3×3', gridCols: 3, gridRows: 3, difficulty: 'Easy', imageKeyword: 'dog_cat.jpg' },
      { id: 2, title: 'Parrot', gridSize: '3×3', gridCols: 3, gridRows: 3, difficulty: 'Easy', imageKeyword: 'parrot.jpg' },
      { id: 3, title: 'Black Dog', gridSize: '4×4', gridCols: 4, gridRows: 4, difficulty: 'Medium', imageKeyword: 'black_dog.jpg' },
      { id: 4, title: 'White Horse', gridSize: '4×4', gridCols: 4, gridRows: 4, difficulty: 'Hard', imageKeyword: 'white_horse.jpg' },
      { id: 5, title: 'Orange Hoodie', gridSize: '3×5', gridCols: 5, gridRows: 3, difficulty: 'Expert', imageKeyword: 'dog_with_orange_hoodie.jpg' },
      { id: 26, title: 'Birthday Dog', gridSize: '3×3', gridCols: 3, gridRows: 3, difficulty: 'Easy', imageKeyword: 'dog_birthday.jpg' },
      { id: 27, title: 'White Dog', gridSize: '4×4', gridCols: 4, gridRows: 4, difficulty: 'Medium', imageKeyword: 'white_dog.jpg' },
      { id: 28, title: 'Bird', gridSize: '4×4', gridCols: 4, gridRows: 4, difficulty: 'Hard', imageKeyword: 'bird.jpg' },
      { id: 29, title: 'Playful Friends', gridSize: '3×5', gridCols: 5, gridRows: 3, difficulty: 'Expert', imageKeyword: 'dog_cat.jpg' },
      { id: 30, title: 'Colorful Parrot', gridSize: '5×4', gridCols: 5, gridRows: 4, difficulty: 'Master', imageKeyword: 'parrot.jpg' },
    ],
  },
  {
    slug: 'nature',
    name: 'Nature',
    icon: '🌿',
    color: '#22c55e',
    description: 'Breathtaking landscapes and natural wonders to piece together.',
    longDescription: 'Explore the beauty of our planet through these stunning nature puzzles. From snow-capped mountains to serene beaches, each image captures the majesty of the natural world.',
    levels: [
      { id: 6, title: 'Serene Lake', gridSize: '3×3', gridCols: 3, gridRows: 3, difficulty: 'Easy', imageKeyword: 'lake.jpg' },
      { id: 7, title: 'Autumn Leaf', gridSize: '3×3', gridCols: 3, gridRows: 3, difficulty: 'Easy', imageKeyword: 'Autumn_leaf.jpg' },
      { id: 8, title: 'Under the Sea', gridSize: '4×4', gridCols: 4, gridRows: 4, difficulty: 'Medium', imageKeyword: 'under_the_sea.jpg' },
      { id: 9, title: 'Pink Flower', gridSize: '4×4', gridCols: 4, gridRows: 4, difficulty: 'Hard', imageKeyword: 'pink_flower.jpg' },
      { id: 10, title: 'Purple Plant', gridSize: '3×5', gridCols: 5, gridRows: 3, difficulty: 'Expert', imageKeyword: 'purple_plant.jpg' },
      { id: 31, title: 'Yellow Flower', gridSize: '3×3', gridCols: 3, gridRows: 3, difficulty: 'Easy', imageKeyword: 'yellow_flower.jpg' },
      { id: 32, title: 'Green Grass', gridSize: '4×4', gridCols: 4, gridRows: 4, difficulty: 'Medium', imageKeyword: 'grass.jpg' },
      { id: 33, title: 'Train Journey', gridSize: '4×4', gridCols: 4, gridRows: 4, difficulty: 'Hard', imageKeyword: 'train.jpg' },
      { id: 34, title: 'Autumn Vibes', gridSize: '3×5', gridCols: 5, gridRows: 3, difficulty: 'Expert', imageKeyword: 'Autumn_leaf.jpg' },
      { id: 35, title: 'Deep Ocean', gridSize: '5×4', gridCols: 5, gridRows: 4, difficulty: 'Master', imageKeyword: 'under_the_sea.jpg' },
    ],
  },
  {
    slug: 'cities',
    name: 'Cities',
    icon: '🏙️',
    color: '#6c5ce7',
    description: 'Iconic cityscapes and architectural marvels from around the globe.',
    longDescription: 'Travel the world without leaving your seat! Our city puzzles showcase the most iconic skylines and landmarks.',
    levels: [
      { id: 11, title: 'Paris Eiffel', gridSize: '3×3', gridCols: 3, gridRows: 3, difficulty: 'Easy', imageKeyword: 'paris.jpg' },
      { id: 12, title: 'New York', gridSize: '3×3', gridCols: 3, gridRows: 3, difficulty: 'Easy', imageKeyword: 'newyork.jpg' },
      { id: 13, title: 'Rome Steps', gridSize: '4×4', gridCols: 4, gridRows: 4, difficulty: 'Medium', imageKeyword: 'rome.jpg' },
      { id: 14, title: 'Modern Building', gridSize: '4×4', gridCols: 4, gridRows: 4, difficulty: 'Hard', imageKeyword: 'building_lake.jpg' },
      { id: 15, title: 'Mosque Architecture', gridSize: '3×5', gridCols: 5, gridRows: 3, difficulty: 'Expert', imageKeyword: 'islamic_mosque.jpg' },
      { id: 36, title: 'Orange Houses', gridSize: '3×3', gridCols: 3, gridRows: 3, difficulty: 'Easy', imageKeyword: 'orange_houses.jpg' },
      { id: 37, title: 'City Elevator', gridSize: '4×4', gridCols: 4, gridRows: 4, difficulty: 'Medium', imageKeyword: 'elevator.jpg' },
      { id: 38, title: 'Green Cross', gridSize: '4×4', gridCols: 4, gridRows: 4, difficulty: 'Hard', imageKeyword: 'pharmacie.jpg' },
      { id: 39, title: 'Paris Night', gridSize: '3×5', gridCols: 5, gridRows: 3, difficulty: 'Expert', imageKeyword: 'paris.jpg' },
      { id: 40, title: 'Urban Jungle', gridSize: '5×4', gridCols: 5, gridRows: 4, difficulty: 'Master', imageKeyword: 'newyork.jpg' },
    ],
  },
  {
    slug: 'art',
    name: 'Art',
    icon: '🎨',
    color: '#e17055',
    description: 'Classic paintings and modern art reimagined as puzzles.',
    longDescription: 'Experience art in a whole new way. Our art puzzle collection features classic masterpieces and contemporary works.',
    levels: [
      { id: 16, title: 'Color Tunnel', gridSize: '3×3', gridCols: 3, gridRows: 3, difficulty: 'Easy', imageKeyword: 'color_tunnel.jpg' },
      { id: 17, title: 'Color Lines', gridSize: '3×3', gridCols: 3, gridRows: 3, difficulty: 'Easy', imageKeyword: 'color_lines.jpg' },
      { id: 18, title: 'Abstract Fruits', gridSize: '4×4', gridCols: 4, gridRows: 4, difficulty: 'Medium', imageKeyword: 'abstract_fruits_poster.jpg' },
      { id: 19, title: 'Ice Cream Art', gridSize: '4×4', gridCols: 4, gridRows: 4, difficulty: 'Hard', imageKeyword: 'ice_cream_poster.jpg' },
      { id: 20, title: 'Coloring Tools', gridSize: '3×5', gridCols: 5, gridRows: 3, difficulty: 'Expert', imageKeyword: 'coloring_tools.jpg' },
      { id: 41, title: 'Mechanical Gears', gridSize: '3×3', gridCols: 3, gridRows: 3, difficulty: 'Easy', imageKeyword: 'gears.jpg' },
      { id: 42, title: 'Shoe Art', gridSize: '4×4', gridCols: 4, gridRows: 4, difficulty: 'Medium', imageKeyword: 'shoes.jpg' },
      { id: 43, title: 'Tunnel Vision', gridSize: '4×4', gridCols: 4, gridRows: 4, difficulty: 'Hard', imageKeyword: 'color_tunnel.jpg' },
      { id: 44, title: 'Bright Lines', gridSize: '3×5', gridCols: 5, gridRows: 3, difficulty: 'Expert', imageKeyword: 'color_lines.jpg' },
      { id: 45, title: 'Fruity Poster', gridSize: '5×4', gridCols: 5, gridRows: 4, difficulty: 'Master', imageKeyword: 'abstract_fruits_poster.jpg' },
    ],
  },
  {
    slug: 'food',
    name: 'Food',
    icon: '🍕',
    color: '#fdcb6e',
    description: 'Delicious food photography that will tease your senses and brain.',
    longDescription: 'Feast your eyes on our food puzzle collection! These mouthwatering images of gourmet dishes, colorful ingredients, and artistic plating will challenge your puzzle skills.',
    levels: [
      { id: 21, title: 'Fresh Fruit', gridSize: '3×3', gridCols: 3, gridRows: 3, difficulty: 'Easy', imageKeyword: 'fruit.jpg' },
      { id: 22, title: 'Black Berries', gridSize: '3×3', gridCols: 3, gridRows: 3, difficulty: 'Easy', imageKeyword: 'black_fruit.jpg' },
      { id: 23, title: 'Pineapple', gridSize: '4×4', gridCols: 4, gridRows: 4, difficulty: 'Medium', imageKeyword: 'pinaple.jpg' },
      { id: 24, title: 'Fresh Tomatoes', gridSize: '4×4', gridCols: 4, gridRows: 4, difficulty: 'Hard', imageKeyword: 'tomatos.jpg' },
      { id: 25, title: 'Fruit Basket', gridSize: '3×5', gridCols: 5, gridRows: 3, difficulty: 'Expert', imageKeyword: 'fruit.jpg' },
      { id: 46, title: 'Berry Mix', gridSize: '3×3', gridCols: 3, gridRows: 3, difficulty: 'Easy', imageKeyword: 'black_fruit.jpg' },
      { id: 47, title: 'Tropical Pineapple', gridSize: '4×4', gridCols: 4, gridRows: 4, difficulty: 'Medium', imageKeyword: 'pinaple.jpg' },
      { id: 48, title: 'Red Tomatoes', gridSize: '4×4', gridCols: 4, gridRows: 4, difficulty: 'Hard', imageKeyword: 'tomatos.jpg' },
      { id: 49, title: 'Healthy Choice', gridSize: '3×5', gridCols: 5, gridRows: 3, difficulty: 'Expert', imageKeyword: 'fruit.jpg' },
      { id: 50, title: 'Dark Berries', gridSize: '5×4', gridCols: 5, gridRows: 4, difficulty: 'Master', imageKeyword: 'black_fruit.jpg' },
    ],
  },
];

export function getCategoryBySlug(slug: string): GameCategory | undefined {
  return categories.find(c => c.slug === slug);
}

export function getLevelById(id: number): { category: GameCategory; level: GameLevel } | undefined {
  for (const cat of categories) {
    const level = cat.levels.find(l => l.id === id);
    if (level) return { category: cat, level };
  }
  return undefined;
}

export function getAllLevels(): { category: GameCategory; level: GameLevel }[] {
  return categories.flatMap(cat => cat.levels.map(level => ({ category: cat, level })));
}
