import React from 'react';
import Header from './components/Header';
import Leaderboard from './components/Leaderboard';

function App() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="container mx-auto py-8">
        <Leaderboard />
      </main>
    </div>
  );
}

export default App;