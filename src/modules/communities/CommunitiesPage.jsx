// ============================================================
// NEXORA — Communities Page
// ============================================================
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { formatCount } from '@/utils';
import { COMMUNITIES } from '@/data/index';

function CommunityCard({ community, onJoin, joined }) {
  const isJoined = joined || community.isJoined;
  return (
    <div className="nexora-card" style={{ overflow: 'hidden' }}>
      <div style={{ height: 60, background: `linear-gradient(135deg, ${community.color}25, ${community.color}08)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>
        {community.icon}
      </div>
      <div style={{ padding: 16 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 8 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-base)', color: 'var(--color-text-white)' }}>
            {community.name}
          </h3>
          {community.isVerified && <span style={{ fontSize: 9, color: 'var(--color-cyan)', background: 'var(--color-cyan-dim)', border: '1px solid var(--color-border-cyan)', padding: '2px 6px', borderRadius: 4, fontWeight: 700, flexShrink: 0 }}>VERIFIED</span>}
        </div>
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: 12 }}>
          {community.description}
        </p>
        <div style={{ display: 'flex', gap: 14, marginBottom: 12 }}>
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--color-primary)' }}>{formatCount(community.memberCount)}</p>
            <p style={{ fontSize: 9, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Members</p>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--color-cyan)' }}>{formatCount(community.weeklyActive)}</p>
            <p style={{ fontSize: 9, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Weekly Active</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
          {community.tags.map((tag) => (
            <span key={tag} style={{ fontSize: 10, padding: '2px 8px', borderRadius: 'var(--radius-full)', background: `${community.color}10`, color: community.color, border: `1px solid ${community.color}20`, fontWeight: 600 }}>
              #{tag}
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            className={`btn btn-sm ${isJoined ? 'btn-ghost' : 'btn-primary'}`}
            style={{ flex: 1, fontSize: 12 }}
            onClick={() => onJoin(community.id)}
          >
            {isJoined ? '✓ Joined' : '+ Join Community'}
          </button>
          <button className="btn btn-ghost btn-sm" style={{ fontSize: 12 }}>Follow</button>
        </div>
      </div>
    </div>
  );
}

export default function CommunitiesPage() {
  const { showToast } = useOutletContext() || {};
  const [joined, setJoined] = useState({});
  const [filter, setFilter] = useState('');

  function handleJoin(id) {
    setJoined((p) => {
      const next = { ...p, [id]: !p[id] };
      showToast?.(next[id] ? 'Joined community!' : 'Left community', next[id] ? 'success' : 'info');
      return next;
    });
  }

  const filtered = COMMUNITIES.filter((c) =>
    !filter || c.name.toLowerCase().includes(filter.toLowerCase()) || c.game.toLowerCase().includes(filter.toLowerCase())
  );

    <div style={{ width: '100%', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 className="section-title" style={{ fontSize: 'var(--text-2xl)' }}>Gaming Communities</h1>
          <p className="section-subtitle">Find your tribe — connect with players who share your passion</p>
        </div>
        <button className="btn btn-primary" onClick={() => showToast?.('Community creation coming soon!', 'info')}>
          + Create Community
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        {['All', 'Valorant', 'BGMI', 'CS2', 'Apex', 'Minecraft', 'Esports'].map((f) => (
          <button
            key={f}
            className={`chip ${(filter || 'All') === f ? 'active' : ''}`}
            onClick={() => setFilter(f === 'All' ? '' : f)}
          >{f}</button>
        ))}
      </div>

      {/* My Communities */}
      <div style={{ marginBottom: 28 }}>
        <h2 className="section-title" style={{ marginBottom: 14 }}>My Communities</h2>
        <div className="grid-3" style={{ gap: 16 }}>
          {COMMUNITIES.filter((c) => c.isJoined || joined[c.id]).map((c) => (
            <CommunityCard key={c.id} community={c} onJoin={handleJoin} joined={joined[c.id]} />
          ))}
        </div>
      </div>

      {/* Discover */}
      <h2 className="section-title" style={{ marginBottom: 14 }}>Discover Communities</h2>
      <div className="grid-3" style={{ gap: 16 }}>
        {filtered.map((c) => (
          <CommunityCard key={c.id} community={c} onJoin={handleJoin} joined={joined[c.id]} />
        ))}
      </div>
    </div>
  );
}
