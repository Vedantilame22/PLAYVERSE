import { Search, Filter } from 'lucide-react';
// ============================================================
// NEXORA — Discover Page
// ============================================================
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Tabs from '@/components/common/Tabs';
import PlayerCard from '@/components/gaming/PlayerCard';
import { PLAYERS } from '@/data/users';
import { TEAMS } from '@/data/teams';
import { GAMES_CATALOG, COMMUNITIES, EVENTS } from '@/data/index';
import { formatCount } from '@/utils';
import { useDebounce, useToggleSet } from '@/hooks';

const DISCOVER_TABS = [
  { key: 'players', label: '👤 Players' },
  { key: 'teams', label: '🛡️ Teams' },
  { key: 'games', label: '🎮 Games' },
  { key: 'communities', label: '👥 Communities' },
  { key: 'events', label: '🏆 Events' },
];

const GAME_FILTERS = ['All', 'Valorant', 'BGMI', 'CS2', 'Apex Legends', 'Minecraft'];
const RANK_FILTERS = ['All Ranks', 'Radiant / Predator', 'Immortal / Conqueror', 'Ascendant / Diamond', 'Platinum+'];
const ROLE_FILTERS = ['All Roles', 'IGL', 'Duelist', 'Controller', 'Sentinel', 'Initiator', 'AWPer', 'Support'];

