import { Trophy, Zap, Target, Package } from 'lucide-react';
import type { CategoryButton, SortCategory } from '../types/leaderboard';

// This component handles the category selection buttons at the top of the leaderboard
export function LeaderboardCategories({ 
  activeCategory, 
  onCategoryChange 
}: { 
  activeCategory: SortCategory;
  onCategoryChange: (category: SortCategory) => void;
}) {
  // Define our category buttons with their icons and labels
  const categories: CategoryButton[] = [
    { key: 'level', label: 'Level', icon: Trophy },      // Shows player levels
    { key: 'xp', label: 'XP', icon: Zap },               // Shows experience points
    { key: 'rebel_points', label: 'Rebel Points', icon: Target },  // Shows rebellion score
    { key: 'items', label: 'Items', icon: Package }      // Shows total items owned
  ];

  return (
    <div className="flex gap-4 mb-6 justify-center">
      {categories.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          onClick={() => onCategoryChange(key)}
          className={`
            flex items-center gap-2 px-4 py-2 border
            ${activeCategory === key 
              ? 'border-green-500 text-green-500'  // Active button style
              : 'border-green-900 text-green-900'  // Inactive button style
            }
            hover:border-green-500 hover:text-green-500 
            transition-colors font-mono
          `}
        >
          <Icon size={16} />
          {label}
        </button>
      ))}
    </div>
  );
}