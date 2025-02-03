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
            {medals[player.id]?.map((medalName) => {
              // Find the corresponding medal from the config
              const medal = medalsConfig.find((m) => m.name === medalName);
              return (
                medal && (
                  <img
                    key={medalName}
                    src={medal.image} // Use the image from the medal config
                    alt={medalName}
                    className="w-8 h-8" // Set size to 32px (Tailwind 'w-8' and 'h-8' are 32px)
                  />
                )
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
