import { Terminal } from 'lucide-react';

/**
 * Header Component
 * 
 * Displays the title of our rebel forces leaderboard with a cool terminal icon
 * to match our hacker theme.
 */
export default function Header() {
  return (
    <>
      {/* Header Section */}
      <header className="border-b border-green-500 p-4 mb-4">
        <div className="container mx-auto flex items-center gap-2">
          <Terminal className="w-8 h-8 text-green-500" />
          <h1 className="text-2xl font-mono text-green-500">
            REBEL WASTELAND LEADERBOARD
          </h1>
        </div>
      </header>

      {/* Back Button Below the Header */}
      <div className="container mx-auto text-center mb-8">
        <a
          href="https://rebelwasteland.netlify.app/"
          className="text-green-500 hover:text-green-300 underline decoration-dotted transition"
        >
          Back
        </a>
      </div>
    </>
  );
}