export default function DiscoverPage() {
  const { showToast } = useOutletContext() || {};
  const [tab, setTab] = useState('players');
  const [query, setQuery] = useState('');
  const [gameFilter, setGameFilter] = useState('All');
  const [rankFilter, setRankFilter] = useState('All Ranks');
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [lftOnly, setLftOnly] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const connected = useToggleSet([]);
  const followed = useToggleSet([]);
  const debouncedQ = useDebounce(query);

  function filteredPlayers() {
    return PLAYERS.filter((p) => {
      const matchQ = !debouncedQ || p.displayName.toLowerCase().includes(debouncedQ.toLowerCase()) || p.primaryRole?.toLowerCase().includes(debouncedQ.toLowerCase());
      const matchGame = gameFilter === 'All' || p.primaryGame === gameFilter;
      const matchLft = !lftOnly || p.lookingForTeam;
      const matchVerified = !verifiedOnly || p.isVerified;
      return matchQ && matchGame && matchLft && matchVerified;
    });
  }

  function filteredTeams() {
    return TEAMS.filter((t) => {
      const matchQ = !debouncedQ || t.name.toLowerCase().includes(debouncedQ.toLowerCase());
      const matchGame = gameFilter === 'All' || t.game === gameFilter;
      return matchQ && matchGame;
    });
  }

  return (
    <div style={{ width: '100%', margin: '0 auto' }}>
      <div style={{ marginBottom: 20 }}>
        <h1 className="section-title" style={{ fontSize: 'var(--text-2xl)' }}>Discover</h1>
        <p className="section-subtitle">Find players, teams, games, and communities</p>
      </div>

      {/* Search Bar */}
      <div style={{ position: 'relative', marginBottom: 16, maxWidth: 480 }}>
        <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
        <input
          className="input"
          placeholder={`Search ${tab}…`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ paddingLeft: 36 }}
        />
      </div>

      <Tabs tabs={DISCOVER_TABS} activeTab={tab} onChange={setTab} />

      {/* Filters */}
      {(tab === 'players' || tab === 'teams') && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 14, alignItems: 'center' }}>
          <Filter size={14} style={{ color: 'var(--color-text-muted)' }} />
          {GAME_FILTERS.map((g) => (
            <button key={g} className={`chip ${gameFilter === g ? 'active' : ''}`} onClick={() => setGameFilter(g)}>{g}</button>
          ))}
          <div style={{ width: 1, height: 20, background: 'var(--color-border)' }} />
          <button
            className={`chip ${lftOnly ? 'active' : ''}`}
            onClick={() => setLftOnly((v) => !v)}
          >🟢 LFT Only</button>
          <button
            className={`chip ${verifiedOnly ? 'active' : ''}`}
            onClick={() => setVerifiedOnly((v) => !v)}
          >✓ Verified Only</button>
        </div>
      )}

      <div style={{ marginTop: 20 }}>
        {tab === 'players' && (
          <>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginBottom: 14 }}>
              {filteredPlayers().length} players found
            </p>
            <div className="grid-3" style={{ gap: 16 }}>
              {filteredPlayers().map((p) => (
                <PlayerCard key={p.id} player={p}
                  connected={connected.has(p.id)} followed={followed.has(p.id)}
                  onConnect={(id) => { connected.toggle(id); showToast?.('Connection request sent!', 'success'); }}
                  onFollow={(id) => { followed.toggle(id); showToast?.('Following!', 'info'); }}
                />
              ))}
            </div>
          </>
        )}

        {tab === 'teams' && (
          <div className="grid-3" style={{ gap: 16 }}>
            {filteredTeams().map((t) => (
              <div key={t.id} className="nexora-card" style={{ padding: 16 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                    background: `linear-gradient(135deg, ${t.logoColor}cc, ${t.logoColor}66)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 16, color: 'white',
                  }}>{t.tag}</div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 700, color: 'var(--color-text-white)', fontFamily: 'var(--font-display)' }}>{t.name}</p>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{t.game} • {t.region}</p>
                  </div>
                </div>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: 12 }}>{t.description.slice(0, 100)}…</p>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn btn-secondary btn-sm" style={{ flex: 1, fontSize: 12 }}>View Team</button>
                  {t.openings.length > 0 && (
                    <button className="btn btn-primary btn-sm" style={{ fontSize: 12 }}>
                      {t.openings.length} Opening{t.openings.length > 1 ? 's' : ''}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'games' && (
          <div className="grid-3" style={{ gap: 16 }}>
            {GAMES_CATALOG.map((g) => (
              <div key={g.id} className="nexora-card" style={{ padding: 16, display: 'flex', gap: 14, alignItems: 'center' }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                  background: `${g.color}15`, border: `1px solid ${g.color}25`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28,
                }}>{g.icon}</div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-text-white)', fontSize: 'var(--text-base)' }}>{g.name}</h3>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{g.genre} • {g.developer}</p>
                  <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: g.color, background: `${g.color}12`, border: `1px solid ${g.color}20`, padding: '2px 8px', borderRadius: 4 }}>
                      {g.playerCount}
                    </span>
                    <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--color-text-muted)' }}>{g.competitiveLevel}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'communities' && (
          <div className="grid-3" style={{ gap: 16 }}>
            {COMMUNITIES.map((c) => (
              <div key={c.id} className="nexora-card" style={{ padding: 16 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 10 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                    background: `${c.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
                  }}>{c.icon}</div>
                  <div>
                    <p style={{ fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--color-text-white)', fontSize: 'var(--text-sm)' }}>{c.name}</p>
                    <p style={{ fontSize: 10, color: 'var(--color-text-muted)' }}>{formatCount(c.memberCount)} members</p>
                  </div>
                </div>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.5, marginBottom: 12 }}>{c.description.slice(0, 80)}…</p>
                <button className={`btn btn-sm w-full ${c.isJoined ? 'btn-ghost' : 'btn-secondary'}`} style={{ fontSize: 12 }}>
                  {c.isJoined ? '✓ Joined' : '+ Join'}
                </button>
              </div>
            ))}
          </div>
        )}

        {tab === 'events' && (
          <div className="grid-2" style={{ gap: 16 }}>
            {EVENTS.map((e) => (
              <div key={e.id} className="nexora-card" style={{ padding: 16, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                  background: `${e.color}15`, border: `1px solid ${e.color}25`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
                }}>{e.icon}</div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-text-white)', fontSize: 'var(--text-sm)', marginBottom: 4 }}>{e.name}</h3>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 8 }}>
                    {e.date} • {e.game} • {e.isOnline ? '🌐 Online' : '🏟️ LAN'}
                  </p>
                  {e.prize && <p style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-gold)' }}>💰 {e.prize}</p>}
                </div>
                <button className={`btn btn-sm ${e.registrationOpen ? 'btn-primary' : 'btn-ghost'}`} style={{ fontSize: 11, flexShrink: 0 }}>
                  {e.isRegistered ? 'Registered' : e.registrationOpen ? 'Register' : 'Closed'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
