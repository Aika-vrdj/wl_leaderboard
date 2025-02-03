import type { Player } from '../types';
import type { SortCategory } from '../types/leaderboard';
import { getRebelName } from '../utils/rebelNames';

// This component displays the actual leaderboard table with player rankings
export function LeaderboardTable({ 
  players, 
  category 
}: { 
  players: Player[];
  category: SortCategory;
}) {
  return (
    <div className="border border-green-500 bg-black">
      {/* Table Header */}
      <div className="grid grid-cols-5 gap-4 p-4 border-b border-green-500 font-mono text-green-500">
        <div>RANK</div>
        <div>CODENAME</div>
        <div>LEVEL</div>
        <div>XP</div>
        <div>{'TOTAL ITEMS'}</div>
      </div>

      {/* Table Rows - One for each player */}
      {players.map((player, index) => (
        <div
          key={player.id}
          className="grid grid-cols-5 gap-4 p-4 border-b border-green-900 font-mono text-green-500 hover:bg-green-900/10"
        >
          <div>#{index + 1}</div>
          <div className="font-bold">{getRebelName(player.id)}</div>
          <div>{player.level}</div>
          <div>{player.xp}</div>
          <div>{player.total_items}</div>
        </div>
      ))}
    </div>
  );
}

