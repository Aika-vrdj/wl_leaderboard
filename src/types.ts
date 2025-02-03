export interface Player {
  id: string;
  rebel_points: number;
  level: number;
  xp: number;
  total_items?: number;
}

export interface Collectible {
  id: string;
  name: string;
  description: string;
  image_url: string;
  type: string;
  rarity: string;
}

export interface PlayerInventory {
  player_id: string;
  collectible_id: string;
  quantity: number;
}