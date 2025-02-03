// This file defines the structure of our data

// Different ways we can sort the leaderboard
export type SortCategory = 'level' | 'xp' | 'rebel_points' | 'items';

// Structure for our category buttons
export interface CategoryButton {
  key: SortCategory;
  label: string;
  icon: React.ComponentType;  // The icon to display
}