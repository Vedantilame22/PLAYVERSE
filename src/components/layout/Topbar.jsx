// ============================================================
// NEXORA — Top Navigation Bar
// ============================================================
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, MessageSquare, Plus, X, Gamepad2, Users, Shield, Globe } from 'lucide-react';
import Avatar from '@/components/common/Avatar';
import { useOutsideClick } from '@/hooks';
import { CURRENT_USER } from '@/data/users';
import { PLAYERS } from '@/data/users';
import { TEAMS } from '@/data/teams';

const QUICK_CREATE_ITEMS = [
  { icon: '📝', label: 'Create Post', action: 'post' },
  { icon: '🎮', label: 'Add Gaming Experience', action: 'experience' },
  { icon: '🛡️', label: 'Create Team', action: 'team' },
  { icon: '📢', label: 'Team Opening', action: 'opening' },
  { icon: '👥', label: 'Create Community', action: 'community' },
  { icon: '🏆', label: 'Create Event', action: 'event' },
];

export default function Topbar({ sidebarCollapsed, onQuickCreate }) {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const navigate = useNavigate();
  const searchRef = useOutsideClick(() => setShowResults(false));
  const createRef = useOutsideClick(() => setShowCreate(false));

  const marginLeft = sidebarCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)';

  // Simple local search
  const results = query.trim().length > 1
    ? [
        ...PLAYERS.filter((p) =>
          p.displayName.toLowerCase().includes(query.toLowerCase()) ||
          p.primaryGame?.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 3).map((p) => ({ type: 'player', data: p })),
        ...TEAMS.filter((t) =>
          t.name.toLowerCase().includes(query.toLowerCase()) ||
          t.game.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 2).map((t) => ({ type: 'team', data: t })),
      ]
    : [];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: marginLeft,
        right: 0,
        height: 'var(--topbar-height)',
        background: 'var(--color-bg-card)',
        borderBottom: '2px solid var(--color-border-strong)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        gap: 12,
        zIndex: 100,
        transition: 'left var(--transition-base)',
      }}
    >
      {/* Search */}
      <div ref={searchRef} style={{ flex: 1, maxWidth: 440, position: 'relative' }}>
        <div style={{ position: 'relative' }}>
          <Search
            size={16}
            style={{
              position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
              color: 'var(--color-text-muted)', pointerEvents: 'none',
            }}
          />
          <input
            className="input"
            placeholder="Search players, teams, games, communities…"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setShowResults(true); }}
            onFocus={() => setShowResults(true)}
            style={{ paddingLeft: 36, paddingRight: query ? 36 : 14, height: 38, fontSize: 'var(--text-sm)' }}
            aria-label="Global search"
          />
          {query && (
            <button
              onClick={() => { setQuery(''); setShowResults(false); }}
              style={{
                position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)',
              }}
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Search Results Dropdown */}
        {showResults && results.length > 0 && (
          <div className="dropdown-menu animate-fadeIn" style={{ left: 0, right: 0, maxWidth: '100%' }}>
            {results.map(({ type, data }) => (
              <button
                key={`${type}-${data.id}`}
                className="dropdown-item"
                onClick={() => {
                  navigate(type === 'player' ? '/discover' : '/teams');
                  setShowResults(false);
                  setQuery('');
                }}
                style={{ gap: 10 }}
              >
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: `linear-gradient(135deg, ${data.avatarColor || data.logoColor || '#4f8ef7'}dd, ${data.avatarColor || data.logoColor || '#4f8ef7'}55)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 700, color: 'white', flexShrink: 0,
                }}>
                  {type === 'player' ? data.displayName[0] : data.name[0]}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text-primary)' }} className="truncate">
                    {type === 'player' ? data.displayName : data.name}
                  </p>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }} className="truncate">
                    {type === 'player' ? `${data.primaryRole} • ${data.primaryGame}` : `${data.game} • ${data.type}`}
                  </p>
                </div>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', flexShrink: 0 }}>
                  {type === 'player' ? '👤' : '🛡️'}
                </span>
              </button>
            ))}
            <div className="dropdown-separator" />
            <button
              className="dropdown-item"
              onClick={() => { navigate('/discover'); setShowResults(false); }}
              style={{ color: 'var(--color-primary)', fontSize: 'var(--text-sm)' }}
            >
              <Search size={14} />
              Search all results for "{query}"
            </button>
          </div>
        )}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {/* Quick Create */}
        <div ref={createRef} style={{ position: 'relative' }}>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setShowCreate((v) => !v)}
            aria-label="Quick create"
            style={{ gap: 6 }}
          >
            <Plus size={16} />
            <span style={{ display: 'block' }}>Create</span>
          </button>
          {showCreate && (
            <div className="dropdown-menu animate-fadeIn" style={{ right: 0, minWidth: 220 }}>
              {QUICK_CREATE_ITEMS.map(({ icon, label, action }) => (
                <button
                  key={action}
                  className="dropdown-item"
                  onClick={() => { onQuickCreate?.(action); setShowCreate(false); }}
                >
                  <span style={{ fontSize: 16 }}>{icon}</span>
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Messages */}
        <button
          className="btn btn-icon btn-ghost"
          onClick={() => navigate('/messages')}
          title="Messages"
          style={{ position: 'relative' }}
        >
          <MessageSquare size={18} />
          <span style={{
            position: 'absolute', top: 4, right: 4,
            width: 8, height: 8,
            background: 'var(--color-primary)',
            borderRadius: '50%',
            border: '2px solid var(--color-bg-primary)',
          }} />
        </button>

        {/* Notifications */}
        <button
          className="btn btn-icon btn-ghost"
          onClick={() => navigate('/notifications')}
          title="Notifications"
          style={{ position: 'relative' }}
        >
          <Bell size={18} />
          <span style={{
            position: 'absolute', top: 4, right: 4,
            width: 8, height: 8,
            background: 'var(--color-primary)',
            borderRadius: '50%',
            border: '2px solid var(--color-bg-primary)',
          }} />
        </button>

        {/* Profile Avatar */}
        <div
          onClick={() => navigate('/profile')}
          style={{ cursor: 'pointer' }}
          title="My Profile"
        >
          <Avatar user={CURRENT_USER} size="sm" online ring />
        </div>
      </div>
    </header>
  );
}

/* Mobile Bottom Navigation */
export function MobileNavigation() {
  const navigate = useNavigate();
  const items = [
    { path: '/home', icon: '🏠', label: 'Home' },
    { path: '/network', icon: '🤝', label: 'Network' },
    { path: '/teams', icon: '🛡️', label: 'Teams' },
    { path: '/messages', icon: '💬', label: 'Messages' },
    { path: '/profile', icon: '👤', label: 'Profile' },
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 64,
        background: 'rgba(13, 15, 26, 0.95)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid var(--color-border)',
        display: 'flex',
        zIndex: 300,
      }}
    >
      {items.map(({ path, icon, label }) => (
        <button
          key={path}
          onClick={() => navigate(path)}
          style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', gap: 2, background: 'none', border: 'none', cursor: 'pointer',
            color: window.location.pathname === path ? 'var(--color-primary)' : 'var(--color-text-muted)',
            fontSize: 20, fontFamily: 'var(--font-display)', fontSize: 10, fontWeight: 600,
          }}
        >
          <span style={{ fontSize: 20 }}>{icon}</span>
          <span style={{ fontSize: 10 }}>{label}</span>
        </button>
      ))}
    </nav>
  );
}
