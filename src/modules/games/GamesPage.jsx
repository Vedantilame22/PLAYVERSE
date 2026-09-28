// ============================================================
// NEXORA — Games Page
// ============================================================
import { useState } from 'react';
import { GAMES_CATALOG } from '@/data/index';
import { CURRENT_USER } from '@/data/users';

function GameCard({ game, isOwned }) {
  const [following, setFollowing] = useState(false);
  return (
    <div className="nexora-card" style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }}>
      <div style={{ height: 80, background: `linear-gradient(135deg, ${game.color}22, ${game.color}06)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 44 }}>
        {game.icon}
      </div>
      <div style={{ padding: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justify: 'space-between', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-base)', color: 'var(--color-text-white)' }}>
            {game.name}
          </h3>
          {isOwned && <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--color-green)', background: 'var(--color-green-dim)', border: '1px solid rgba(16,185,129,0.2)', padding: '1px 6px', borderRadius: 4 }}>PLAYED</span>}
        </div>
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 8 }}>{game.genre} • {game.developer}</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: game.color, background: `${game.color}12`, border: `1px solid ${game.color}20`, padding: '2px 8px', borderRadius: 4 }}>
            {game.playerCount}
          </span>
          <span style={{ fontSize: 10, color: 'var(--color-text-muted)', padding: '2px 8px', borderRadius: 4, background: 'var(--color-bg-elevated)' }}>
            {game.competitiveLevel}
          </span>
        </div>
        <button
          className={`btn btn-sm ${following ? 'btn-ghost' : 'btn-secondary'} w-full`}
          style={{ fontSize: 12 }}
          onClick={() => setFollowing((v) => !v)}
        >
          {following ? '✓ Following' : 'Follow Game'}
        </button>
      </div>
    </div>
  );
}

export default function GamesPage() {
  const [filter, setFilter] = useState('All');
  const genres = ['All', 'FPS', 'Battle Royale', 'MOBA', 'Sandbox', 'Open World'];
  const myGames = CURRENT_USER.games;
  const filtered = GAMES_CATALOG.filter((g) => filter === 'All' || g.genre === filter);

  return (
    <div style={{ width: '100%', margin: '0 auto' }}>
      <div style={{ marginBottom: 20 }}>
        <h1 className="section-title" style={{ fontSize: 'var(--text-2xl)' }}>Games</h1>
        <p className="section-subtitle">Your gaming library and the platform's supported games</p>
      </div>

      {/* My Games highlight */}
      <div className="nexora-card" style={{ padding: 18, marginBottom: 24 }}>
        <h2 className="section-title" style={{ marginBottom: 14, fontSize: 'var(--text-lg)' }}>My Games</h2>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {myGames.map((g) => {
            const gameData = GAMES_CATALOG.find((gc) => gc.name === g);
            if (!gameData) return null;
            return (
              <div key={g} style={{
                padding: '10px 18px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: 10,
                background: `${gameData.color}12`, border: `1px solid ${gameData.color}25`, cursor: 'pointer',
              }}>
                <span style={{ fontSize: 22 }}>{gameData.icon}</span>
                <div>
                  <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-text-white)', fontSize: 'var(--text-sm)' }}>{g}</p>
                  <p style={{ fontSize: 10, color: gameData.color }}>Active</p>
                </div>
              </div>
            );
          })}
          <button className="btn btn-secondary" style={{ fontSize: 12, alignSelf: 'center' }}>+ Add Game</button>
        </div>
      </div>

      {/* Genre Filters */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
        {genres.map((g) => (
          <button key={g} className={`chip ${filter === g ? 'active' : ''}`} onClick={() => setFilter(g)}>{g}</button>
        ))}
      </div>

      <div className="grid-4" style={{ gap: 16 }}>
        {filtered.map((g) => (
          <GameCard key={g.id} game={g} isOwned={myGames.includes(g.name)} />
        ))}
      </div>
    </div>
  );
}
