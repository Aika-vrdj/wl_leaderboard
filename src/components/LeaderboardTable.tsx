import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { medalsConfig } from '../utils/medalsConfig'; // Import the medals config
import type { Player } from '../types';
import { getRebelName } from '../utils/rebelNames';

export function LeaderboardTable({
  players,
  category,
}: {
  players: Player[];
  category: string;
}) {
  const [medals, setMedals] = useState<{ [key: string]: string[] }>({});
  const [inventoryData, setInventoryData] = useState<any[]>([]);
  const [collectiblesData, setCollectiblesData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch player inventory
        const { data: inventory, error: inventoryError } = await supabase
          .from('player_inventory')
          .select('player_id, collectible_id, quantity');

        if (inventoryError) throw inventoryError;

        // Fetch collectibles data
        const { data: collectibles, error: collectiblesError } = await supabase
          .from('collectibles')
          .select('id, rarity, type');

        if (collectiblesError) throw collectiblesError;

        setInventoryData(inventory);
        setCollectiblesData(collectibles);

        const playerMedals: { [key: string]: string[] } = {};

        players.forEach((player) => {
          const playerItems = inventory.filter(
            (item) => item.player_id === player.id
          );

          // Check for each medal in the config
          medalsConfig.forEach((medal) => {
            const collectiblesToCheck = collectibles.filter(
              (item) => item[medal.type] === medal.value
            );
            const hasMedal = collectiblesToCheck.every((item) => {
              const playerItem = playerItems.find(
                (inventoryItem) => inventoryItem.collectible_id === item.id
              );
              return playerItem && playerItem.quantity > 0;
            });

            if (hasMedal) {
              if (!playerMedals[player.id]) playerMedals[player.id] = [];
              playerMedals[player.id].push(medal.name);
            }
          });
        });

        setMedals(playerMedals);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [players]);

  // Sort players by level in descending order before rendering
  const sortedPlayers = [...players].sort((a, b) => b.level - a.level);

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
      {sortedPlayers.map((player, index) => (
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
           {medals[player.id]?.map((medalName) => {
  // Find the corresponding medal from the config
  const medal = medalsConfig.find((m) => m.name === medalName);
  return (
    medal && (
      <div className="relative group" key={medalName}>
        {/* Medal Image */}
        <img
          src={medal.image} // Use the image from the medal config
          alt={medal.name} // Correct use of 'medal.name' to get the name
          className="w-8 h-8"
        />
        
        {/* Custom Tooltip */}
        <div className="absolute opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs rounded px-2 py-1 transition-opacity duration-200 bottom-10 left-1/2 transform -translate-x-1/2">
          {medal.name}
        </div>
      </div>
    )
  );
})}
