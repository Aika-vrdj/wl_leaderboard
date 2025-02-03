// This file handles generating cool codenames for our rebel players

// Lists of words we'll use to create rebel codenames
const REBEL_ADJECTIVES = [
  'Rusty', 'Ashen', 'Dusty', 'Ferrous', 'Grim', 'Hollow', 'Iron',
  'Gritty', 'Scarred', 'Torn', 'Lost', 'Slik', 'Wraith', 'Gale', 'Hungry',
  'Angry', 'Old', 'Vigilant', 'Rebel', 'Copper', 'Silent', 'Pizza', 'Smooth',
  'Quick', 'Techy'
] as const;

const REBEL_NOUNS = [
  'Hound', 'Raven', 'Vulture', 'Serpent', 'Nomad', 'Raider', 'Outcast',
  'Stray', 'Mongrel', 'Looter', 'Baron', 'Corsair', 'Warlock', 'Howl', 'Monk', 'Lad', 'Mate', 'Scout', 'Fighter', 'Operator', 'Dreamer', 'Trooper', 'Pilot', 'Drifter' 
] as const;

/**
 * Creates a unique rebel codename for a player based on their ID.
 * The same ID will always generate the same name!
 * 
 * Example: 'Cyber_Phoenix' or 'Shadow_Dragon'
 * 
 * @param playerId - The unique ID of the player
 * @returns A cool rebel codename
 */
export function getRebelName(playerId: string): string {
  // Convert the player ID into a number we can use to pick names
  const hash = playerId.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  
  // Pick an adjective and noun based on the player's ID
  const adjective = REBEL_ADJECTIVES[hash % REBEL_ADJECTIVES.length];
  const noun = REBEL_NOUNS[Math.floor(hash / REBEL_ADJECTIVES.length) % REBEL_NOUNS.length];
  
  // Combine them with an underscore
  return `${adjective}_${noun}`;
}