import { useEffect, useState } from 'react';
import type { Player } from '../types';
import type { SortCategory } from '../types/leaderboard';
import { getRebelName } from '../utils/rebelNames';
import { supabase } from '../lib/supabase';

// Dummy medal images for now (these can be replaced with real medal images later)
const medalImages: { [key: string]: string } = {
  'Picky Eater': '/icons/picky-eater-icon.png',
  'Picky Collector': '/icons/picky-collector-icon.png',
  'Gear Head': '/icons/gear-head-icon.png',
  'Legendary Collector': '/icons/legendary-collector-icon.png',
};

// This component displays the actual leaderboard table with player rankings
export function LeaderboardTable({
  players,
  category,
}: {
  players: Player[];
  category: SortCategory;
}) {
  const [medals, setMedals] = useState<{ [key: string]: string[] }>({});

  useEffect(() => {
    // Fetch medals for each player
    const fetchMedals = async () => {
      const { data, error } = await supabase
        .from('player_medals')
        .select('player_id, medal_type');

      if (error) {
        console.error('Error fetching player medals:', error);
      }

      // Group medals by player_id
      const medalMap = data?.reduce((map, item) => {
        map[item.player_id] = map[item.player_id] || [];
        map[item.player_id].push(item.medal_type);
        return map;
      }, {} as { [key: string]: string[] });

      setMedals(medalMap || {});
    };

    fetchMedals();
  }, [players]);

  return (
    <div className="border border-green-500 bg-black">
      {/* Table Header */}
      <div className="grid grid-cols-6 gap-4 p-4 border-b border-green-500 font-mono text-green-500">
        <div>RANK</div>
        <div>CODENAME</div>
        <div>LEVEL</div>
        <div>XP</div>
        <div>{'TOTAL ITEMS'}</div>
        <div>{'MEDALS'}</div> {/* Add column for medals */}
      </div>

      {/* Table Rows - One for each player */}
      {players.map((player, index) => (
        <div
          key={player.id}
          className="grid grid-cols-6 gap-4 p-4 border-b border-green-900 font-mono text-green-500 hover:bg-green-900/10"
        >
          <div>#{index + 1}</div>
          <div className="font-bold">{getRebelName(player.id)}</div>
          <div>{player.level}</div>
          <div>{player.xp}</div>
          <div>{player.total_items}</div>

          {/* Display Medals below the player's name */}
          <div className="flex gap-2">
            {medals[player.id]?.map((medalName) => (
              <img
                key={medalName}
                src={medalImages[medalName] || '/icons/default-icon.png'} // Fallback icon
                alt={medalName}
                className="w-8 h-8" // Set size to 32px (Tailwind 'w-8' and 'h-8' are 32px)
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
