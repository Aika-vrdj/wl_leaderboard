export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      collectibles: {
        Row: {
          id: string
          name: string
          description: string
          image_url: string
          type: string
          rarity: string
        }
      }
      players: {
        Row: {
          id: string
          rebel_points: number
          level: number
          xp: number
        }
      }
      player_inventory: {
        Row: {
          player_id: string
          collectible_id: string
          quantity: number
        }
      }
    }
  }
}