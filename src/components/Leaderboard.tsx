import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { LeaderboardTable } from './LeaderboardTable';
import type { Player } from '../types';

export default function Leaderboard() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlayers() {
      try {
        setLoading(true);
        
        // Fetch players
        const { data: playerData, error: playerError } = await supabase
          .from('players')
          .select('*');

        if (playerError) {
          throw playerError;
        }

        // Fetch inventory data
        const { data: inventoryData, error: inventoryError } = await supabase
          .from('player_inventory')
          .select('player_id, quantity');

        if (inventoryError) {
          throw inventoryError;
        }

        // Calculate total items for each player
        const itemCounts = inventoryData.reduce((totals, item) => {
          totals[item.player_id] = (totals[item.player_id] || 0) + item.quantity;
          return totals;
        }, {} as Record<string, number>);

        // Combine player data with total item counts
        const playersWithItems = playerData.map(player => ({
          ...player,
          total_items: itemCounts[player.id] || 0
        }));

        setPlayers(playersWithItems);
      } catch (error) {
        console.error('Error fetching players:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPlayers();
  }, []);

  // Show loading message while fetching data
  if (loading) {
    return (
      <div className="text-green-500 font-mono text-center">
        <div className="animate-pulse">ACCESSING REBEL DATABASE...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      {/* Pass the players data to LeaderboardTable */}
      <LeaderboardTable players={players} />
    </div>
  );
}
